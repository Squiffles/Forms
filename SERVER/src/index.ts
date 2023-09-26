// --------------- IMPORTS ---------------
import path from 'path';
import { config } from "dotenv";
// import "dotenv/config";  // could help later.
import db from "./config/db";
import server from "./config/server";


// --------------- DB CONNECTION ---------------
config({ path: path.resolve(__dirname, './.env') });
const { LOCAL_SERVER_PORT } = process.env;

db.sync({ force: false })
    .then(() => {
        server.listen(LOCAL_SERVER_PORT, () => {
            console.log(`Server listening to port: ${LOCAL_SERVER_PORT}`);
        });
    })
    .catch((error: any) => {
        console.log(`Error synchronizing the database: ${error}`);
    });