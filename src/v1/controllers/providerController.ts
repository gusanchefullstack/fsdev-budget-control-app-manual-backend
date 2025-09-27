import { Request, Response, NextFunction } from "express";
import providerServices from "#v1/services/providerServices.js";
import { IJwtUser } from "#v1/models/userJWT.js";

const createProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const user = req.user as IJwtUser;
    const provider = await providerServices.createProvider(user, data);
    res.status(201).json({ status: "Ok", provider });
  } catch (error) {
    next(error);
  }
};

const getAllProviders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const providers = await providerServices.getProviders(user);
    res.status(200).json({ status: "Ok", providers });
  } catch (error) {
    next(error);
  }
};

const getSingleProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { providerId } = req.params;
    const provider = await providerServices.getSingleProvider(user, providerId);
    res.status(200).json({ status: "Ok", provider });
  } catch (error) {
    next(error);
  }
};

const updateProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { providerId } = req.params;
    const data = req.body;
    const provider = await providerServices.updateProvider(user, providerId, data);
    res.status(200).json({ status: "Ok", provider });
  } catch (error) {
    next(error);
  }
};
const deleteProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as IJwtUser;
    const { providerId } = req.params;
    const provider = await providerServices.deleteProvider(user, providerId);
    res.json({ status: "Ok", provider });
  } catch (error) {
    next(error);
  }
};

export default {
  getAllProviders,
  getSingleProvider,
  createProvider,
  updateProvider,
  deleteProvider,
};
