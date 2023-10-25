// --------------- IMPORTS ---------------
import { Request, Response } from "express";
import { DB_findAnswerById } from "../_handlers/answer";
// import { handlerResponseAnswer } from "../_handlers/_handlerResponseTypes";


// --------------- CONTROLLER ---------------
const getAnswerById = async (req: Request, res: Response) => {
    try {
        const { sessionId } = req.params;

        const response = await DB_findAnswerById(sessionId);

        // console.log(response);

        if (response.success) {
            // If the the request was successful:
            return res.status(200).json(response);

            // } else if (response.error) {
            //     // ONLY PRODUCTION:
            //     // If the handler could not retrieve the data:
            //     return res.status(500).json(response);

        } else return res.status(500).json("Neither data nor error received after attempting to: getAnswerById");

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    };
};


// --------------- EXPORTS ---------------
export default getAnswerById;