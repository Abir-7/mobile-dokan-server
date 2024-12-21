import { NextFunction, Request, Response } from "express";
import catchAsync from "../../lib/utils/catchAsync";
import { T_UserRole } from "../../module/user/user.interface";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../../config/config";
import { User } from "../../module/user/user.model";
export const auth = (...userRole: T_UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenData = req.headers.authorization;
    if (!tokenData) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route1"
      );
    }

    try {
      const decoded = jwt.verify(
        tokenData,
        config.jwt_secrete as string
      ) as JwtPayload & { userEmail: string; role: T_UserRole };

      const { role, userEmail } = decoded;

      const user = await User.findOne({ email: userEmail });
      //check user exixt or not
      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "You have no access to this route"
        );
      }

      if (userRole && !userRole.includes(role)) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You have no access to this route3"
        );
      }
      req.user = decoded;
      next();
    } catch (error) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
  });
};
