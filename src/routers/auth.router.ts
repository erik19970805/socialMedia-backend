import { Router } from 'express';
import { signup, signin, signout, generateAccessToken } from '../controllers/auth.controller';

const router = Router();

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/signout').post(signout);
router.route('/refresh_token').post(generateAccessToken);

export default router;
