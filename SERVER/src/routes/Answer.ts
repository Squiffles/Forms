// --------------- IMPORTS ---------------
import { Router } from "express";
import getAllAnswers from "../routeControllers/Response/getAllAnswers";
import getAnswerById from "../routeControllers/Response/getAnswerById";
import postAnswer from "../routeControllers/Response/postAnswer";


// --------------- ROUTER ---------------
const answerRouter = Router();

answerRouter.get("/", getAllAnswers);
answerRouter.get("/:sessionId", getAnswerById);
answerRouter.post("/submit", postAnswer);


// --------------- EXPORTS ---------------
export default answerRouter;