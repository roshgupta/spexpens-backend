import express from 'express';
import { createCategory } from '../controllers/category.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(createCategory);

export default router;
