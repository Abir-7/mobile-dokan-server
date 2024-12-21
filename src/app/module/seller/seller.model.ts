import { model, Schema } from "mongoose";
import { ISeller } from "./seller.interface";

const sellerSchema = new Schema<ISeller>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },

    mobile: {
      type: Number,
      required: [true, "Mobile is required"],
    },
    image: {
      type: String,
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
  },
  {
    timestamps: true,
  }
);

export const Seller = model<ISeller>("Seller", sellerSchema);
