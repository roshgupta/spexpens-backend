import Expense from '../models/expense.models.js';

export const createExpense = async (req, res, next) => {
  try {
    const { name, description, amount, category, date } = req.body;
    if (!name || !amount || !category) {
      return next({
        statusCode: 400,
        message:
          'Missing fields! Please enter name, amount and category of expense',
      });
    }
    const newExpense = new Expense({
      name,
      description,
      amount,
      category,
      date: date || new Date(),
      user: req.user.id,
    });
    await newExpense.save();
    return res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      expense: newExpense,
    });
  } catch (error) {
    console.log('Some error occured while creating the expense'.red);
    return next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!expense) {
      return next({
        statusCode: 403,
        message:
          'Expense not found, either it does not exists or does not belongs to you.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      deletedExpense: expense,
    });
  } catch (error) {
    console.log('Some error occured while deleting the expense'.red);
    return next(error);
  }
};

export const getExpenseByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({
      _id: id,
      user: req.user.id,
    });
    if (!expense) {
      return next({
        statusCode: 403,
        message:
          'Expense not found, either it does not exists or does not belongs to you.',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Expense fetched successfully',
      expense,
    });
  } catch (error) {
    console.log('Some error occured while getting the expense'.red);
    return next(error);
  }
};

export const getAllExpense = async (req, res, next) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: 'Expense fetched successfully',
      expenses,
    });
  } catch (error) {
    console.log('Some error occured while getting the expense'.red);
    return next(error);
  }
};

export const createManyExpenses = async (req, res, next) => {
  try {
    // TODO: To check if all expense are correctly recieved
    // const { expenseArray } = req.body;
    // expenseArray.forEach(({ name, amount, category }) => {
    //   if (!name || !amount || !category) {
    //     return next({
    //       statusCode: 400,
    //       message:
    //         'Missing fields! Please enter name, amount and category of expense',
    //     });
    //   }

    // });
    // TODO: To add some logic to add an array of expense
    return res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      expense: null,
    });
  } catch (error) {
    console.log('Some error occured while creating the expense'.red);
    return next(error);
  }
};
