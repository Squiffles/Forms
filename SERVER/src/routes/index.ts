// --------------- IMPORTS ---------------
import { Router } from "express";
import answerRouter from "./Answer";
import userRouter from "./User";


// --------------- ROUTER ---------------
const indexRouter = Router();

indexRouter.use("/answer", answerRouter);
indexRouter.use("/user", userRouter);


// --------------- EXPORTS ---------------
export default indexRouter;