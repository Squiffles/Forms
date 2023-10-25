// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../redux/hooks";

import { items } from "../../../services/data.json";
// import { setSessionId } from "../../redux/rootReducer";
import { getAnswerByIdRequest } from "../../../services/requests/answer";
import { getCountryCode } from "../../../services/requests/countryCode";
import { handleInputChange, handleSubmit } from "./handlers";
import PhoneInput from "react-phone-number-input";
import Header from "../../Layouts/Header";

import "react-phone-number-input/style.css";


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


    // CONST:
    const navigate = useNavigate();
    const location = useLocation();
    // const dispatch = useAppDispatch();

    // The "EDIT" button in the Results.tsx component, takes the user to "/form?edit=true".
    // So, the query param and the sessionId from localStorage are required to render the "edit" variations:
    // "SEND" button instead of "EDIT" button, load previous answer, etc.
    // First thing to do is to quickly check the URL and if the "sessionId" is not falsy.
    const sessionId = localStorage.getItem('sessionId');

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [answer, setAnswer] = useState<Answer>({
        full_name: "",
        phone_number: "",
        start_date: null,
        preferred_language: "",
        how_found: "",
        newsletter_subscription: null
    });


    useEffect(() => {
        (async () => {
            try {
                const queryParams = new URLSearchParams(location.search);

                if (queryParams.get('edit') === 'true' && sessionId) {
                    // At this point the URL should look like: "/form?edit=true".
                    const parsedSessionId = JSON.parse(sessionId);

                    // The "parsedSessionId" should be a valid UUID.
                    if (parsedSessionId && typeof parsedSessionId === "string") {
                        const regexUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
                        if (!regexUUID.test(parsedSessionId)) navigate('/form');
                    } else navigate('/form');

                    // Then, the "parsedSessionId" needs to be validated in the DB.
                    const response = await getAnswerByIdRequest(parsedSessionId);

                    if (response.success && response.data) {
                        setIsEditing(true);
                        // Fill the form with the 0previous answer.
                        setAnswer(response.data);

                    } else {
                        setIsEditing(false);
                        navigate('/form');
                    };
                };
            } catch (error) {
                // In case there's an error parsing an invalid JSON value: undefined, null...
                setIsEditing(false);
                navigate('/form');
            };
        })();
    }, []);


    const NAME = items[0];
    const PHONE_NUMBER = items[1];
    const START_DATE = items[2];
    const PREFERRED_LANGUAGE = items[3];
    const HOW_FOUND = items[4];
    const NEWSLETTER_SUBSCRIPTION = items[5];
    const REQUIRED_MESSAGE = "*This input is required";


    // GLOBAL STATES:
    // const reduxSessionId = useAppSelector((state) => state.root.session_id);


    // LOCAL STATES:
    const [countryCode, setCountryCode] = useState<any>(null);

    // Truthfulness of the answer.
    const [isValid, setIsValid] = useState<boolean>(false);

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


    // FUNCTIONS:
    type inputField = "NAME" | "PHONE_NUMBER" | "START_DATE" | "PREFERRED_LANGUAGE" | "HOW_FOUND" | "NEWSLETTER_SUBSCRIPTION";
    const auxHandleInputChange = (e: any, sort: inputField) => {
        return handleInputChange(e, sort, setAnswer, setErrors, setRequiredFieldsErrors);
    };

    const auxHandleSubmit = async (event: any) => {
        event.preventDefault();
        if (sessionId) {
            return await handleSubmit(answer, isEditing, isValid, navigate, sessionId);
        } else return await handleSubmit(answer, isEditing, isValid, navigate);
    };


    // LIFE CYCLES:
    useEffect(() => {
        // console.log("request started");
        // Fetch the country code, to make the form friendlier.
        (async () => {
            const response = await getCountryCode();
            if (response.success && response.data) {
                setCountryCode(response.data);
                // console.log(response);
            } else setCountryCode(null);
        })();

        // Try to get the sessionId from local storage or set it to an empty string if it's falsy.
        try {
            const sessionId = localStorage.getItem("sessionId");
            if (!sessionId) {
                localStorage.setItem("sessionId", "");
            }
        } catch (error) {
            localStorage.setItem("sessionId", "");
        };
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

    // useEffect(() => {
    //     console.log(errors)
    // }, [errors])


    // ELEMENT:
    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
            <Header />
            <form
                className="flex flex-col gap-[3rem] w-[50%] mt-[3rem] text-[.75rem] text-black dark:text-white lg:w-[50%] md:w-[60%] sm:w-[70%] xs:w-[80%] transition-all"
                onSubmit={auxHandleSubmit}
            >
                {/* 1) NAME */}
                <section className="flex flex-col justify-start">
                    {
                        NAME.required ? (
                            <p className="text-[.75rem] sm:text-[.75rem] xs:text-[.5rem] transition-all">{REQUIRED_MESSAGE}</p>
                        ) : null
                    }
                    <label
                        htmlFor={NAME.name}
                        className="mb-2 text-[1.5rem] md:text-[1.5rem] sm:text-[1.25rem] xs:text-[1.25rem] transition-all">{NAME.label}</label>
                    <div className="relative w-full after:block after:absolute after:bottom-0 after:w-0 after:h-1 after:bg-flame focus:after:w-full">
                        <input
                            id={NAME.name}
                            className="w-full bg-transparent text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[2rem] transition-all"
                            type={NAME.type}
                            value={answer.full_name}
                            onChange={(e) => auxHandleInputChange(e, "NAME")}
                            required={NAME.required}
                            spellCheck={false}
                            autoFocus
                        />
                        <div className={`w-full h-1 mt-1 ${errors.fullNameError || !answer.full_name ? "bg-black dark:bg-white" : "bg-flame"} transition-colors duration-300`} />
                    </div>
                    <p className="mt-4 text-palidFlame">{errors.fullNameError}</p>
                </section>
                {/* 2) PHONE NUMBER */}
                <section className="flex flex-col justify-start">
                    {
                        PHONE_NUMBER.required ? (
                            <p className="text-[.75rem] sm:text-[.75rem] xs:text-[.5rem] transition-all">{REQUIRED_MESSAGE}</p>
                        ) : null
                    }
                    <label
                        htmlFor={PHONE_NUMBER.name}
                        className="text-[1.5rem] mb-2">{PHONE_NUMBER.label}</label>
                    <div className="relative w-full">
                        <PhoneInput
                            id={PHONE_NUMBER.name}
                            className="w-full bg-transparent outline-none text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[2rem] transition-all"
                            type={PHONE_NUMBER.type}
                            value={answer.phone_number}
                            onChange={(newNumber) => auxHandleInputChange(newNumber, "PHONE_NUMBER")}
                            required={PHONE_NUMBER.required}
                            defaultCountry={countryCode}
                        />
                        <div className={`w-full h-1 mt-1 ${errors.phoneNumberError || !answer.phone_number ? "bg-black dark:bg-white" : "bg-flame"} transition-colors duration-300`} />
                    </div>
                    <p className="mt-4 text-palidFlame">{errors.phoneNumberError}</p>
                </section>
                {/* 3) START DATE */}
                <section className="flex flex-col justify-start">
                    {
                        START_DATE.required ? (
                            <p className="text-[.75rem] sm:text-[.75rem] xs:text-[.5rem] transition-all">{REQUIRED_MESSAGE}</p>
                        ) : null
                    }
                    <label
                        htmlFor={START_DATE.name}
                        className="text-[1.5rem] mb-2"
                    >
                        {START_DATE.label}
                    </label>
                    <div className="relative w-full">
                        <input
                            id={START_DATE.name}
                            className="w-full bg-transparent outline-none text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[2rem] transition-all [color-scheme:auto]"
                            type={START_DATE.type}
                            value={answer.start_date ? answer.start_date : ""}
                            min="2000-01-01"
                            max="2050-12-31"
                            onChange={(e) => auxHandleInputChange(e, "START_DATE")}
                            required={START_DATE.required}
                        />
                        <div className={`w-full h-1 mt-1 ${errors.startDateError || !answer.start_date ? "bg-black dark:bg-white" : "bg-flame"} transition-colors duration-300`} />
                    </div>
                    <p className="mt-4 text-palidFlame">{errors.startDateError}</p>
                </section>
                {/* 4) PREFERRED LANGUAGE */}
                <section className="flex flex-col justify-start">
                    {
                        PREFERRED_LANGUAGE.required ? (
                            <p className="text-[.75rem] sm:text-[.75rem] xs:text-[.5rem] transition-all">{REQUIRED_MESSAGE}</p>
                        ) : null
                    }
                    <label
                        htmlFor={PREFERRED_LANGUAGE.name}
                        className="text-[1.5rem] mb-2"
                    >
                        {PREFERRED_LANGUAGE.label}
                    </label>
                    <div className="relative w-full mt-4">
                        <select
                            id={PREFERRED_LANGUAGE.name}
                            className="w-full py-3 bg-transparent text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[2rem] transition-all"
                            value={answer.preferred_language}
                            required={PREFERRED_LANGUAGE.required}
                            onChange={(e) => auxHandleInputChange(e, "PREFERRED_LANGUAGE")}
                        >
                            <option hidden value="" disabled></option>
                            {
                                PREFERRED_LANGUAGE.options?.map((option, idx) => (
                                    <option
                                        className="bg-white dark:bg-black text-black dark:text-white font-sans"
                                        key={idx} value={option.value}
                                    >{option.label}</option>
                                ))
                            }
                        </select>
                        <div className={`w-full h-1 mt-1 ${errors.preferredLanguageError || !answer.preferred_language ? "bg-black dark:bg-white" : "bg-flame"} transition-colors duration-300`} />
                    </div>
                    <p className="mt-4 text-palidFlame">{errors.preferredLanguageError}</p>
                </section>
                {/* 5) HOW FOUND */}
                <section className="flex flex-col justify-start">
                    {
                        HOW_FOUND.required ? (
                            <p className="text-[.75rem] sm:text-[.75rem] xs:text-[.5rem] transition-all">{REQUIRED_MESSAGE}</p>
                        ) : null
                    }
                    <label
                        htmlFor={HOW_FOUND.options ? HOW_FOUND.options[0].value : ""}
                        // Potential alternative: `option_0` -> id={`option_${index}`}
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
                                        id={option.value}
                                        className="relative w-[1.5rem] md:w-[1.5rem] sm:w-[1rem] xs:w-[.75rem] transition-all bg-transparent outline-none text-[5.5rem] accent-flame"
                                        type={items[4].type}
                                        name="how_found"
                                        onChange={(e) => auxHandleInputChange(e, "HOW_FOUND")}
                                        value={option.value}
                                        checked={option.value === answer.how_found}
                                        required={items[4].required}
                                    />
                                    <label
                                        className="text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[2rem] transition-all ml-4 ['font-family: consolas']"
                                        htmlFor={option.value}
                                    >
                                        {option.label}
                                    </label>
                                </span>
                            ))
                        }
                        <p className="mt-4 text-palidFlame">{errors.howFoundError}</p>
                    </div>
                </section>
                {/* 6) NEWSLETTER SUBSCRIPTION */}
                <section className="flex flex-row-reverse justify-end">
                    {
                        NEWSLETTER_SUBSCRIPTION.required ? (
                            <p className="text-[.75rem] sm:text-[.75rem] xs:text-[.5rem] transition-all">{REQUIRED_MESSAGE}</p>
                        ) : null
                    }
                    <label
                        className="text-[1rem] ml-4"
                        htmlFor="newsletter_subscription"
                    >{NEWSLETTER_SUBSCRIPTION.label}</label>
                    <input
                        id="newsletter_subscription"
                        className="w-[1.5rem] bg-transparent outline-none checked:bg-flame form-radio accent-flame"
                        type={NEWSLETTER_SUBSCRIPTION.type}
                        checked={answer.newsletter_subscription === true}
                        required={NEWSLETTER_SUBSCRIPTION.required}
                        onChange={(e) => auxHandleInputChange(e, "NEWSLETTER_SUBSCRIPTION")}
                    />
                </section>
                <button
                    className={`w-full mt-[1rem] pt-[1rem] pb-[.35rem] text-[3rem] transition-all duration-200 ${isValid ? "bg-flame hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" : "bg-black dark:bg-white text-white dark:text-black"}`}
                    type="submit"
                    disabled={isValid ? false : true}
                >
                    {
                        isEditing ? "EDIT" : "SEND"
                    }
                </button>
            </form>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Form;