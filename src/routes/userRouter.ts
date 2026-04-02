import { Router } from "express";
import * as userController from "../controllers/userController";

export const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.get('/:id', userController.getUserById);