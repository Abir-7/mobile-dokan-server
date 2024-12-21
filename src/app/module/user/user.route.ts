import { Router } from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middleware/Auth/auth";

const router = Router();
router.post("/create", UserController.createUser);
router.get("/all", auth("admin"), UserController.getAllUsers);
router.patch(
  "/change-role",
  auth("admin"),
  UserController.changeUserRoleToSeller
);
export const UserRouter = router;
