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
exports.wishlistController = void 0;
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = require("../../lib/utils/sendResponse");
const wishlist_service_1 = require("./wishlist.service");
const addWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_service_1.WishlistService.addWishlist(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Wishlist added successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
const getAllWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Add this function
    const user = req.user;
    const result = yield wishlist_service_1.WishlistService.getAllWishlist(user.userEmail);
    (0, sendResponse_1.sendResponse)(res, {
        message: "All wishlist fetched successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
const deleteWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield wishlist_service_1.WishlistService.deleteWishlist(id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Wishlist deleted successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
exports.wishlistController = {
    addWishlist,
    getAllWishlist,
    deleteWishlist,
};
