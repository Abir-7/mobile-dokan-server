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
exports.auth = void 0;
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const user_model_1 = require("../../module/user/user.model");
const auth = (...userRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenData = req.headers.authorization;
        if (!tokenData) {
            throw new AppError(http_status_1.default.UNAUTHORIZED, "You have no access to this route1");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(tokenData, config_1.config.jwt_secrete);
            const { role, userEmail } = decoded;
            const user = yield user_model_1.User.findOne({ email: userEmail });
            //check user exixt or not
            if (!user) {
                throw new AppError(http_status_1.default.NOT_FOUND, "You have no access to this route");
            }
            if (userRole && !userRole.includes(role)) {
                throw new AppError(http_status_1.default.UNAUTHORIZED, "You have no access to this route3");
            }
            req.user = decoded;
            next();
        }
        catch (error) {
            throw new AppError(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
        }
    }));
};
exports.auth = auth;
