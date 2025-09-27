import { Request, Response, NextFunction } from "express";

const defaultErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res.json({ status: "error", message: err.message });
};

export default defaultErrorHandler;
