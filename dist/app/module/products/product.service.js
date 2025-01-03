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
exports.productService = void 0;
const user_model_1 = require("../user/user.model");
const product_model_1 = __importDefault(require("./product.model"));
const create = (data, userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    // create product logic
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new Error("User not found");
    }
    const result = yield product_model_1.default.create(Object.assign(Object.assign({}, data), { seller: user === null || user === void 0 ? void 0 : user._id }));
    return result;
});
const update = (productId, updatePayload) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract model, features, and variants from the updatePayload
    const { model, features, variants, isAvailable } = updatePayload;
    console.log(updatePayload);
    // Build the dynamic update object
    const updateObject = {};
    // If isAvailable is provided and not empty, update the isAvailable field
    if (isAvailable !== undefined) {
        updateObject.isAvailable = isAvailable;
    }
    // If the model is provided and not empty, update the model field
    if (model) {
        updateObject.model = model;
    }
    // If features are provided, update specific feature fields
    if (features) {
        for (const [key, value] of Object.entries(features)) {
            if (value !== undefined && value !== null && value !== "") {
                updateObject[`features.${key}`] = value;
            }
        }
    }
    console.log(updateObject, "updateObject");
    // If variants are provided, loop through each variant and add the update for each variant
    if (variants && Array.isArray(variants)) {
        variants.forEach((variant) => {
            if (variant._id) {
                // Dynamically build the update object for each field if it's provided
                if (variant.price !== undefined && variant.price !== null) {
                    updateObject[`variants.$[variant].price`] = variant.price;
                }
                if (variant.stockQuantity !== undefined &&
                    variant.stockQuantity !== null) {
                    updateObject[`variants.$[variant].stockQuantity`] =
                        variant.stockQuantity;
                }
                if (variant.color && variant.color.length > 0) {
                    updateObject[`variants.$[variant].color`] = variant.color;
                }
                if (variant.ram) {
                    updateObject[`variants.$[variant].ram`] = variant.ram;
                }
                if (variant.storage) {
                    updateObject[`variants.$[variant].storage`] = variant.storage;
                }
            }
        });
    }
    // Prepare arrayFilters for variant updates based on _id
    const arrayFilters = variants
        ? variants.map((variant) => ({ "variant._id": variant._id })) // Filter variants by _id
        : [];
    // Remove any fields with null, undefined, or empty values from the update object
    for (const key in updateObject) {
        if (updateObject[key] === undefined ||
            updateObject[key] === null ||
            updateObject[key] === "") {
            delete updateObject[key];
        }
    }
    // Perform the update
    const updatedProduct = yield product_model_1.default.findOneAndUpdate({ _id: productId }, // Match the product by _id
    { $set: updateObject }, // Set the dynamic fields
    {
        new: true, // Return the updated document
        runValidators: true, // Validate input
        arrayFilters: arrayFilters.length ? arrayFilters : undefined, // Apply filters if variants are provided
    });
    if (!updatedProduct) {
        throw new Error("Product not found");
    }
    return updatedProduct;
});
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_model_1.default.find({
        isDeleted: false,
    });
    const brand = products.map((product) => product.brand);
    const uniqueBrand = Array.from(new Set(brand));
    return { products, uniqueBrand };
});
const getProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
});
const ProductByAvarageRating = () => __awaiter(void 0, void 0, void 0, function* () {
    const topRatedProducts = yield product_model_1.default.aggregate([
        // Match only available and non-deleted products
        { $match: { isAvailable: true, isDeleted: false } },
        // Sort by average rating in descending order
        { $sort: { "ratings.average": -1 } },
        // Limit to top 6 products
        { $limit: 6 },
    ]);
    return topRatedProducts;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    product.isDeleted = true;
    yield product.save();
    return product;
});
const sellerProduct = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new Error("User not found");
    }
    const products = yield product_model_1.default.find({ seller: user === null || user === void 0 ? void 0 : user._id, isDeleted: false });
    return products;
});
exports.productService = {
    create,
    update,
    getAllProducts,
    getProductById,
    deleteProduct,
    ProductByAvarageRating,
    sellerProduct,
};
