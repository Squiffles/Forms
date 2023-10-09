// --------------- IMPORTS ---------------
import axios from "axios";


// --------------- REQUESTS ---------------
const getAllAnswersRequest = async (): Promise<any> => {
    try {
        console.log("making axios request ...")

        const { data } = await axios.get("answer");

        if (data.success) {
            console.log("sent to redux.")
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
            return {
                success: false,
                message: "Sorry, there was an error processing your request.Try again later!"
            };
        };

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Sorry, there was an error processing your request. Try again later!"
        };
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


const editAnswerByIdRequest = async (sessionId: any, updatedAnswer: any): Promise<any> => {
    try {
        const { data } = await axios.put(`answer/edit/${sessionId}`, updatedAnswer);

        if (data.success) {
            return true
        } else {
            console.log("Unexpected error trying to: editAnswerByIdRequest | Client");
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
    postAnswerRequest,
    editAnswerByIdRequest
};