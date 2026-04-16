import { describe, it, expect, beforeEach, vi } from "vitest";
import { Task } from "../models/Task";
import * as taskService from "../services/taskService";

vi.mock("../models/Task", () => ({
    Task: {
        find: vi.fn(),
        create: vi.fn(),
        findByIdAndUpdate: vi.fn(),
        findByIdAndDelete: vi.fn()
    }
}));

describe("taskService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("Test getTasksByGrpId", () => {
        it("Should return an array of tasks by group id", async () => {
            const mockTasks: any = [
                {
                    _id: "1", 
                    groupId:"1", 
                    taskName: "Test", 
                    isCompleted: false, 
                    assignedTo: null, 
                    completedBy: null, 
                    startDate: Date.now, 
                    dueDate: Date.now, 
                    completedDate: null
                },
                {
                    _id: "2", 
                    groupId:"2", 
                    taskName: "Test2", 
                    isCompleted: true, 
                    assignedTo: "123", 
                    completedBy: "123", 
                    startDate: Date.now, 
                    dueDate: Date.now, 
                    completedDate: Date.now
                }
            ]

            vi.mocked(Task.find).mockResolvedValue(mockTasks);

            const result = await taskService.getTasksByGrpId("14");
            expect(result).toEqual(mockTasks);
        })
    });
})