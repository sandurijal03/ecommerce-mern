import { Router } from 'express';
import userCtrl from '../controllers/userCtrl';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/logout', userCtrl.logout);

router.get('/refresh_token', userCtrl.refreshToken);

router.get('/infor', auth, userCtrl.getUser);

export default router;
