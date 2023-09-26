// --------------- IMPORTS ---------------
import { Router } from "express";
import answerRouter from "./Answers";


// --------------- ROUTER ---------------
const indexRouter = Router();

indexRouter.use("/answer", answerRouter);


// --------------- EXPORTS ---------------
export default indexRouter;