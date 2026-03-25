import { Schema, model} from 'mongoose';

///create interface
interface IUser {
    name: string;
    email: string;
    //tasks: Task[];
}

///create schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true}
}); 

///export model
export const User = model<IUser>('User', userSchema);