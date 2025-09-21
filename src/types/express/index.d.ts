import { IJwtUser } from "#v1/models/userJWT.ts";

export { };

declare global {
  namespace Express {
    export interface Request {
      user?: IJwtUser | string | undefined
    }
  }
}