import { IGroup, Group } from "../models/Group";
import { QueryOptions } from "mongoose";

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