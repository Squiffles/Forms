// --------------- IMPORTS ---------------
import { Router } from "express";
import getAllAnswers from "../routeControllers/Response/getAllAnswers";


// --------------- ROUTER ---------------
const answerRouter = Router();

answerRouter.get("/", getAllAnswers);


// --------------- EXPORTS ---------------
export default answerRouter;