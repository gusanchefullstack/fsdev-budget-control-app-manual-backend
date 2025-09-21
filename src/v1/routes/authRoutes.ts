import {  Router } from "express";
import userController from "#v1/controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", userController.registerUser);
authRouter.post("/login", userController.loginUser);

export default authRouter