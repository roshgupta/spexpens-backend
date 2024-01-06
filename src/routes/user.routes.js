import express from 'express';
import isLoggedIn from '../middlewares/auth.middlewares.js';
import { getUser } from '../controllers/user.controllers.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(isLoggedIn, getUser);

export default router;
