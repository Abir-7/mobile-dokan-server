import { Router } from "express";
import { productController } from "./product.controller";
import { auth } from "../../middleware/Auth/auth";

const router = Router();

// Define specific routes before dynamic routes
router.get("/all", productController.getAllProduct);
router.get("/seller-product", auth("seller"), productController.sellerProduct);
router.get("/top-rated", productController.productByAvarageRating); // Move this above `/:id`
router.get("/:id", productController.getProductById);

router.post("/create", auth("seller"), productController.create);
router.patch("/update/:id", auth("seller"), productController.update);
router.delete("/delete/:id", auth("seller"), productController.deleteProduct);

export const ProductRouter = router;
