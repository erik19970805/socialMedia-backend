import { Router } from 'express';
import { searchUser } from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = Router();

router.route('/search').get(auth, searchUser);

export default router;
