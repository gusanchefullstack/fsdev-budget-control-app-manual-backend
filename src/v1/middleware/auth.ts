import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import appConfig from "#config/config.js";
import { IJwtUser } from "#v1/models/userJWT.js";
import bcrypt from "bcrypt"

//Compare password and hashed password
export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash)
}

//Hash a plain password
export const hashPasswords = (pasword: string) => {
    return bcrypt.hash(pasword, 5)
}

//Generate JWT Token for new user registered
export const createJWT = (user: IJwtUser) => {
  const token = jwt.sign(user, appConfig.jwtSecret, { expiresIn: "8h" });
  return token;
};

//Middleware to protect each api route for only authenticated users
export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json("Not a valid token");
    return;
  }
  try {
    const user = jwt.verify(token, appConfig.jwtSecret) as IJwtUser;
    req.user = user;
    next();
  } catch (error) {
    console.log("Not a valid token");
    res.status(401);
    res.json("Not a valid token");
    return;
  }
};
