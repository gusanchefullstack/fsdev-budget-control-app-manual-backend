import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const apiv1 = Router();

apiv1.use("/accounts", (req: Request, res: Response, next: NextFunction) => {
  res.send("account routes");
});
apiv1.use("/providers", (req: Request, res: Response, next: NextFunction) => {
  res.send("providers routes");
});
apiv1.use("/admin", (req: Request, res: Response, next: NextFunction) => {
  res.send("admin routes");
});

export default apiv1;
