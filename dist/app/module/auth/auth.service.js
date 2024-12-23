"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = require("../../config/config");
const firebaseAdmin_1 = __importDefault(require("../../DB/firebaseAdmin"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    //check in firebase via email
    const firebaseUser = yield firebaseAdmin_1.default
      .auth()
      .getUserByEmail(email)
      .catch(() => {
        throw new Error("Invalid Email.");
      });
    //check in database via email
    const userInfo = yield user_model_1.User.findOne({
      firebaseUid: firebaseUser.uid,
      email: firebaseUser.email,
    });
    if (!userInfo) {
      throw new Error("User not found in the database");
    }
    //check password
    const isPasswordValid = yield userInfo.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Password not match.");
    }
    //jwt data
    const authData = {
      userEmail: userInfo.email,
      role: userInfo.role,
      userId: userInfo._id,
    };
    //create token
    const token = jsonwebtoken_1.default.sign(
      authData,
      config_1.config.jwt_secrete,
      {
        expiresIn: config_1.config.jwt_expaire,
      }
    );

    return { token, email: userInfo.email };
  });
exports.AuthService = {
  login,
};
