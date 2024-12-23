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
const user_model_1 = require("../module/user/user.model");
const firebaseAdmin_1 = __importDefault(require("./firebaseAdmin"));
const superUser = {
    email: "superadmin@gmail.com",
    password: "admin123",
    role: "superAdmin",
};
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    //when database is connected, we will check is there any user who is super admin
    const isSuperAdminExits = yield user_model_1.User.findOne({ role: "superAdmin" });
    if (!isSuperAdminExits) {
        const userRecord = yield firebaseAdmin_1.default.auth().createUser({
            email: superUser.email,
            password: superUser.password,
        });
        yield firebaseAdmin_1.default.auth().setCustomUserClaims(userRecord.uid, {
            role: superUser.role,
        });
        yield user_model_1.User.create(Object.assign(Object.assign({}, superUser), { firebaseUid: userRecord.uid }));
    }
});
exports.default = seedSuperAdmin;
