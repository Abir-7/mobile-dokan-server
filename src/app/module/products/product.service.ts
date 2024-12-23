import { User } from "../user/user.model";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const create = async (data: IProduct, userEmail: string) => {
  // create product logic
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error("User not found");
  }
  const result = await Product.create({ ...data, seller: user?._id });
  return result;
};

const update = async (productId: string, updatePayload: Partial<IProduct>) => {
  // Extract model, features, and variants from the updatePayload
  const { model, features, variants, isAvailable } = updatePayload;

  console.log(updatePayload);

  // Build the dynamic update object
  const updateObject: any = {};

  // If isAvailable is provided and not empty, update the isAvailable field
  if (isAvailable !== undefined) {
    updateObject.isAvailable = isAvailable;
  }

  // If the model is provided and not empty, update the model field
  if (model) {
    updateObject.model = model;
  }

  // If features are provided, update specific feature fields
  if (features) {
    for (const [key, value] of Object.entries(features)) {
      if (value !== undefined && value !== null && value !== "") {
        updateObject[`features.${key}`] = value;
      }
    }
  }

  console.log(updateObject, "updateObject");

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
          if (variant.price !== undefined && variant.price !== null) {
            updateObject[`variants.$[variant].price`] = variant.price;
          }
          if (
            variant.stockQuantity !== undefined &&
            variant.stockQuantity !== null
          ) {
            updateObject[`variants.$[variant].stockQuantity`] =
              variant.stockQuantity;
          }
          if (variant.color && variant.color.length > 0) {
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

  // Remove any fields with null, undefined, or empty values from the update object
  for (const key in updateObject) {
    if (
      updateObject[key] === undefined ||
      updateObject[key] === null ||
      updateObject[key] === ""
    ) {
      delete updateObject[key];
    }
  }

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

  const brand = products.map((product) => product.brand);
  const uniqueBrand = Array.from(new Set(brand));

  return { products, uniqueBrand };
};
const getProductById = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const ProductByAvarageRating = async () => {
  const topRatedProducts = await Product.aggregate([
    // Match only available and non-deleted products
    { $match: { isAvailable: true, isDeleted: false } },

    // Sort by average rating in descending order
    { $sort: { "ratings.average": -1 } },

    // Limit to top 6 products
    { $limit: 6 },
  ]);

  return topRatedProducts;
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

const sellerProduct = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new Error("User not found");
  }
  const products = await Product.find({ seller: user?._id, isDeleted: false });
  return products;
};

export const productService = {
  create,
  update,
  getAllProducts,
  getProductById,
  deleteProduct,
  ProductByAvarageRating,
  sellerProduct,
};
