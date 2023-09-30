// --------------- IMPORTS ---------------
import { Request, Response } from "express";
import { DB_editAnswerById } from "../_handlers/answer";


// --------------- CONTROLLER ---------------
const putAnswerById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { full_name, phone_number, start_date, preferred_language, how_found, newsletter_subscription } = req.body;
        const { sessionId } = req.params;

        const updatedAnswer = {
            full_name, 
            phone_number, 
            start_date, 
            preferred_language, 
            how_found, 
            newsletter_subscription
        }

        const response = await DB_editAnswerById(sessionId, updatedAnswer);

        if (response.success) {
            // If the the request was successful:
            return res.status(200).json(response);

            // } else if (response.error) {
            // ONLY PRODUCTION:
            // If the handler could not retrieve the data:
            // return res.status(500).json(response);

        } else return res.status(500).json("Neither data nor error received after attempting to: putAnswerById");

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    };
};


// --------------- EXPORTS ---------------
export default putAnswerById;