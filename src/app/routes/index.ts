import { Router } from "express";

import { UserRouter } from "../module/user/user.route";
import { AuthRouter } from "../module/auth/auth.route";
import { ProductRouter } from "../module/products/product.route";
import { WishlistRouter } from "../module/wishlist/wishlist.route";

const router = Router();

const routeData = [
  {
    route: UserRouter,
    path: "/user",
  },
  {
    route: AuthRouter,
    path: "/auth",
  },
  {
    route: ProductRouter,
    path: "/product",
  },
  {
    route: WishlistRouter,
    path: "/wishlist",
  },
];

routeData.forEach((route) => router.use(route.path, route.route));
export default router;
