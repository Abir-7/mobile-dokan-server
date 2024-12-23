"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const VariantSchema = new mongoose_1.Schema({
    storage: { type: String, required: true },
    ram: { type: String, required: true },
    color: { type: [String], required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
});
const MobileSchema = new mongoose_1.Schema({
    brand: { type: String, required: true },
    image: { type: [String], required: true },
    model: { type: String, required: true },
    variants: { type: [VariantSchema], required: true }, // Array of variants
    features: {
        screenSize: { type: String, required: true },
        battery: { type: String, required: true },
        camera: { type: String, required: true },
        processor: { type: String, required: true },
        os: { type: String, required: true },
    },
    releaseDate: { type: Date, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    isDeleted: { type: Boolean, default: false },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", MobileSchema);
exports.default = Product;
