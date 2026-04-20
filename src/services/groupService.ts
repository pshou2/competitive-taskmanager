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