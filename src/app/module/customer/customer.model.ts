import { Schema, model, Document } from "mongoose";
import { ICustomer } from "./customer.interface";

const CustomerSchema = new Schema<ICustomer>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    name: { type: String, required: [true, "Name is required"] },
    mobile: { type: Number, required: [true, "Mobile is required"] },
    address: { type: String, required: [true, "Address is required"] },
    image: { type: String, default: null },
    userId: {
      type: String,
      required: [true, "User Id is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = model<ICustomer>("Customer", CustomerSchema);

export default Customer;
