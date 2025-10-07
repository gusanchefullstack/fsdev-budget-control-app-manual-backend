import { Router } from "express";
import budgetController from "#v1/controllers/budgetController.js";
import { body, param } from "express-validator";
import inputValidatorHandler from "#v1/middleware/inputValidatorHandler.js";

const budgetRouter = Router();

//CRUD Operations
budgetRouter.post(
  "/",
  body("name").exists().trim().isString().withMessage("Invalid budget name"),
  body("description")
    .exists()
    .trim()
    .isString()
    .withMessage("Invalid budget description"),
  body("startDate")
    .exists()
    .trim()
    .isISO8601()
    .withMessage("Invalid start date"),
  body("endDate").exists().trim().isISO8601().withMessage("Invalid end date"),
  inputValidatorHandler,
  budgetController.createBudget
);
budgetRouter.get(
  "/:budgetId",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  inputValidatorHandler,
  budgetController.getSingleBudget
);
budgetRouter.get("/", budgetController.getAllBudgets);
budgetRouter.put(
  "/:budgetId",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  body("name").optional().trim().isString().withMessage("Invalid budget name"),
  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid budget description"),
  body("startDate")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("Invalid start date"),
  body("endDate").optional().trim().isISO8601().withMessage("Invalid end date"),
  inputValidatorHandler,
  budgetController.updateBudget
);
budgetRouter.delete(
  "/:budgetId",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  inputValidatorHandler,
  budgetController.deleteBudget
);

// CRUD operations for Budget Categpries
budgetRouter.put(
  "/:budgetId/categories",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  body("name")
    .exists()
    .trim()
    .isString()
    .withMessage("Invalid budget category name"),
  body("description")
    .exists()
    .trim()
    .isString()
    .withMessage("Invalid budget category description"),
  body("type")
    .exists()
    .trim()
    .isIn(["incomes", "expenses"])
    .withMessage("Invalid budget category type"),
  inputValidatorHandler,
  budgetController.addBudgetCategory
);

export default budgetRouter;
