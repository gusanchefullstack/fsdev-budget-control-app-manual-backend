import { Router } from "express";
import providerController from "#v1/controllers/providerController.js";
import { body, param } from "express-validator";
import inputValidatorHandler from "#v1/middleware/inputValidatorHandler.js";

const providerRouter = Router();

//CRUD Operations
providerRouter.post(
  "/",
  body("name").exists().trim().isString().withMessage("Invalid provider name"),
  body("nit")
    .exists()
    .trim()
    .isNumeric()
    .withMessage("Invalid provider nit"),
  inputValidatorHandler,
  providerController.createProvider
);
providerRouter.get(
  "/:providerId",
  param("providerId").isMongoId().withMessage("Invalid provider id"),
  inputValidatorHandler,
  providerController.getSingleProvider
);
providerRouter.get("/", providerController.getAllProviders);
providerRouter.put(
  "/:providerId",
  param("providerId").isMongoId().withMessage("Invalid provider id"),
  body("name").optional().trim().isString().withMessage("Invalid provider name"),
  body("nit")
    .optional()
    .trim()
    .isNumeric()
    .withMessage("Invalid provider nit"),

  inputValidatorHandler,
  providerController.updateProvider
);
providerRouter.delete(
  "/:providerId",
  param("providerId").isMongoId().withMessage("Invalid provider id"),
  inputValidatorHandler,
  providerController.deleteProvider
);

export default providerRouter;
