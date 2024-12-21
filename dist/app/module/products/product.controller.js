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
exports.productController = void 0;
const catchAsync_1 = __importDefault(require("../../lib/utils/catchAsync"));
const sendResponse_1 = require("../../lib/utils/sendResponse");
const product_service_1 = require("./product.service");
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.create(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Product created successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
const update = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productService.update(id, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Product updated successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_service_1.productService.getAllProducts();
    (0, sendResponse_1.sendResponse)(res, {
        message: "All products fetched successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
const getProductById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productService.getProductById(id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Product fetched successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
const deleteProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield product_service_1.productService.deleteProduct(id);
    (0, sendResponse_1.sendResponse)(res, {
        message: "Product deleted successfully",
        data: result,
        statusCode: 200,
        success: true,
    });
}));
exports.productController = {
    create,
    update,
    getAllProduct,
    getProductById,
    deleteProduct,
};
