import { Task, ITask } from "../models/Task";
import { QueryOptions } from "mongoose";

export const getTasksByGrpId = async (groupId: string): Promise<ITask[] | null> => {
    const tasks = await Task.find({ groupId: groupId })
        .populate("author", "username")
        .populate("assignedTo", "username")
        .populate("completedBy", "username");
    return tasks;
};

export const getTasksByGrpIdAndStatus = async (groupId: string, status: boolean): Promise<ITask[] | null> => {
    const tasks = await Task.find({ groupId: groupId, isCompleted: status });
    return tasks;
};

export const createTask = async (data: Partial<ITask>): Promise<ITask> => {
    const task = await Task.create(data);
    return task;
}

//update
export const updateTaskById = async (id: string, data: Partial<ITask>): Promise<ITask | null> => {
    const options: QueryOptions = {
        returnDocument: "after",
        runValidators: true
    };
    
    const task = await Task.findByIdAndUpdate(id, data, options);
    
    return task;
}

export const deleteTaskById = async (id: string): Promise<ITask | null> => {
    const task = await Task.findByIdAndDelete(id);
    return task;
}