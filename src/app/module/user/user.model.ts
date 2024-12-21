import { model, Schema } from "mongoose";
import { IUser, userRole } from "./user.interface";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser>(
  {
    firebaseUid: {
      type: String,
      required: [true, "FirebaseId is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: userRole, // Restrict role to only the values in userRole
      default: "customer",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compare password method
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
