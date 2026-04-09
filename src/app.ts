import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import { userRouter } from "./routes/userRouter";
import { taskRouter } from "./routes/taskRouter";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

export default app;