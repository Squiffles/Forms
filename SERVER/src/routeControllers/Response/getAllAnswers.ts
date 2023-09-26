// --------------- IMPORTS ---------------
import { Request, Response } from "express";
import { DB_findAllAnswers } from "../_handlers/answer";
import { handlerResponseAnswer } from "../_handlers/_handlerResponseTypes";


// --------------- CONTROLLER ---------------
const getAllAnswers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const response: handlerResponseAnswer = await DB_findAllAnswers();

        if (response.success) {
            if (response.data && response.data.length > 0) {
                // If the the response's data array is filled with "answer" dataValues then:
                return res.status(200).json(response);

            } else {
                // If the response's data array is empty, when it could attempt to search through the DB, but couldn't find any "answer" instance:
                return res.status(404).json({
                    success: response.success,
                    message: 'No "answers" were found after attempting to: getAllAnswers'
                });
            };

        } else if (response.error) {
            // ONLY PRODUCTION:
            // If the handler could not retrieve the data:
            return res.status(500).json(response);

        } else return res.status(500).json("Neither data nor error received after attempting to: getAllAnswers");

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    };
};


// --------------- EXPORTS ---------------
export default getAllAnswers;