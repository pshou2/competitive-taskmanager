import { Router } from "express";
import * as groupController from "../controllers/groupController";
import { protect } from "../middleware/auth";

export const groupRouter = Router();

groupRouter.get("/:groupId/rankings", protect, groupController.getGroupRankings);
groupRouter.get("/:id", groupController.getGroupById);
groupRouter.get("/", groupController.getAllGroups);

groupRouter.post("/:id/members/:userId", protect, groupController.addGroupMember);
groupRouter.post("/:id/invitations/:userId", protect, groupController.addGroupInvitation);
groupRouter.post("/", protect, groupController.createGroup);

groupRouter.put("/:id", protect, groupController.updateGroupById);

groupRouter.delete("/:id/members/:userId", protect, groupController.removeGroupMember);
groupRouter.delete("/:id/invitations/:userId", protect, groupController.removeGroupInvitation);
groupRouter.delete("/:id", protect, groupController.deleteGroupById);