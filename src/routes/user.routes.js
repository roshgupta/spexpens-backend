import express from 'express';
import { getUser } from '../controllers/user.controllers.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getUser);

export default router;
