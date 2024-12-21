import { Router } from "express";
import { productController } from "./product.controller";
import { auth } from "../../middleware/Auth/auth";

const router = Router();

router.get("/all", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.post("/create", productController.create);
router.patch("/update/:id", auth("seller"), productController.update);

router.delete("/delete/:id", auth("seller"), productController.deleteProduct);

export const ProductRouter = router;
