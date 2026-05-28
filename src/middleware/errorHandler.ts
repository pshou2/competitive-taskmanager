import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any, 
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = "Internal server error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }

    //Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    //Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `Duplicate value for ${field}`;
    }

    if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = "Invalid token";
    }

    if (err.name === "TokenExpiredError") {
        statusCode = 401;
        message = "Token expired";
    }

    res.status(statusCode).json({message});
};