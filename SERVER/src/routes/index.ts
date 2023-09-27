// --------------- IMPORTS ---------------
import { Router } from "express";
import answerRouter from "./Answer";
import userRouter from "./User";


// --------------- ROUTER ---------------
const indexRouter = Router();

indexRouter.use("/answer", answerRouter);
indexRouter.use("/user", userRouter);
indexRouter.get("/", ((_req, res) => {
    return res.status(200).send("It's working.");
}));


// --------------- EXPORTS ---------------
export default indexRouter;