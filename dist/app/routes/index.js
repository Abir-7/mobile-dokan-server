"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const product_route_1 = require("../module/products/product.route");
const wishlist_route_1 = require("../module/wishlist/wishlist.route");
const router = (0, express_1.Router)();
const routeData = [
    {
        route: user_route_1.UserRouter,
        path: "/user",
    },
    {
        route: auth_route_1.AuthRouter,
        path: "/auth",
    },
    {
        route: product_route_1.ProductRouter,
        path: "/product",
    },
    {
        route: wishlist_route_1.WishlistRouter,
        path: "/wishlist",
    },
];
routeData.forEach((route) => router.use(route.path, route.route));
exports.default = router;
