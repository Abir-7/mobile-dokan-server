import catchAsync from "../../lib/utils/catchAsync";
import { sendResponse } from "../../lib/utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(async (req, res, next) => {
  const userData = req.body;
  const result = await UserService.createUser(userData);
  sendResponse(res, {
    message: "User Created",
    success: true,
    statusCode: 200,
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await UserService.getAllUsers();
  sendResponse(res, {
    message: "All Users Fetched",
    success: true,
    statusCode: 200,
    data: result,
  });
});
const changeUserRoleToSeller = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const result = await UserService.changeUserRoleToSeller(email);
  sendResponse(res, {
    message: "User role changed to seller",
    success: true,
    statusCode: 200,
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  changeUserRoleToSeller,
};
