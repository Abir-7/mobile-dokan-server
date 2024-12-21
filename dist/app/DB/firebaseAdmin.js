"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// /server/firebaseAdmin.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const mobileDokanService_json_1 = __importDefault(require("./mobileDokanService.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(mobileDokanService_json_1.default),
});
exports.default = firebase_admin_1.default;
