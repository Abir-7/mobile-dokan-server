import catchAsync from "../../lib/utils/catchAsync";
import { sendResponse } from "../../lib/utils/sendResponse";
import { productService } from "./product.service";

const create = catchAsync(async (req, res) => {
  const result = await productService.create(req.body);
  sendResponse(res, {
    message: "Product created successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});
const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.update(id, req.body);
  sendResponse(res, {
    message: "Product updated successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProducts();
  sendResponse(res, {
    message: "All products fetched successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});
const getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.getProductById(id);
  sendResponse(res, {
    message: "Product fetched successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await productService.deleteProduct(id);
  sendResponse(res, {
    message: "Product deleted successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});

export const productController = {
  create,
  update,
  getAllProduct,
  getProductById,
  deleteProduct,
};
