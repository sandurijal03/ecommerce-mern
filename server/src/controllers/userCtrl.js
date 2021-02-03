import User from '../models/User';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({
          msg: 'The email already exists',
        });

      if (password.length < 6) {
        return res.status(400).json({
          msg: 'Password must be atleast 6 in length.',
        });
      }

      // password encryption
      const passwordHash = await hash(password, 12);
      const newUser = new User({
        name,
        email,
        password: passwordHash,
      });

      await newUser.save();

      const accessToken = createAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.json({
        accessToken,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({
          msg: 'User doesnot exist',
        });

      const isMatch = await compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          msg: 'Incorrect Password',
        });

      // if login success create access tokeen and refreh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        path: '/user/refresh_token',
      });

      res.json({ accessToken });
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {
        path: '/user/refresh_token',
      });
      return res.json({ msg: 'logged out' });
    } catch (err) {
      return res.status(500).json({ msg: err.msg });
    }
  },
  refreshToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshToken;
      if (!rf_token) {
        return res.status(400).json({
          msg: 'Please Login or register',
        });
      }
      verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: 'Pleas Login or register' });
        }
        const accessToken = createAccessToken({ id: user._id });
        res.json({ accessToken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user)
        return res.status(400).json({
          msg: 'User doesnot exist',
        });
      res.json(user);
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  },
};

const createAccessToken = (user) => {
  return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

const createRefreshToken = (user) => {
  return sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

export default userCtrl;
