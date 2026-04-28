import { Request, Response, NextFunction } from "express";
import * as taskService from "../services/taskService";

export const getTasksByQuery = async (req: Request, res: Response, next: NextFunction) => {
    let tasks;
    try {
        const groupId = typeof req.query.groupId === "string" ? req.query.groupId : undefined; 
        const status = typeof req.query.status === "string" ? req.query.status : undefined;
        
        if (groupId && status) {
            const boolStatus = status === "true" ? true : false;
            tasks = await taskService.getTasksByGrpIdAndStatus(groupId, boolStatus);
        } else if (groupId) {
            tasks = await taskService.getTasksByGrpId(groupId);
        } else {
            return res.status(400).json({ message: `Bad request with missing groupId query - groupId: ${groupId}` });
        }
        
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.createTask(req.body);
        //future - handle validation errors from creating task
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
}

export const updateTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const task = await taskService.updateTaskById(id, req.body);
        //future - handle validation errors from updating task
        if (!task) {
            return res.status(404).json({ message: `Couldn't find tasks where id=${id}` });
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}

export const deleteTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const task = await taskService.deleteTaskById(id);
        //future - handle validation errors from deleting task
        if (!task) {
            return res.status(404).json({ message: `Couldn't find tasks where id=${id}` });
        }
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
}