import { Document } from "mongoose";

export interface ICustomer extends Document {
  email: string;
  name: string;
  address: string;
  mobile: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
