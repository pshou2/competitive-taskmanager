import { Router } from "express";
import * as groupController from "../controllers/groupController";

export const groupRouter = Router();

groupRouter.get("/:groupId/rankings", groupController.getGroupRankings);
groupRouter.get("/:id", groupController.getGroupById);
groupRouter.get("/", groupController.getAllGroups);

groupRouter.post("/:id/members/:userId", groupController.addGroupMember);
groupRouter.post("/:id/invitations/:userId", groupController.addGroupInvitation);
groupRouter.post("/", groupController.createGroup);

groupRouter.put("/:id", groupController.updateGroupById);

groupRouter.delete("/:id/members/:userId", groupController.removeGroupMember);
groupRouter.delete("/:id/invitations/:userId", groupController.removeGroupInvitation);
groupRouter.delete("/:id", groupController.deleteGroupById);