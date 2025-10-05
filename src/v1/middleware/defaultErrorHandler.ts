import { Request, Response, NextFunction } from "express";

const defaultErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.log("***************************** Error ***************************")
    console.error(err.stack);
    console.log("************************ End of Error *************************")
  res.json({ status: "error", message: err.message });
};

export default defaultErrorHandler;
