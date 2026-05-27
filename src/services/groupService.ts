import { IGroup, Group } from "../models/Group";
import { Task } from "../models/Task";
import { QueryOptions, Types } from "mongoose";

export const getAllGroups = async (): Promise<IGroup[]> => {
    const groups = await Group.find({});
    return groups;
}

export const getGroupById = async (id: string): Promise<IGroup | null> => {
    const group = await Group.findById(id);
    return group;
}

export const getGroupRankings = async (groupId: string) => {
    const rankings = await Task.aggregate([
        { $match: { groupId: new Types.ObjectId(groupId), isCompleted: true } },
        { $group: { _id: '$completedBy', tasksCompleted: { $sum: 1 } } },
        { $sort: { tasksCompleted: -1 } },
        { $project: { userId: '$_id', tasksCompleted: 1, _id: 0 } }
    ]);
    return rankings;
}

export const createGroup = async (data: Partial<IGroup>): Promise<IGroup> => {
    const group = await Group.create(data);
    return group;
}

export const updateGroupById = async (id: string, data: Partial<IGroup>): Promise<IGroup | null> => {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    }
    const group = await Group.findByIdAndUpdate(id, data, options);
    return group;
}

export const deleteGroupById = async (id: string): Promise<IGroup | null> => {
    const group = await Group.findByIdAndDelete(id);
    return group;
}

//**TODO: Refactor later */
export const addGroupMember = async (id: string, userId: string, role: string): Promise<IGroup | null> => {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    }

    //integration test: test whether points needs to be set or if mongodb sets it by default
    const group = await Group.findByIdAndUpdate(id, {
        $push: {members: {userId: userId, role: role}}
    }, options);

    return group;
}

export const addGroupInvitation = async (id: string, userId: string): Promise<IGroup | null> => {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    }

    //integration test: test whether invitedAt needs to be set or if mongodb set by default
    const group = await Group.findByIdAndUpdate(id, {
        $push: {invitations: {userId: userId}}
    }, options);

    return group;
}

export const removeGroupMember = async (id: string, userId: string): Promise<IGroup | null> => {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    }

    const group = await Group.findByIdAndUpdate(id, {
        $pull: {members: {userId: userId}}
    }, options);

    return group;
}

export const removeGroupInvitation = async (id: string, userId: string): Promise<IGroup | null> => {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    }

    const group = await Group.findByIdAndUpdate(id, {
        $pull: {invitations: {userId: userId}}
    }, options);

    return group;
}