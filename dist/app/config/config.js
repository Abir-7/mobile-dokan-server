"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.config = {
    port: process.env.PORT,
    jwt_secrete: process.env.JWT_SECRETE,
    jwt_expaire: process.env.JWT_EXPAIRE,
    mongoDb_Uri: process.env.MONGODB_URI,
};
