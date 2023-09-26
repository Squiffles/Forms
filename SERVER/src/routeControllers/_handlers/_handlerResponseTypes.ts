// --------------- IMPORTS ---------------
import { AnswerAttributes } from "../../models/Answer";


// --------------- INTERFACES ---------------
// A success property is always needed, as it indicates the success of the handler.
interface handlerResponseBase {
    success: boolean;
    error?: string;  // An error property is not always needed, as it only should be needed when the success is set to false. Tho, this property would only be available in the PRODUCTION phase.
};

interface handlerResponseAnswer extends handlerResponseBase {
    data?: AnswerAttributes[];  // The data exist only if the success is set to true.
};

interface handlerResponseUser {
    success: boolean;
    error?: {
        type: string;
        message: string
    };
    data?: any
}

const errorTypes = {
    NO_FOUND: "noFound",
    INVALID: "invalid",
    EXISTENT: "existent"
}


// --------------- EXPORTS ---------------
export {
    handlerResponseAnswer,
    handlerResponseUser,
    errorTypes
};