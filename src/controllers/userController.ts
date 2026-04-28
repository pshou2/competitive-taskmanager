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


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const user = await userService.updateUserById(id, req.body);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const user = await userService.deleteUserById(id);

        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

/**TODO: Refactor repeat code
 * addUserInvitation, addUserGroup, removeUserInvitation, and removeUserGroup
 */
export const addUserInvitation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;

        const user = await userService.addUserInvitation(id, groupId);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const addUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;

        const user = await userService.addUserGroup(id, groupId);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const removeUserInvitation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;

        const user = await userService.removeUserInvitation(id, groupId);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const removeUserGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const groupId = Array.isArray(req.params.groupId) ? req.params.groupId[0] : req.params.groupId;

        const user = await userService.removeUserGroup(id, groupId);
        if (!user) {
            return res.status(404).json({ message: `User with id ${id} not found`});
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}