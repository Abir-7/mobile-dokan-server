import { Router } from "express";
import { wishlistController } from "./wishlist.controller";
import { auth } from "../../middleware/Auth/auth";

const router = Router();
router.post("/add", auth("customer"), wishlistController.addWishlist);
router.get("/all", auth("customer"), wishlistController.getAllWishlist);
router.delete(
  "/delete/:id",
  auth("customer"),
  wishlistController.deleteWishlist
);

export const WishlistRouter = router;
