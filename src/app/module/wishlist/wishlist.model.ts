import { model, Schema } from "mongoose";
import { Iwishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<Iwishlist>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product Id is required"],
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

export const Wishlist = model<Iwishlist>("Wishlist", wishlistSchema);
