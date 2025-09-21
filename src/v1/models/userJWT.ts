import { JwtPayload } from "jsonwebtoken";

export interface IJwtUser {
  username: string;
  password: string;
  email: string;
}
