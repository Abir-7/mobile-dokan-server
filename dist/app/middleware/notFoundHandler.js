"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};
exports.default = notFoundHandler;
