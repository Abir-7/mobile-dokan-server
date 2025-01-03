"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const auth_1 = require("../../middleware/Auth/auth");
const router = (0, express_1.Router)();
// Define specific routes before dynamic routes
router.get("/all", product_controller_1.productController.getAllProduct);
router.get("/seller-product", (0, auth_1.auth)("seller"), product_controller_1.productController.sellerProduct);
router.get("/top-rated", product_controller_1.productController.productByAvarageRating); // Move this above `/:id`
router.get("/:id", product_controller_1.productController.getProductById);
router.post("/create", (0, auth_1.auth)("seller"), product_controller_1.productController.create);
router.patch("/update/:id", (0, auth_1.auth)("seller"), product_controller_1.productController.update);
router.delete("/delete/:id", (0, auth_1.auth)("seller"), product_controller_1.productController.deleteProduct);
exports.ProductRouter = router;
