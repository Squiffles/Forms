// --------------- IMPORTS ---------------
import validateAnswer from "../../../services/validator";
import { postAnswerRequest, editAnswerByIdRequest } from "../../../services/requests/answer";


// --------------- HANDLERS ---------------
type inputField = "NAME" | "PHONE_NUMBER" | "START_DATE" | "PREFERRED_LANGUAGE" | "HOW_FOUND" | "NEWSLETTER_SUBSCRIPTION";

const handleInputChange = (event: any, sort: inputField, setAnswer: Function, setErrors: Function, setRequiredFieldsErrors: Function) => {

    // isEditing && console.log("editing form");
    // !isEditing && console.log("new form");

    setAnswer((prevAnswer: any) => {
        let updatedAnswer = { ...prevAnswer };

        switch (sort) {
            case "NAME":
                updatedAnswer.full_name = event.target.value;
                break;
            case "PHONE_NUMBER":
                updatedAnswer.phone_number = event;
                break;
            case "START_DATE":
                if (!event.target.value) updatedAnswer.start_date = null;
                else updatedAnswer.start_date = event.target.value;
                break;
            case "PREFERRED_LANGUAGE":
                updatedAnswer.preferred_language = event.target.value;
                break;
            case "HOW_FOUND":
                updatedAnswer.how_found = event.target.value;
                break;
            case "NEWSLETTER_SUBSCRIPTION":
                updatedAnswer.newsletter_subscription = event.target.checked ? true : null;
                break;
            default:
                break;
        };

        // Perform validation on the updatedAnswer:
        const { errors, requiredFieldsErrors } = validateAnswer(updatedAnswer);
        setErrors(errors);
        setRequiredFieldsErrors(requiredFieldsErrors);

        return updatedAnswer; // Return the updated answer
    });
};


const handleSubmit = async (answer: any, isEditing: boolean, isValid: boolean, navigate: any, sessionId?: string) => {
    if (isEditing && sessionId) {
        const parsedSessionId = JSON.parse(sessionId);

        const success = await editAnswerByIdRequest(parsedSessionId, answer);
        if (success) navigate("/success");
        else window.alert("There was a problem trying to edit your answer");

    } else {
        // Check if the answer is filled before making the post request.
        if (isValid) {
            // The controller generates an uuid which will be used for storing this key in redux and retrieving the right form so the user can edit it.
            const response = await postAnswerRequest(answer);
            if (response.success) {
                navigate("/success");
                // dispatch(setSessionId(response.data.session_id));
                const sessionId = JSON.stringify(response.data.session_id);
                localStorage.setItem("sessionId", sessionId);
                // console.log(sessionId);
            };
        };
    };
    return;
};


// --------------- EXPORTS ---------------
export {
    handleInputChange,
    handleSubmit
};