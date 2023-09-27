// --------------- IMPORTS ---------------
import { Request, Response, Router } from "express";
import answerRouter from "./Answer";
import userRouter from "./User";


// --------------- ROUTER ---------------
const indexRouter = Router();

const initialRequest = async (_req: Request, res: Response) => {
    try {
        res.status(200).send("It's working.");
    } catch (error) {
        res.status(500).send("error")
    };
};


indexRouter.use("/answer", answerRouter);
indexRouter.use("/user", userRouter);
indexRouter.get("/", initialRequest);


// --------------- EXPORTS ---------------
export default indexRouter;