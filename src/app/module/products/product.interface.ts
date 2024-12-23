import { Schema } from "mongoose";

export interface IVariant {
  storage: string; // e.g., "128GB"
  ram: string; // e.g., "8GB"
  color: string[]; // e.g., ["Black", "White", "Blue"]
  price: number; // Price for this variant
  stockQuantity: number; // Number of items in stock
  _id: string;
}

export interface IProduct extends Document {
  _id: string;
  brand: string;
  image: string[];
  model: string;
  variants: IVariant[]; // Array of variants
  features: {
    screenSize: string; // e.g., "6.5 inches"
    battery: string; // e.g., "5000mAh"
    camera: string; // e.g., "108MP + 12MP + 5MP"
    processor: string; // e.g., "Snapdragon 888"
    os: string; // e.g., "Android 12"
  };
  releaseDate: Date;
  isAvailable: boolean;
  ratings: {
    average: number;
    count: number;
  };
  seller: Schema.Types.ObjectId; // Seller's user ID
  isDeleted?: boolean;
}
