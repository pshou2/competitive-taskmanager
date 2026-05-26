import { Router } from "express";
import * as userController from "../controllers/userController";
import { protect } from "../middleware/auth";

export const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);

userRouter.post("/:id/invitations/:groupId", protect, userController.addUserInvitation);
userRouter.post("/:id/groups/:groupId", protect, userController.addUserGroup);
/** This route is redundant because of authrouter register and login */
//userRouter.post("/", userController.createUser);

userRouter.put("/:id", protect, userController.updateUserById);

userRouter.delete("/:id/invitations/:groupId", protect, userController.removeUserInvitation);
userRouter.delete("/:id/groups/:groupId", protect, userController.removeUserGroup);
userRouter.delete("/:id", protect, userController.deleteUserById);


