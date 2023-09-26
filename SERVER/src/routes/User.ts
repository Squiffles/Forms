// --------------- IMPORTS ---------------
import { Router } from "express";
import postUser from "../routeControllers/User/postUser";
import postUserLogin from "../routeControllers/User/postUserLogin";


// --------------- ROUTER ---------------
const userRouter = Router();

userRouter.get("/");
userRouter.post("/create", postUser);
userRouter.post("/login", postUserLogin);


// --------------- EXPORTS ---------------
export default userRouter;