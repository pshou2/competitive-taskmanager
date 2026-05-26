import { NextFunction, Request, Response, Router } from "express";
import { generateToken } from "../utils/jwt";
import * as userService from "../services/userService";
import bcrypt from 'bcrypt';

export const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user = await userService.getUserByEmail(req.body.email);
        if (user) {
            return res.status(409).json({message: `User already exists with email:${req.body.email}`});
        }
        user = await userService.createUser(req.body);
        const token = generateToken(user._id.toString());
        res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
});

authRouter.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email;
        const plainPassword = req.body.password;
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({message:"Invalid credentials"});
        }
        
        const isMatch = await bcrypt.compare(plainPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Password doesn't match password saved for the user"});
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
});

