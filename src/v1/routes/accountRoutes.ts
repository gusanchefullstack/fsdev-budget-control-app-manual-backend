import { Router } from "express";

const accountRouter = Router();

accountRouter.post("/", (req, res) => {
  console.log("Create account");
  res.json("Create account");
});
accountRouter.get("/", (req, res) => {
  console.log("Get all accounts");
  res.json("Get all accounts");
});
accountRouter.get("/:id", (req, res) => {
  console.log("Get account by id", req.params.id);
  res.json("Get account by id");
});
accountRouter.put("/:id", (req, res) => {
  console.log("Update account by id");
  res.json("Update account by id");
});
accountRouter.delete("/", (req, res) => {
  console.log("Delete account by id");
  res.json("Delete account by id");
});

export default accountRouter


