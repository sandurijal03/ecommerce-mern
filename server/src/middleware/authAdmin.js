import User from '../models/User';

const authAdmin = async (req, res, next) => {
  try {
    // get user information by id
    const user = await User.findOne({
      _id: req.user.id,
    });
    if (user.role === 'user') {
      return res.status(400).json({
        msg: 'Admin resource access denied.',
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export default authAdmin;
