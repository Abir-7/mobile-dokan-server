import { User } from "../user/user.model";
import { Iwishlist } from "./wishlist.interface";
import { Wishlist } from "./wishlist.model";

const addWishlist = async (data: Iwishlist) => {
  const result = await Wishlist.create(data);
  return result;
};

const getAllWishlist = async (email: string) => {
  const user = await User.findOne({ email: email });
  const result = await Wishlist.find({ userId: user?._id });
  return result;
};

const deleteWishlist = async (id: string) => {
  const result = await Wishlist.findByIdAndDelete(id);
  return result;
};

export const WishlistService = {
  addWishlist,
  getAllWishlist,
  deleteWishlist,
};
