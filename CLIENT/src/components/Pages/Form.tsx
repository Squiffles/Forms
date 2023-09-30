// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { items } from "../../services/data.json";
import { postAnswerRequest } from "../../services/requests/answer";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import validateAnswer from "../../services/validator";
// import { setSessionId } from "../../redux/rootReducer";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";


export type Answer = {
    full_name: string;
    phone_number: string;
    start_date?: string | null;
    preferred_language: string;
    how_found: string;
    newsletter_subscription?: boolean | null
};


// --------------- COMPONENT ---------------
function Form() {


    const NAME = items[0];
    const PHONE_NUMBER = items[1];
    const START_DATE = items[2];
    const PREFERRED_LANGUAGE = items[3];
    const HOW_FOUND = items[4];
    const NEWSLETTER_SUBSCRIPTION = items[5];


    // GLOBAL STATES:
    // const reduxSessionId = useAppSelector((state) => state.root.session_id);


    // LOCAL STATES:
    const [answer, setAnswer] = useState<Answer>({
        full_name: "",
        phone_number: "",
        start_date: null,
        preferred_language: "",
        how_found: "",
        newsletter_subscription: null
    });

    const [isValid, setIsValid] = useState(false);

    const [errors, setErrors] = useState({
        fullNameError: "",
        phoneNumberError: "",
        startDateError: "",
        preferredLanguageError: "",
        howFoundError: "",
        newsletterSubscriptionError: ""
    });

    const [requiredFieldsErrors, setRequiredFieldsErrors] = useState({
        fullNameError: "",
        phoneNumberError: "",
        preferredLanguageError: "",
        howFoundError: ""
    });


    // CONST:
    // const dispatch = useAppDispatch();


    // FUNCTIONS:
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Check if the answer is filled before making the post request.
        if (isValid) {
            // The controller generates an uuid which will be used for storing this key in redux and retrieving the right form so the user can edit it.
            const response = await postAnswerRequest(answer);
            if (response.success) {
                // dispatch(setSessionId(response.data.session_id));
                const sessionId = JSON.stringify(response.data.session_id);
                localStorage.setItem("sessionId", sessionId);
                console.log(sessionId);
            }
        };
    };


    type inputSort = "NAME" | "PHONE_NUMBER" | "START_DATE" | "PREFERRED_LANGUAGE" | "HOW_FOUND" | "NEWSLETTER_SUBSCRIPTION";
    const handleInputChange = (event: any, sort: inputSort) => {

        setAnswer((prevAnswer) => {
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


    // LIFE CYCLES:
    useEffect(() => {
        localStorage.setItem("sessionId", "");
    }, []);

    useEffect(() => {
        const requiredFieldsErrorsAreEmpty = Object.values(requiredFieldsErrors).every(value => value === "")
        const errorsAreEmpty = Object.values(errors).every(value => value === "");
        // Filter fields that have an empty string:
        const requiredFieldsAreEmpty = Object.keys(answer)
            .filter((key) => answer[key as keyof Answer] === "")
        // If the returned array is empty, that means that the required fields are filled.

        if (requiredFieldsErrorsAreEmpty && errorsAreEmpty && !requiredFieldsAreEmpty.length) {
            setIsValid(true);
        } else setIsValid(false);
    }, [errors, requiredFieldsErrors]);

    useEffect(() => {
        console.log(answer)
    }, [answer])

    useEffect(() => {
        console.log(errors)
    }, [errors])

    // useEffect(() => {
    //     console.log(isValid)
    // }, [isValid])

    // useEffect(() => {
    //     console.log({ reduxSessionId });
    // }, [dispatch]);


    // ELEMENT:
    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-white text-black">
            <header className="flex justify-between items-center w-full text-[4rem] leading-[1]">
                <span>INPUT</span><span>IT</span>
            </header>
            <form
                className="flex flex-col gap-[5rem] w-[70%] mt-[5%]"
                onSubmit={handleSubmit}
            >
                {/* 1) NAME */}
                <section className="flex flex-col justify-start">
                    {
                        NAME.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        htmlFor={NAME.name}
                        className="text-[1.5rem]">{NAME.label}</label>
                    <div className="relative w-full mt-4">
                        <input
                            id={NAME.name}
                            className="w-full bg-transparent outline-none text-[5.5rem] leading-[1]"
                            type={NAME.type}
                            value={answer.full_name}
                            onChange={(e) => handleInputChange(e, "NAME")}
                            required={NAME.required}
                            spellCheck={false}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                    <p>{errors.fullNameError}</p>
                </section>
                {/* 2) PHONE NUMBER */}
                <section className="flex flex-col justify-start">
                    {
                        PHONE_NUMBER.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        htmlFor={PHONE_NUMBER.name}
                        className="text-[1.5rem]">{PHONE_NUMBER.label}</label>
                    <div className="relative w-full mt-4">
                        <PhoneInput
                            id={PHONE_NUMBER.name}
                            className="w-full bg-transparent outline-none text-[3rem] leading-[1]"
                            type={PHONE_NUMBER.type}
                            value={answer.phone_number}
                            onChange={(newNumber) => handleInputChange(newNumber, "PHONE_NUMBER")}
                            required={PHONE_NUMBER.required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                    <p>{errors.phoneNumberError}</p>
                </section>
                {/* 3) START DATE */}
                <section className="flex flex-col justify-start">
                    {
                        START_DATE.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        htmlFor={START_DATE.name}
                        className="text-[1.5rem]"
                    >
                        {START_DATE.label}
                    </label>
                    <div className="relative w-full mt-4">
                        <input
                            id={START_DATE.name}
                            className="w-full bg-transparent outline-none text-[5.5rem] leading-[1]"
                            type={START_DATE.type}
                            min="2000-01-01"
                            max="2050-12-31"
                            onChange={(e) => handleInputChange(e, "START_DATE")}
                            required={START_DATE.required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                    <p>{errors.startDateError}</p>
                </section>
                {/* 4) PREFERRED LANGUAGE */}
                <section className="flex flex-col justify-start">
                    {
                        PREFERRED_LANGUAGE.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        htmlFor={PREFERRED_LANGUAGE.name}
                        className="text-[1.5rem]"
                    >
                        {PREFERRED_LANGUAGE.label}
                    </label>
                    <div className="relative w-full mt-4">
                        <select
                            id={PREFERRED_LANGUAGE.name}
                            className="w-full bg-transparent outline-none text-[5.5rem] leading-[1]"
                            value={answer.preferred_language}
                            required={PREFERRED_LANGUAGE.required}
                            onChange={(e) => handleInputChange(e, "PREFERRED_LANGUAGE")}
                        >
                            <option value="" disabled></option>
                            {
                                PREFERRED_LANGUAGE.options?.map((option, idx) => (
                                    <option key={idx} value={option.value} >{option.label}</option>
                                ))
                            }
                        </select>
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                    <p>{errors.preferredLanguageError}</p>
                </section>
                {/* 5) HOW FOUND */}
                <section className="flex flex-col justify-start">
                    {
                        HOW_FOUND.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        htmlFor="option_0"
                        className="text-[1.5rem]">{HOW_FOUND.label}</label>
                    <div className="relative w-full mt-4">
                        {
                            HOW_FOUND.options?.map((option, index) => (
                                <span
                                    key={index}
                                    className="flex"
                                >
                                    <input
                                        key={index}
                                        id={`option_${index}`}
                                        className="w-[30px] bg-transparent outline-none text-[5.5rem] leading-[1]"
                                        type={items[4].type}
                                        name="how_found"
                                        onChange={(e) => handleInputChange(e, "HOW_FOUND")}
                                        value={option.value}
                                        required={items[4].required}
                                    />
                                    <label
                                        className="text-[6rem] ml-4"
                                        htmlFor={`option_${index}`}
                                    >
                                        {option.label}
                                    </label>
                                </span>
                            ))
                        }
                        <p>{errors.howFoundError}</p>
                    </div>
                </section>
                {/* 6) NEWSLETTER SUBSCRIPTION */}
                <section className="flex flex-row-reverse justify-end">
                    {
                        NEWSLETTER_SUBSCRIPTION.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        className="text-[1rem]"
                        htmlFor="newsletter_subscription"
                    >{NEWSLETTER_SUBSCRIPTION.label}</label>
                    <input
                        id="newsletter_subscription"
                        className="w-[50px] bg-transparent outline-none text-[6rem] leading-[1] checked:bg-flame form-radio"
                        type={NEWSLETTER_SUBSCRIPTION.type}
                        checked={answer.newsletter_subscription === true}
                        required={NEWSLETTER_SUBSCRIPTION.required}
                        onChange={(e) => handleInputChange(e, "NEWSLETTER_SUBSCRIPTION")}
                    />
                </section>
                <button
                    className="w-full mt-[1rem] pt-[1rem] pb-[.35rem] bg-flame text-[3rem] transition-all duration-200 hover:bg-black hover:text-white"
                    type="submit"
                    disabled={isValid ? false : true}
                >
                    SEND
                </button>
            </form>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Form;