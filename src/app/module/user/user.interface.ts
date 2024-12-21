import { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: (typeof userRole)[number];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  isBlocked: boolean;
  firebaseUid: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

//create user interface
export interface ICreateUser {
  email: string;
  name: string;
  address: string;
  role?: (typeof userRole)[number]; // Extend roles as needed
  image?: string; // Optional field
  mobile: number; // Ensure the mobile number is valid
  password: string;
}

export const userRole: T_UserRole[] = [
  "admin",
  "superAdmin",
  "customer",
  "seller",
];

export type T_UserRole = "superAdmin" | "admin" | "customer" | "seller";
