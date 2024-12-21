import mongoose, { Schema, Document } from "mongoose";
import { IProduct, IVariant } from "./product.interface";

const VariantSchema = new Schema<IVariant>({
  storage: { type: String, required: true },
  ram: { type: String, required: true },
  color: { type: [String], required: true },
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
});

const MobileSchema = new Schema<IProduct>(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    variants: { type: [VariantSchema], required: true }, // Array of variants
    features: {
      screenSize: { type: String, required: true },
      battery: { type: String, required: true },
      camera: { type: String, required: true },
      processor: { type: String, required: true },
      os: { type: String, required: true },
    },
    releaseDate: { type: Date, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", MobileSchema);

export default Product;
