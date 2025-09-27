import { Request, Response, NextFunction } from "express";
import accountServices from "#v1/services/accountServices.js";
import { IJwtUser } from "#v1/models/userJWT.js";

const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = req.user as IJwtUser;
    const account = await accountServices.createAccount(user, data);
    res.status(201).json({ status: "Ok", account });
  } catch (error) {
    next(error);
  }
};

const getAllAccounts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const accounts = await accountServices.getAccounts(user);
    res.status(200).json({ status: "Ok", accounts });
  } catch (error) {
    next(error);
  }
};

const getSingleAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { accountId } = req.params;
    const account = await accountServices.getSingleAccount(user, accountId);
    res.status(200).json({ status: "Ok", account });
  } catch (error) {
    next(error);
  }
};

const updateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { accountId } = req.params;
    const data = req.body;
    const account = await accountServices.updateAccount(user, accountId, data);
    res.status(200).json({ status: "Ok", account });
  } catch (error) {
    next(error);
  }
};
const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { accountId } = req.params;
    const account = await accountServices.deleteAccount(user, accountId);
    res.json({ status: "Ok", account });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllAccounts,
  getSingleAccount,
  createAccount,
  updateAccount,
  deleteAccount,
};
