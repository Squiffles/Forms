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
            console.log("Unexpected error trying to: getAllUsers | Client");
            return "Sorry, there was an error processing your request. Try again later!";
        };
    } catch (error) {
        console.log(error);
        return "Sorry, there was an error processing your request. Try again later!";
    };
};


const postAnswerRequest = async (answer: any): Promise<any> => {
    try {
        const { data } = await axios.post(answer);
        console.log(data)

        if (data.success) {
            return data.data;

        } else if (data.error) {
            console.log(`${data.error} | Client`);
            return "Sorry, there was an error processing your request. Try again later!";

        } else {
            console.log("Unexpected error trying to: getAllUsers | Client");
            return "Sorry, there was an error processing your request. Try again later!";
        };
    } catch (error) {
        console.log(error);
        return "Sorry, there was an error processing your request. Try again later!";
    };
}


// --------------- EXPORTS ---------------
export {
    getAllAnswersRequest,
    postAnswerRequest
};