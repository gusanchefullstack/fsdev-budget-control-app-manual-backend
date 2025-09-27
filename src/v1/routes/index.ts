import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import authRouter from "./authRoutes.js";
import accountRouter from "./accountRoutes.js";
import providerRouter from "./providerRoutes.js";
import { protect } from "#v1/middleware/auth.js";

const apiv1Router = Router();

apiv1Router.use("/accounts", protect, accountRouter);
apiv1Router.use("/providers", protect, providerRouter);
apiv1Router.use(
  "/admin",
  protect,
  (req: Request, res: Response, next: NextFunction) => {
    res.send({ msg: "admin routes" });
  }
);

apiv1Router.use("/auth", authRouter);

export default apiv1Router;
