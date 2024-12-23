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
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const customer_model_1 = __importDefault(require("../customer/customer.model"));
const user_model_1 = require("./user.model");
const firebaseAdmin_1 = __importDefault(require("../../DB/firebaseAdmin"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const seller_model_1 = require("../seller/seller.model");
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    if (data.role !== "customer" && data.role !== "seller") {
        throw new Error("Role must be customer or seller");
    }
    try {
        session.startTransaction();
        const userRecord = yield firebaseAdmin_1.default.auth().createUser(Object.assign(Object.assign({ email: data.email, password: data.password }, (data.image && { photoURL: data.image })), { displayName: data.name }));
        if (!userRecord.uid) {
            throw new Error("Failed to create user in Firebase.");
        }
        yield firebaseAdmin_1.default.auth().setCustomUserClaims(userRecord.uid, {
            role: data.role || "customer",
        });
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10); //.env
        const userPayload = Object.assign(Object.assign({ email: data.email, password: hashedPassword }, (data.role && { role: data.role })), { firebaseUid: userRecord.uid });
        const user = yield user_model_1.User.create([userPayload], { session });
        const customerPayload = Object.assign({ userId: user[0]._id, email: user[0].email, address: data.address, name: data.name, mobile: data.mobile }, (data.image && { image: data.image }));
        let result;
        if (data.role === "customer") {
            result = yield customer_model_1.default.create([customerPayload], { session });
        }
        if (data.role === "seller") {
            result = yield seller_model_1.Seller.create([customerPayload], { session });
        }
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error(error);
    }
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find({
        role: { $nin: ["admin", "superAdmin"] },
    });
    return users;
});
const changeUserRoleToSeller = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if ((user === null || user === void 0 ? void 0 : user.role) !== "customer") {
        throw new AppError(500, "User alreaty seller");
    }
    const customerData = yield customer_model_1.default.findOne({ email: email });
    if (!customerData) {
        throw new Error("Customer not found");
    }
    const sellerData = customerData.toObject();
    const seller = yield seller_model_1.Seller.create(sellerData);
    yield customer_model_1.default.findOneAndDelete({ email: email });
    return seller;
});
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(email);
    const user = yield user_model_1.User.findOneAndUpdate({ email: email }, { isDeleted: true });
    if (!user) {
        throw new Error("User not found");
    }
    yield user_model_1.User.findOneAndDelete({ email: email });
    return user;
});
exports.UserService = {
    createUser,
    getAllUsers,
    changeUserRoleToSeller,
    deleteUser,
};
