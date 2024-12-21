import { IProduct } from "./product.interface";
import Product from "./product.model";

const create = async (data: IProduct) => {
  // create product logic
  const result = await Product.create(data);
  return result;
};

const update = async (productId: string, updatePayload: Partial<IProduct>) => {
  // Extract model, features, and variants from the updatePayload
  const { model, features, variants } = updatePayload;

  // Build the dynamic update object
  const updateObject: any = {};

  // If the model is provided, update the model field
  if (model) {
    updateObject.model = model;
  }

  // If features are provided, update specific feature fields
  if (features) {
    for (const [key, value] of Object.entries(features)) {
      updateObject[`features.${key}`] = value;
    }
  }

  // If variants are provided, loop through each variant and add the update for each variant
  if (variants && Array.isArray(variants)) {
    variants.forEach(
      (variant: {
        _id: string;
        price?: number;
        stockQuantity?: number;
        color?: string[];
        ram?: string;
        storage?: string;
      }) => {
        if (variant._id) {
          // Dynamically build the update object for each field if it's provided
          if (variant.price) {
            updateObject[`variants.$[variant].price`] = variant.price;
          }
          if (variant.stockQuantity) {
            updateObject[`variants.$[variant].stockQuantity`] =
              variant.stockQuantity;
          }
          if (variant.color) {
            updateObject[`variants.$[variant].color`] = variant.color;
          }
          if (variant.ram) {
            updateObject[`variants.$[variant].ram`] = variant.ram;
          }
          if (variant.storage) {
            updateObject[`variants.$[variant].storage`] = variant.storage;
          }
        }
      }
    );
  }

  // Prepare arrayFilters for variant updates based on _id
  const arrayFilters = variants
    ? variants.map((variant) => ({ "variant._id": variant._id })) // Filter variants by _id
    : [];

  console.log(updateObject, "gg", arrayFilters);

  // Perform the update
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId }, // Match the product by _id
    { $set: updateObject }, // Set the dynamic fields
    {
      new: true, // Return the updated document
      runValidators: true, // Validate input
      arrayFilters: arrayFilters.length ? arrayFilters : undefined, // Apply filters if variants are provided
    }
  );

  if (!updatedProduct) {
    throw new Error("Product not found");
  }

  return updatedProduct;
};

const getAllProducts = async () => {
  const products = await Product.find({
    isDeleted: false,
  });
  return products;
};
const getProductById = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const deleteProduct = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  product.isDeleted = true;
  await product.save();
  return product;
};

export const productService = {
  create,
  update,
  getAllProducts,
  getProductById,
  deleteProduct,
};
