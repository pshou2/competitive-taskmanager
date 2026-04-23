import { Router } from "express";
import * as userController from "../controllers/userController";

export const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);

userRouter.post("/:id/invitations/:groupId", userController.addUserInvitation);
userRouter.post("/:id/groups/:groupId", userController.addUserGroup);
userRouter.post("/", userController.createUser);

userRouter.put("/:id", userController.updateUserById);

userRouter.delete("/:id/invitations/:groupId", userController.removeUserInvitation);
userRouter.delete("/:id/groups/:groupId", userController.removeUserGroup);
userRouter.delete("/:id", userController.deleteUserById);


