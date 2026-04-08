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
        //when we create user, should we send back data?
        await userService.createUser(req.body);
        res.status(201).json( { message: "created user" } )
    } catch (error) {
        next(error);
    }
}

export const updateUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //what error should we catch? couldn't find a user? couldn't update a user?
        //we probably want to send back data when we update
        await userService.updateUserById(req.body);
        res.status(201).json({ message: 'updated user' });
    } catch (error) {
        next(error);
    }
}

export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        await userService.deleteUserById(id);
        res.status(204).json({ message: 'deleted sucessfully '})
    } catch (error) {
        next(error);
    }
}