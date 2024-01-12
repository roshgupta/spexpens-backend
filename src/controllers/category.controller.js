import Category from '../models/category.models.js';

export const createCategory = async (req, res, next) => {
  try {
    const { category, description } = req.body;
    if (!category) {
      return next({
        statusCode: 400,
        message:
          'Missing fields! Please enter name, amount and category of expense',
      });
    }
    const newCategory = new Category({
      description,
      category,
      user: req.user.id,
    });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      expense: newCategory,
    });
  } catch (error) {
    console.log('Some error occured while creating the expense'.red);
    return next(error);
  }
};
