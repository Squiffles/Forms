// --------------- IMPORTS ---------------
import { Request, Response } from "express";
import { _postUserLogin } from "../_handlers/user";
import { handlerResponseUser, errorTypes } from "../_handlers/_handlerResponseTypes";


// --------------- CONTROLLER ---------------
const postUserLogin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        const response: handlerResponseUser = await _postUserLogin({ email, password });

        if (response.success) {
            // If success is true, the only option is that the login was successfully done and the JWT is returned.
            return res.status(200).json(response);

        } else if (!response.success && response.error?.type === errorTypes.NO_FOUND) {
            return res.status(404).json(response);

        } else if (!response.success && response.error?.type === errorTypes.INVALID) {
            return res.status(401).json(response);

        } else return res.status(500).json("Neither data nor error received after attempting to: postUserLogin");

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    };
};


// --------------- EXPORTS ---------------
export default postUserLogin;