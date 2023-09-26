// --------------- IMPORTS ---------------
import bodyParser from "body-parser";
import morgan from "morgan";
import express, { Request, Response, Application, NextFunction } from "express";
import cors from 'cors';
// import router from "../routes/index";


// --------------- CODE ---------------
const server: Application = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
// server.use("/", router);


server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(err);
});


// --------------- EXPORTS ---------------
export default server;