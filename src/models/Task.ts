import { Schema, model, Types } from "mongoose";

export interface ITask {
    groupId: Types.ObjectId;
    taskName: string;
    isCompleted: boolean;
    author: Types.ObjectId;
    assignedTo?: Types.ObjectId;
    completedBy?: Types.ObjectId;
    startDate: Date;
    dueDate: Date;
    completedDate?: Date;
}

const taskSchema = new Schema<ITask>({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    taskName: {
        type: String,
        required: [true, "Must have a task name"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Must set an author"]
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    completedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date,
        required: [true, "Must set a due date"]
    },
    completedDate: {
        type: Date,
        default: null
    }
},{
    timestamps: true
});

export const Task = model<ITask>("Task", taskSchema);