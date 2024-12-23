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
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config/config");
const mongoose_1 = __importDefault(require("mongoose"));
const seedAdmin_1 = __importDefault(require("./app/DB/seedAdmin"));
// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("There was an uncaught exception:", err);
    process.exit(1);
});
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.config.mongoDb_Uri);
            console.log("Connected to MongoDB successfully!");
            (0, seedAdmin_1.default)();
            app_1.default.listen(config_1.config.port, () => {
                console.log(`Example app listening on port ${config_1.config.port}`);
            });
        }
        catch (err) {
            console.error("Error occurred while connecting to MongoDB:", err);
            process.exit(1);
        }
    });
}
main();
