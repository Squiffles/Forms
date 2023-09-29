// --------------- IMPORTS ---------------
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { DB_postAnswer } from "../_handlers/answer";


// --------------- CONTROLLER ---------------
const postAnswer = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { full_name, phone_number, start_date, preferred_language, how_found, newsletter_subscription } = req.body;

        // Generate the session_id:
        const session_id: string = uuidv4();

        const response = await DB_postAnswer({ session_id, full_name, phone_number, start_date, preferred_language, how_found, newsletter_subscription });

        if (response.success) {
            // Expecting DB_postAnswer to return a data property with the expected output, we only look for success and infer data is the new answer submitted.
            return res.status(200).json(response);

        } else if (response.error) {
            // ONLY PRODUCTION:
            // If the handler could not retrieve the data:
            return res.status(500).json(response);

        } else return res.status(500).json("Neither data nor error received after attempting to: postAnswer");

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    };
};


// --------------- EXPORTS ---------------
export default postAnswer;