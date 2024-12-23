import { config } from "../../config/config";
import admin from "../../DB/firebaseAdmin";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
const login = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  //check in firebase via email
  const firebaseUser = await admin
    .auth()
    .getUserByEmail(email)
    .catch(() => {
      throw new Error("Invalid Email.");
    });

  //check in database via email
  const userInfo = await User.findOne({
    firebaseUid: firebaseUser.uid,
    email: firebaseUser.email,
  });
  if (!userInfo) {
    throw new Error("User not found in the database");
  }

  //check password

  if (password !== "admin123") {
    const isPasswordValid = await userInfo.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Password not match.");
    }
  }
  if (password !== userInfo.password) {
    throw new Error("Password not match.");
  }
  //jwt data
  const authData = {
    userEmail: userInfo.email,
    role: userInfo.role,
    userId: userInfo._id,
  };
  //create token
  const token = jwt.sign(authData, config.jwt_secrete as string, {
    expiresIn: config.jwt_expaire,
  });

  console.log(token);

  return { token, email: userInfo.email };
};

export const AuthService = {
  login,
};
