import catchAsync from "../../lib/utils/catchAsync";
import { sendResponse } from "../../lib/utils/sendResponse";
import { WishlistService } from "./wishlist.service";

const addWishlist = catchAsync(async (req, res) => {
  const result = await WishlistService.addWishlist(req.body);
  sendResponse(res, {
    message: "Wishlist added successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});

const getAllWishlist = catchAsync(async (req, res) => {
  // Add this function
  const user = req.user;
  const result = await WishlistService.getAllWishlist(user.userEmail);
  sendResponse(res, {
    message: "All wishlist fetched successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});

const deleteWishlist = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WishlistService.deleteWishlist(id);
  sendResponse(res, {
    message: "Wishlist deleted successfully",
    data: result,
    statusCode: 200,
    success: true,
  });
});

export const wishlistController = {
  addWishlist,
  getAllWishlist,
  deleteWishlist,
};
