"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const mongoose_1 = require("mongoose");
const sellerSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    mobile: {
        type: Number,
        required: [true, "Mobile is required"],
    },
    image: {
        type: String,
        default: null,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is required"],
    },
}, {
    timestamps: true,
});
exports.Seller = (0, mongoose_1.model)("Seller", sellerSchema);
