// --------------- IMPORTS ---------------
import { Router } from "express";
import postUserSignUp from "../routeControllers/User/postUserSignUp";
import postUserLogin from "../routeControllers/User/postUserLogin";


// --------------- ROUTER ---------------
const userRouter = Router();

userRouter.get("/");
userRouter.post("/signup", postUserSignUp);
userRouter.post("/login", postUserLogin);


// --------------- EXPORTS ---------------
export default userRouter;