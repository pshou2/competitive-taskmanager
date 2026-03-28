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
        //if userService.getAllUsers returns Promise<IUser[]>, wtf do I do with that?
        
        const users = await userService.getAllUsers();

        if (!users) {
            return res.status(404).json({ message : 'No users found' });
        }

        res.status(200).json(users);
    } catch (error) {
        //what is next function? how and when do we use that? what should prompt my brain to think 'Oh i should use a next function'
        next(Error);
    }
}