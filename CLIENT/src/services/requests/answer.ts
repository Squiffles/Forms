// --------------- IMPORTS ---------------
import axios from "axios";


// --------------- REQUESTS ---------------
const getAllAnswersRequest = async (): Promise<any> => {
    try {
        const { data } = await axios.get("answer");

        if (data.success) {
            return data.data;

        } else if (data.error) {
            console.log(`${data.error} | Client`);
            return "Sorry, there was an error processing your request. Try again later!";

        } else {
            console.log("Unexpected error trying to: getAllAnswersRequest | Client");
            return "Sorry, there was an error processing your request. Try again later!";
        };
    } catch (error) {
        console.log(error);
        return "Sorry, there was an error processing your request. Try again later!";
    };
};


const getAnswerByIdRequest = async (sessionId: any): Promise<any> => {
    try {
        const { data } = await axios.get(`answer/${sessionId}`);

        if (data.success) {
            return data;
        } else {
            console.log("Unexpected error trying to: getAnswerByIdRequest | Client");
            return "Sorry, there was an error processing your request. Try again later!";
        };

    } catch (error) {
        console.log(error);
        return "Sorry, there was an error processing your request. Try again later!";
    };
};


const postAnswerRequest = async (answer: any): Promise<any> => {
    try {
        const { data } = await axios.post("answer/submit", answer);

        if (data.success) {
            console.log(data);
            return data;

        } else if (data.error) {
            console.log(`${data.error} | Client`);
            return "Sorry, there was an error processing your request. Try again later!";

        } else {
            console.log("Unexpected error trying to: postAnswerRequest | Client");
            return "Sorry, there was an error processing your request. Try again later!";
        };
    } catch (error) {
        console.log(error);
        return "Sorry, there was an error processing your request. Try again later!";
    };
};


// --------------- EXPORTS ---------------
export {
    getAllAnswersRequest,
    getAnswerByIdRequest,
    postAnswerRequest
};