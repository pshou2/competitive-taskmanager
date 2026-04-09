import { Router } from "express";
import * as taskController from "../controllers/taskController";

export const taskRouter = Router();

// taskRouter.get(`?groupdId=${}`, taskController.getTasksByGrpId);
// taskRouter.get(`?groupId=${}&status=${}`, taskController.getTasksByGrpIdAndStatus);
taskRouter.get('/', taskController.getTasksByGrpId);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:id', taskController.updateTaskById);
taskRouter.delete('/:id', taskController.deleteTaskById);
