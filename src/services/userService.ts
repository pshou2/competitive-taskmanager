import { User, IUser } from '../models/User';

//how do i test out just this file? What should I return? I want to return a list of users, of that interface type probably

export async function getAllUsers(): Promise<IUser[]> {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        //what is error when we catch error?
        throw new Error("Failed to query database for getAllUsers()", { cause: error });
    }

} 

export async function getUserById(id: string): Promise<IUser | null> {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error){
        throw new Error (`Failed to query database for getUserById() : ${id}`, { cause: error });
    }
}

//input? req.body
//return? return success?
export async function createUser(data: Partial<IUser>) {
    try {
        return await User.create(data);
    } catch (error) {
        throw new Error (`Failed to create a user in the database`, { cause: error });
    }
}

export async function updateUserById(data: Partial<IUser>) {
    try {
        return await User.findByIdAndUpdate(data);
    } catch (error) {
        throw new Error ('Failed to update user in the database', { cause: error });
    }
}

export async function deleteUserById(id: string) {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error (`Failed to delete user by id ${id} in the database`, { cause: error });
    }
}


