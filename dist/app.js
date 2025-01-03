"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFoundHandler_1 = __importDefault(require("./app/middleware/notFoundHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your client's origin
    credentials: true, // Allow credentials (cookies, etc.)
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Wellcome to Mobile-Dokan");
});
app.use("/api/v1", routes_1.default);
app.use(notFoundHandler_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
