import { Router } from "express";
import * as groupController from "../controllers/groupController";

export const groupRouter = Router();

groupRouter.get('/', groupController.getAllGroups);
groupRouter.get('/:id', groupController.getGroupById);
groupRouter.post('/', groupController.createGroup);
groupRouter.put('/:id', groupController.updateGroupById);
groupRouter.delete('/:id', groupController.deleteGroupById);