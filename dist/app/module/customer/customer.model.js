"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    name: { type: String, required: [true, "Name is required"] },
    mobile: { type: Number, required: [true, "Mobile is required"] },
    address: { type: String, required: [true, "Address is required"] },
    image: { type: String, default: null },
    userId: {
        type: String,
        required: [true, "User Id is required"],
        ref: "User",
    },
}, {
    timestamps: true,
});
const Customer = (0, mongoose_1.model)("Customer", CustomerSchema);
exports.default = Customer;
