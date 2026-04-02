import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const user = await userService.getUserById(id);
        
        if  (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }

        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}