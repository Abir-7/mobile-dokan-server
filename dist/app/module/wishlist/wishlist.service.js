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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const user_model_1 = require("../user/user.model");
const wishlist_model_1 = require("./wishlist.model");
const addWishlist = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.create(data);
    return result;
});
const getAllWishlist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    const result = yield wishlist_model_1.Wishlist.find({ userId: user === null || user === void 0 ? void 0 : user._id });
    return result;
});
const deleteWishlist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_model_1.Wishlist.findByIdAndDelete(id);
    return result;
});
exports.WishlistService = {
    addWishlist,
    getAllWishlist,
    deleteWishlist,
};
