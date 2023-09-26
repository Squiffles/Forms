// --------------- IMPORTS ---------------
import { Router } from "express";
import getAllAnswers from "../routeControllers/Response/getAllAnswers";
import postAnswer from "../routeControllers/Response/postAnswer";


// --------------- ROUTER ---------------
const answerRouter = Router();

answerRouter.get("/", getAllAnswers);
answerRouter.post("/submitted", postAnswer);


// --------------- EXPORTS ---------------
export default answerRouter;