// --------------- IMPORTS ---------------
import { Request, Response } from "express";
import { DB_postUser } from "../_handlers/user";
import { handlerResponseUser, errorTypes } from "../_handlers/_handlerResponseTypes";


// --------------- CONTROLLER ---------------
const postUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        const response: handlerResponseUser = await DB_postUser({ email, password });

        if (response.success) {
            // Expecting DB_postUser to return a data property with the expected output, we only look for success and infer data is the new user created.
            return res.status(200).json(response);

        } else if (!response.success && response.error?.type === errorTypes.EXISTENT) {
            // Only if the email is already in use.
            return res.status(409).json(response);

        } else if (response.error) {
            // ONLY PRODUCTION:
            // If the handler could not create the user.
            return res.status(500).json(response);

        } else return res.status(500).json("Neither data nor error received after attempting to: postUser");

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    };
};


// --------------- EXPORTS ---------------
export default postUser;