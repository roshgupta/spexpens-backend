import express from 'express';
import {
  createExpense,
  deleteExpense,
  getAllExpense,
  getExpenseByID,
} from '../controllers/expense.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(createExpense).get(getAllExpense);

router.route('/:id').get(getExpenseByID).delete(deleteExpense);

export default router;
