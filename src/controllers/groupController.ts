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