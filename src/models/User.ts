import { Schema, model, Types } from "mongoose";

///create interface
export interface IUser {
    googleId: string;
    username: string;
    email: string;
    groups: Types.ObjectId[];
}

///create schema
const userSchema = new Schema<IUser>({
    googleId: {
        type: String, 
        required: [true, "googleId is required"],
    },
    username: { 
        type: String, 
        required: [ true, "Username is required"],
        trim: true,
        minlength: [2, "Username must be at least 2 characters"] 
    },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true,
        lowercase: true 
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }]
}, {
    timestamps: true
}); 

///export model
export const User = model<IUser>("User", userSchema);