import express from 'express';
import isLoggedIn from '../middlewares/auth.middlewares.js';
import {
  createExpense,
  deleteExpense,
  getExpenseByID,
} from '../controllers/expense.controller.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(isLoggedIn, createExpense)
  .delete(isLoggedIn, deleteExpense)
  .get(isLoggedIn, getExpenseByID);

export default router;
