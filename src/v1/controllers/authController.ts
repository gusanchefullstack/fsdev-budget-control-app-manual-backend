import userServices from "#v1/services/authServices.js";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "#generated/prisma/index.js";
import { ICredentials } from "#v1/models/credentials.js";


const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body as Prisma.UserCreateInput;
    const newUser = await userServices.createUser(userData);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = req.body as ICredentials;
    const token = await userServices.loginUser(credentials);
    res.json(token);
  } catch (error) {
    next(error);
  }
};

export default {
    registerUser,
    loginUser
};
