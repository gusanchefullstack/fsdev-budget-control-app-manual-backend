import { Router } from "express";
import budgetController from "#v1/controllers/budgetController.js";
import { body, param } from "express-validator";
import inputValidatorHandler from "#v1/middleware/inputValidatorHandler.js";

const budgetRouter = Router();

//CRUD Operations
budgetRouter.post(
  "/",
  body("name").exists().trim().isString().withMessage("Invalid budget name"),
  body("budgetNumber")
    .exists()
    .trim()
    .isNumeric()
    .withMessage("Invalid budget number"),
  body("entity").exists().trim().isString().withMessage("Invalid entity"),
  body("balance").exists().trim().isNumeric().withMessage("Invalid balance").toFloat(),
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
  body("budgetNumber")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Invalid budget number"),
  body("entity").optional().trim().isString().withMessage("Invalid entity"),
  body("balance").optional().trim().isNumeric().withMessage("Invalid balance").toFloat(),
  inputValidatorHandler,
  budgetController.updateBudget
);
budgetRouter.delete(
  "/:budgetId",
  param("budgetId").isMongoId().withMessage("Invalid budget id"),
  inputValidatorHandler,
  budgetController.deleteBudget
);

export default budgetRouter;
