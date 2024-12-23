"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = require("../../lib/utils/sendResponse");
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const result = yield user_service_1.UserService.createUser(userData);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User Created",
        success: true,
        statusCode: 200,
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        message: "All Users Fetched",
        success: true,
        statusCode: 200,
        data: result,
    });
}));
const changeUserRoleToSeller = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield user_service_1.UserService.changeUserRoleToSeller(email);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User role changed to seller",
        success: true,
        statusCode: 200,
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    console.log(req.body);
    const result = yield user_service_1.UserService.deleteUser(data);
    (0, sendResponse_1.sendResponse)(res, {
        message: "User Deleted",
        success: true,
        statusCode: 200,
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUsers,
    changeUserRoleToSeller,
    deleteUser,
};
