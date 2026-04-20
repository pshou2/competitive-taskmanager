import { User, IUser } from "../models/User";
import { QueryOptions } from "mongoose";

export async function getAllUsers(): Promise<IUser[]> {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
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

export async function createUser(data: Partial<IUser>): Promise<IUser> {
    try {
        return await User.create(data);
    } catch (error) {
        throw new Error (`Failed to create a user in the database`, { cause: error });
    }
}

export async function updateUserById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        };

        return await User.findByIdAndUpdate(id, data, options);
    } catch (error) {
        throw new Error ("Failed to update user in the database", { cause: error });
    }
}

export async function updateUserInvitations(id: string, groupId: string): Promise<IUser | null> {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        };

        //push groupId to a user's invitations
        return await User.findByIdAndUpdate(id, {
            $push: { invitations: groupId }
        }, options);

    } catch (error) {
        throw new Error ("Failed to update user in the database", { cause: error });
    }
}

export async function updateUserGroups(id: string, groupId: string): Promise<IUser | null> {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        };

        return await User.findByIdAndUpdate(id, {
            $push: { groups: groupId }
        }, options);

    } catch (error) {
        throw new Error ("Failed to update user in the database", { cause: error });
    }
}

export async function deleteUserById(id: string): Promise<IUser | null> {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new Error (`Failed to delete user by id ${id} in the database`, { cause: error });
    }
}

export async function deleteUserInvitations(id: string, groupId: string): Promise<IUser | null> {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        };

        return await User.findByIdAndUpdate(id, {
            $pull: { invitations: groupId }
        }, options);

    } catch (error) {
        throw new Error ("Failed to update user in the database", { cause: error });
    }
}

export async function deleteUserGroups(id: string, groupId: string): Promise<IUser | null> {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        };

        return await User.findByIdAndUpdate(id, {
            $pull: { groups: groupId }
        }, options);

    } catch (error) {
        throw new Error ("Failed to update user in the database", { cause: error });
    }
}

