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

// CRUD operations for Budget Categories

// Create  Budget Categorie
budgetRouter.post(
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

// Update Budget Category
budgetRouter.put(
  "/:budgetId/categories",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  body("name")
    .exists()
    .trim()
    .isString()
    .withMessage("Invalid budget category name")
    .contains("||")
    .withMessage(
      "Budget category name must be separated by || (ex: nameOld||nameNew)"
    ),
  body("description")
    .optional()
    .trim()
    .isString()
    .withMessage("Invalid budget category description"),
  body("type")
    .exists()
    .trim()
    .isIn(["incomes", "expenses"])
    .withMessage("Invalid budget category type"),
  inputValidatorHandler,
  budgetController.updateBudgetCategory
);

// Delete Budget Category
budgetRouter.delete(
  "/:budgetId/categories",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  body("name")
    .exists()
    .trim()
    .isString()
    .withMessage("Invalid budget category name"),
  body("type")
    .exists()
    .trim()
    .isIn(["incomes", "expenses"])
    .withMessage("Invalid budget category type"),
  inputValidatorHandler,
  budgetController.deleteBudgetCategory
);

export default budgetRouter;
