import { Request, Response, NextFunction } from "express";
import * as groupService from "../services/groupService";

export const getAllGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await groupService.getAllGroups();
        res.status(200).json(groups);
    } catch (error) {
        next(error);
    }
}

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const group = await groupService.getGroupById(id);
        if (!group) {
            return res.status(404).json({message: `Couldn't find group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

export const getGroupRankings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;
        const rankings = await groupService.getGroupRankings(groupId);
        if (!rankings) {
            return res.status(400).json({ message: `Bad request with missing groupId query - groupId: ${groupId}` });
        }
       
        res.status(200).json(rankings);
    } catch (error) {
        next(error);
    }
}

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const group = await groupService.createGroup(data);
        res.status(201).json(group);
    } catch (error) {
        next(error);
    }
}

export const updateGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const data = req.body;
        const group = await groupService.updateGroupById(id, data);
        if (!group) {
            return res.status(404).json({message: `Couldn't update group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

export const deleteGroupById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const group = await groupService.deleteGroupById(id);
        if (!group) {
            return res.status(404).json({message: `Couldn't delete group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

//**TODO: Refactor repeat code */
export const addGroupMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
        const role = typeof req.query.role === "string" ? req.query.role : "member";
        const group = await groupService.addGroupMember(id, userId, role);
        if (!group) {
            return res.status(404).json({message: `Couldnt add member to group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

export const addGroupInvitation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
        const group = await groupService.addGroupInvitation(id, userId);
        if (!group) {
            return res.status(404).json({message: `Couldnt add invitation to group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

export const removeGroupMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
        const group = await groupService.removeGroupMember(id, userId);
        if (!group) {
            return res.status(404).json({message: `Couldnt remove member from group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}

export const removeGroupInvitation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
        const group = await groupService.removeGroupInvitation(id, userId);
        if (!group) {
            return res.status(404).json({message: `Couldnt remove invitation from group with id: ${id}`});
        }
        res.status(200).json(group);
    } catch (error) {
        next(error);
    }
}