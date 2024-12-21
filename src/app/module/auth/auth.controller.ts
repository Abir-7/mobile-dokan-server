import catchAsync from "../../lib/utils/catchAsync";
import { sendResponse } from "../../lib/utils/sendResponse";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await AuthService.login(loginData);
  sendResponse(res, {
    message: "Login Successfull",
    success: true,
    statusCode: 200,
    data: result,
  });
});

export const AuthController = {
  login,
};
