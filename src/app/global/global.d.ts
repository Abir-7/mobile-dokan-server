import { JwtPayload } from "jsonwebtoken";
import { T_UserRole } from "../module/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & { userEmail: string; role: T_UserRole };
    }
  }
}
