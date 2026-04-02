import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    //call service
    //handle req object, not in this case because we are fetching all users
    //handle responses
        //200? send back users
        //404?
        //500?
    try {
        //if userService.getAllUsers returns Promise<IUser[]>, what do I do with that?

        const users = await userService.getAllUsers();

        if (!users) {
            return res.status(404).json({ message : 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        //what is next function? how and when do we use that? what should prompt my brain to think 'Oh i should use a next function'
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