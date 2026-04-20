import { Router } from "express";
import * as groupController from "../controllers/groupController";

export const groupRouter = Router();

groupRouter.get("/", groupController.getAllGroups);
groupRouter.get("/:id", groupController.getGroupById);
groupRouter.get("/:id/rankings", groupController.getGroupRankings);

groupRouter.post("/", groupController.createGroup);

groupRouter.put("/:id", groupController.updateGroupById);
// groupRouter.post("/:id/members/:userId", groupController.addMember);
// groupRouter.post("/:id/invitations/:userId", groupController.addInvitation);

groupRouter.delete("/:id", groupController.deleteGroupById);
// groupRouter.delete("/:id/members/:userId", groupController.removeMember);
// groupRouter.delete("/:id/invitations/:userId", groupController.removeInvitation);