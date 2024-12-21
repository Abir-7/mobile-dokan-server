import { Document, Schema } from "mongoose";

export interface ISeller extends Document {
  email: string;
  name: string;
  address: string;
  mobile: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}
