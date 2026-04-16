import { Router } from "express";
import * as taskController from "../controllers/taskController";

export const taskRouter = Router();

//not totally confident this / will work with my request query
//express will match /tasks and /tasks/ bc of mounting in app.ts
taskRouter.get("/", taskController.getTasksByQuery);
taskRouter.post("/", taskController.createTask);
taskRouter.put("/:id", taskController.updateTaskById);
taskRouter.delete("/:id", taskController.deleteTaskById);
