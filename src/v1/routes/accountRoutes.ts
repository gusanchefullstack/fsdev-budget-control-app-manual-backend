import { Router } from "express";
import accountController from "#v1/controllers/accountController.js";
import { body, param } from "express-validator";
import inputValidatorHandler from "#v1/middleware/inputValidatorHandler.js";

const accountRouter = Router();

//CRUD Operations
accountRouter.post(
  "/",
  body("name").exists().trim().isString().withMessage("Invalid account name"),
  body("accountNumber")
    .exists()
    .trim()
    .isNumeric()
    .withMessage("Invalid account number"),
  body("entity").exists().trim().isString().withMessage("Invalid entity"),
  body("balance").exists().trim().isNumeric().withMessage("Invalid balance").toFloat(),
  inputValidatorHandler,
  accountController.createAccount
);
accountRouter.get(
  "/:accountId",
  param("accountId").isMongoId().withMessage("Invalid account id"),
  inputValidatorHandler,
  accountController.getSingleAccount
);
accountRouter.get("/", accountController.getAllAccounts);
accountRouter.put(
  "/:accountId",
  param("accountId").isMongoId().withMessage("Invalid account id"),
  body("name").optional().trim().isString().withMessage("Invalid account name"),
  body("accountNumber")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Invalid account number"),
  body("entity").optional().trim().isString().withMessage("Invalid entity"),
  body("balance").optional().trim().isNumeric().withMessage("Invalid balance").toFloat(),
  inputValidatorHandler,
  accountController.updateAccount
);
accountRouter.delete(
  "/:accountId",
  param("accountId").isMongoId().withMessage("Invalid account id"),
  inputValidatorHandler,
  accountController.deleteAccount
);

export default accountRouter;
