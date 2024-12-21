import mongoose from "mongoose";
import Customer from "../customer/customer.model";
import { ICreateUser } from "./user.interface";
import { User } from "./user.model";
import admin from "../../DB/firebaseAdmin";
import bcrypt from "bcrypt";
import { get } from "http";
import { Seller } from "../seller/seller.model";

const createUser = async (data: Partial<ICreateUser>) => {
  const session = await mongoose.startSession();

  if (data.role !== "customer" && data.role !== "seller") {
    throw new Error("Role must be customer or seller");
  }

  try {
    session.startTransaction();

    const userRecord = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      ...(data.image && { photoURL: data.image }),
      displayName: data.name,
    });

    if (!userRecord.uid) {
      throw new Error("Failed to create user in Firebase.");
    }

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      role: data.role || "customer",
    });

    const hashedPassword = await bcrypt.hash(data.password as string, 10); //.env
    const userPayload = {
      email: data.email,
      password: hashedPassword,

      ...(data.role && { role: data.role }),
      firebaseUid: userRecord.uid,
    };
    const user = await User.create([userPayload], { session });
    const customerPayload = {
      userId: user[0]._id,
      email: user[0].email,
      address: data.address,
      name: data.name,
      mobile: data.mobile,
      ...(data.image && { image: data.image }),
    };

    let result;

    if (data.role === "customer") {
      result = await Customer.create([customerPayload], { session });
    }
    if (data.role === "seller") {
      result = await Seller.create([customerPayload], { session });
    }

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

const changeUserRoleToSeller = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (user?.role !== "customer") {
    throw new Error("User alreaty seller");
  }

  const customerData = await Customer.findOne({ email: email });
  if (!customerData) {
    throw new Error("Customer not found");
  }
  const sellerData = customerData.toObject();
  const seller = await Seller.create(sellerData);
  await Customer.findOneAndDelete({ email: email });

  return seller;
};

export const UserService = {
  createUser,
  getAllUsers,
  changeUserRoleToSeller,
};
