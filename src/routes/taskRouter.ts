import { Router } from "express";
import * as taskController from "../controllers/taskController";

export const taskRouter = Router();

taskRouter.get('', taskController.getTasksByQuery);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:id', taskController.updateTaskById);
taskRouter.delete('/:id', taskController.deleteTaskById);
