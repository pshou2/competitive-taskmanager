import { IGroup, Group } from "../models/Group";
import { Task } from "../models/Task";
import { QueryOptions, Types } from "mongoose";

export const getAllGroups = async (): Promise<IGroup[]> => {
    try {
        const groups = await Group.find({});
        return groups;
    } catch (error) {
        throw new Error("Couldn't query database for all groups", { cause: error });
    }
}

export const getGroupById = async (id: string): Promise<IGroup | null> => {
    try {
        const group = await Group.findById(id);
        return group;
    } catch (error) {
        throw new Error(`Couldn"t query database for group with id: ${id}`, { cause: error });
    }
}

export const getGroupRankings = async (groupId: string) => {
    try {
        const rankings = await Task.aggregate([
            { $match: { groupId: new Types.ObjectId(groupId), isCompleted: true } },
            { $group: { _id: '$completedBy', tasksCompleted: { $sum: 1 } } },
            { $sort: { tasksCompleted: -1 } },
            { $project: { userId: '$_id', tasksCompleted: 1, _id: 0 } }
        ]);
        return rankings;
    } catch (error) {
        throw new Error(`Failed to aggregate tasks by groupId: ${groupId}`, {cause: error});
    }
}

export const createGroup = async (data: Partial<IGroup>): Promise<IGroup> => {
    try {
        const group = await Group.create(data);
        return group;
    } catch (error) {
        throw new Error("Couldn't create group in the database", { cause: error });
    }
}

export const updateGroupById = async (id: string, data: Partial<IGroup>): Promise<IGroup | null> => {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        }
        const group = await Group.findByIdAndUpdate(id, data, options);
        return group;
    } catch (error) {
        throw new Error(`Couldn't update group in the database with id: ${id}`, { cause: error });
    }
}

export const deleteGroupById = async (id: string): Promise<IGroup | null> => {
    try {
        const group = await Group.findByIdAndDelete(id);
        return group;
    } catch (error) {
        throw new Error(`Couldn't delete group in the database with id: ${id}`, { cause: error });
    }

}

//**TODO: Refactor later */
export const addGroupMember = async (id: string, userId: string, role: string): Promise<IGroup | null> => {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        }

        //integration test: test whether points needs to be set or if mongodb sets it by default
        const group = await Group.findByIdAndUpdate(id, {
            $push: {members: {userId: userId, role: role}}
        }, options);

        return group;
    } catch (error) {
        throw new Error(`Couldn't add member to group with id ${id}`, { cause: error });
    }
}

export const addGroupInvitation = async (id: string, userId: string): Promise<IGroup | null> => {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        }

        //integration test: test whether invitedAt needs to be set or if mongodb set by default
        const group = await Group.findByIdAndUpdate(id, {
            $push: {invitations: {userId: userId}}
        }, options);

        return group;
    } catch (error) {
        throw new Error(`Couldn't add invitation to group with id ${id}`, { cause: error });
    }
}

export const removeGroupMember = async (id: string, userId: string): Promise<IGroup | null> => {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        }

        const group = await Group.findByIdAndUpdate(id, {
            $pull: {members: {userId: userId}}
        }, options);

        return group;
    } catch (error) {
        throw new Error(`Couldn't remove member from group with groupId: ${id}`, { cause: error });
    }
}

export const removeGroupInvitation = async (id: string, userId: string): Promise<IGroup | null> => {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        }

        const group = await Group.findByIdAndUpdate(id, {
            $pull: {invitations: {userId: userId}}
        }, options);

        return group;
    } catch (error) {
        throw new Error(`Couldn't remove invitation from group with groupId: ${id}`, { cause: error });
    }
}