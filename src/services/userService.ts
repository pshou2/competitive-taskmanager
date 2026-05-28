import { User, IUser } from "../models/User";
import { QueryOptions } from "mongoose";

export async function getAllUsers(): Promise<IUser[]> {
    const users = await User.find({});
    return users;
} 

export async function getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user;
}

export async function getUserByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({email: email});
    return user;
}

export async function createUser(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data);
}

export async function updateUserById(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    };

    return await User.findByIdAndUpdate(id, data, options);
}

export async function deleteUserById(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
}

/**TODO: Refactor repeat code
 * updateUserInvitations, updateUserGroups, deleteUserInvitations, and deleteUserGroups
 */

export async function addUserInvitation(id: string, groupId: string): Promise<IUser | null> {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    };

    //push groupId to a user's invitations
    return await User.findByIdAndUpdate(id, {
        $push: { invitations: groupId }
    }, options);
}

export async function addUserGroup(id: string, groupId: string): Promise<IUser | null> {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    };

    return await User.findByIdAndUpdate(id, {
        $push: { groups: groupId }
    }, options);
}

export async function removeUserInvitation(id: string, groupId: string): Promise<IUser | null> {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    };

    return await User.findByIdAndUpdate(id, {
        $pull: { invitations: groupId }
    }, options);
}

export async function removeUserGroup(id: string, groupId: string): Promise<IUser | null> {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    };

    return await User.findByIdAndUpdate(id, {
        $pull: { groups: groupId }
    }, options);
}

