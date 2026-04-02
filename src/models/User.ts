import { Schema, model} from 'mongoose';

///create interface
export interface IUser {
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    //tasks: Task[];
}

///create schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}, {
    timestamps: true
}); 

///export model
export const User = model<IUser>('users', userSchema);