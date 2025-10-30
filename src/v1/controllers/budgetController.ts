import { Request, Response, NextFunction } from "express";
import budgetServices from "#v1/services/budgetServices.js";
import { IJwtUser } from "#v1/models/userJWT.js";

const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = req.user as IJwtUser;
    const budget = await budgetServices.createBudget(user, data);
    res.status(201).json({ status: "Ok", budget });
  } catch (error) {
    next(error);
  }
};

const getAllBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const budgets = await budgetServices.getBudgets(user);
    res.status(200).json({ status: "Ok", budgets });
  } catch (error) {
    next(error);
  }
};

const getSingleBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { budgetId } = req.params;
    const budget = await budgetServices.getSingleBudget(user, budgetId);
    res.status(200).json({ status: "Ok", budget });
  } catch (error) {
    next(error);
  }
};

const updateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { budgetId } = req.params;
    const data = req.body;
    const budget = await budgetServices.updateBudget(user, budgetId, data);
    res.status(200).json({ status: "Ok", budget });
  } catch (error) {
    next(error);
  }
};
const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { budgetId } = req.params;
    const budget = await budgetServices.deleteBudget(user, budgetId);
    res.json({ status: "Ok", budget });
  } catch (error) {
    next(error);
  }
};

// CRUD Operations for Budget Categories

const addBudgetCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { budgetId } = req.params;
    const data = req.body;
    const budget = await budgetServices.addBudgetCategory(user, budgetId, data);
    res.status(200).json({ status: "Ok", budget });
  } catch (error) {
    next(error);
  }
};

// CRUD Operations for Budget Items
const addBudgetItemToCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { budgetId } = req.params;
    let {
      categoryType,
      categoryName,
      itemName,
      description,
      frequency,
      estimatedAmount,
    } = req.body;

    const budget = await budgetServices.addBudgetItemToBudgetCategory(
      user,
      budgetId,
      categoryType,
      categoryName,
      itemName,
      description,
      frequency,
      (estimatedAmount = parseFloat(estimatedAmount))
    );
    console.log(budget);
    res.status(200).json({ status: "Ok", budget });
  } catch (error) {
    next(error);
  }
};
// const updateBudgetCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = req.user as IJwtUser;
//     const { budgetId } = req.params;
//     const data = req.body;
//     const budget = await budgetServices.updateBudgetCategory(user, budgetId, data);  //TODO Change function
//     res.status(200).json({ status: "Ok", budget });
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteBudgetCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = req.user as IJwtUser;
//     const { budgetId } = req.params;
//     const data = req.body;
//     const budget = await budgetServices.deleteBudgetCategory(user, budgetId, data);
//     res.status(200).json({ status: "Ok", budget });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getAllBudgets,
  getSingleBudget,
  createBudget,
  updateBudget,
  deleteBudget,
  addBudgetCategory,
  addBudgetItemToCategory,
  // updateBudgetCategory,
  // deleteBudgetCategory
};
