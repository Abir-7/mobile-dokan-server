import { Schema } from "mongoose";

export interface Iwishlist extends Document {
  userId: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
}
