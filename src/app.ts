import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { userRouter } from "./routes/userRouter";
import { taskRouter } from "./routes/taskRouter";
import { groupRouter } from "./routes/groupRouter";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/groups", groupRouter);

export default app;