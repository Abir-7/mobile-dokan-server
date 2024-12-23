import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middleware/Auth/auth";

const router = Router();
router.post("/create", UserController.createUser);
router.get("/all", auth("admin", "superAdmin"), UserController.getAllUsers);
router.delete(
  "/delete",
  auth("admin", "superAdmin"),
  UserController.deleteUser
);
router.patch(
  "/change-role",
  auth("admin", "superAdmin"),
  UserController.changeUserRoleToSeller
);
export const UserRouter = router;
