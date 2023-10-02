// --------------- IMPORTS ---------------
import validateAnswer from "../../../services/validator";


// --------------- HANDLERS ---------------
type inputField = "NAME" | "PHONE_NUMBER" | "START_DATE" | "PREFERRED_LANGUAGE" | "HOW_FOUND" | "NEWSLETTER_SUBSCRIPTION";
type isEditing = boolean;

const handleInputChange = (event: any, isEditing: isEditing, sort: inputField, setAnswer: Function, setExistingAnswer: Function, setErrors: Function, setRequiredFieldsErrors: Function) => {

    isEditing && console.log("editing form");
    !isEditing && console.log("new form");

    if (isEditing) {
        setExistingAnswer((prevExistingAnswer: any) => {
            let updatedExistingAnswer = { ...prevExistingAnswer };

            switch (sort) {
                case "NAME":
                    updatedExistingAnswer.full_name = event.target.value;
                    break;
                case "PHONE_NUMBER":
                    updatedExistingAnswer.phone_number = event;
                    break;
                case "START_DATE":
                    if (!event.target.value) updatedExistingAnswer.start_date = null;
                    else updatedExistingAnswer.start_date = event.target.value;
                    break;
                case "PREFERRED_LANGUAGE":
                    updatedExistingAnswer.preferred_language = event.target.value;
                    break;
                case "HOW_FOUND":
                    updatedExistingAnswer.how_found = event.target.value;
                    break;
                case "NEWSLETTER_SUBSCRIPTION":
                    updatedExistingAnswer.newsletter_subscription = event.target.checked ? true : null;
                    break;
                default:
                    break;
            };



            // Perform validation on the updatedAnswer:
            const { errors, requiredFieldsErrors } = validateAnswer(updatedExistingAnswer);
            setErrors(errors);
            setRequiredFieldsErrors(requiredFieldsErrors);

            return updatedExistingAnswer; // Return the updated answer
        });

    } else {
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
};


// --------------- EXPORTS ---------------
export {
    handleInputChange
};