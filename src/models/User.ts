import { Schema, model, Types } from "mongoose";

///create interface
export interface IUser {
    googleId?: string;
    username: string;
    email: string;
    password: string;
    groups: Types.ObjectId[];
    invitations: Types.ObjectId[];
}

///create schema
const userSchema = new Schema<IUser>({
    googleId: {
        type: String
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
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }],
    invitations: [{
        type: Schema.Types.ObjectId,
        ref: "Group"
    }]
}, {
    timestamps: true
}); 

///export model
export const User = model<IUser>("User", userSchema);