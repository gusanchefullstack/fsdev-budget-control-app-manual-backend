import express from "express";
import { Request, Response, NextFunction } from "express";
import appConfig from "#config/config.js";
import apiv1Router from "#v1/routes/index.js";

const app = express();

app.use(express.json())
app.use("/api/v1", apiv1Router);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Hello from budget control app" });
  console.log("Response sent by server");
});

app.listen(appConfig.port, () => {
  console.log(`Application initialized on port ${appConfig.port}`);
});
