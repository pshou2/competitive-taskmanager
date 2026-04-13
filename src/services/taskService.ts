import { Task, ITask } from "../models/Task";
import { QueryOptions } from "mongoose";

export const getTasksByGrpId = async (groupId: string): Promise<ITask[] | null> => {
    try {
        const tasks = await Task.find({ groupId: groupId });
        return tasks;
    } catch (error) {
        throw new Error(`Failed to query database for tasks by groupId ${groupId}`, { cause: error });
    }
};

export const getTasksByGrpIdAndStatus = async (groupId: string, status: boolean): Promise<ITask[] | null> => {
    try {
        const tasks = await Task.find({ groupId: groupId, isCompleted: status });
        return tasks;
    } catch (error) {
        throw new Error(
            `Failed to query database for tasks by groupId ${groupId} where completion status is ${status}`, 
            { cause: error }
        );
    }
};

//create
export const createTask = async (data: Partial<ITask>): Promise<ITask> => {
    try {
        const task = await Task.create(data);
        return task;
    } catch (error) {
        throw new Error("Failed to create task in database", {cause: error});
    }
}

//update
export const updateTaskById = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    try {
        const options: QueryOptions = {
            returnDocument: "after",
            runValidators: true
        };
        
        const task = await Task.findByIdAndUpdate(id, data, options);
        
        return task;
    } catch (error) {
        throw new Error(`Failed to update task by id ${id}`, { cause: error });
    }
}

//delete
export const deleteTaskById = async (id: string): Promise<ITask | null> => {
    try {
        const task = await Task.findByIdAndDelete(id);
        return task;
    } catch (error) {
        throw new Error(`Failed to delete task by id ${id}`, { cause: error });
    }
}