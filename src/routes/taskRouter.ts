import { Router } from "express";
import * as taskController from "../controllers/taskController";
import { protect } from "../middleware/auth";

export const taskRouter = Router();

taskRouter.get("/", protect, taskController.getTasksByQuery);
taskRouter.post("/", protect, taskController.createTask);
taskRouter.put("/:id", protect, taskController.updateTaskById);
taskRouter.delete("/:id", protect, taskController.deleteTaskById);
