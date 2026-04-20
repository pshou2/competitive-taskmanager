import { Router } from "express";
import * as userController from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);

userRouter.post("/", userController.createUser);

userRouter.put("/:id", userController.updateUserById);
userRouter.post("/:id/invitations/:groupId", userController.updateUserInvitations);
userRouter.post("/:id/groups/:groupId", userController.updateUserGroups);

userRouter.delete("/:id", userController.deleteUserById);
userRouter.delete("/:id/invitations/:groupId", userController.deleteUserInvitations);
userRouter.delete("/:id/groups/:groupId", userController.deleteUserGroups);

