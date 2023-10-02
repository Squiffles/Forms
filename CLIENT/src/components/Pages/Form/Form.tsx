// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../redux/hooks";

import { items } from "../../../services/data.json";
// import { setSessionId } from "../../redux/rootReducer";
import { getAnswerByIdRequest, postAnswerRequest, editAnswerByIdRequest } from "../../../services/requests/answer";
import { getCountryCode } from "../../../services/requests/countryCode";
import { handleInputChange } from "./handlers";
import PhoneInput from "react-phone-number-input";

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

    const [existingAnswer, setExistingAnswer] = useState<Answer>({
        full_name: "",
        phone_number: "",
        start_date: null,
        preferred_language: "",
        how_found: "",
        newsletter_subscription: null
    });

    // The "EDIT" button in the Results.tsx component, takes the user to "/form?edit=true".
    // So, the query param and the sessionId from localStorage are required to render the "edit" variations:
    // "SEND" button instead of "EDIT" button, load previous answer, etc.
    // First thing to do is to quickly check the URL and if the "sessionId" is not falsy.
    const sessionId = localStorage.getItem('sessionId');
    const [isEditing, setIsEditing] = useState(false);
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
                        // Fill the form with the previous answer.
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
        });
        const mockAnswer = {
            full_name: "Seb",
            phone_number: "3497",
            start_date: "2020-01-01",
            preferred_language: "english",
            how_found: "advertisement",
            newsletter_subscription: null
        }
        setIsEditing(true);
        navigate('/form?edit=true');
        setExistingAnswer(mockAnswer);
    }, []);


    const NAME = items[0];
    const PHONE_NUMBER = items[1];
    const START_DATE = items[2];
    const PREFERRED_LANGUAGE = items[3];
    const HOW_FOUND = items[4];
    const NEWSLETTER_SUBSCRIPTION = items[5];


    // GLOBAL STATES:
    // const reduxSessionId = useAppSelector((state) => state.root.session_id);


    // LOCAL STATES:
    const [countryCode, setCountryCode] = useState<any>(null);

    const [answer, setAnswer] = useState<Answer>({
        full_name: "",
        phone_number: "",
        start_date: null,
        preferred_language: "",
        how_found: "",
        newsletter_subscription: null
    });

    // Truthfulness of the answer.
    const [isValid, setIsValid] = useState<boolean>();

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
    const auxHandleInputChange = (e: any, isEditing: boolean, sort: inputField) => {
        return handleInputChange(e, isEditing, sort, setAnswer, setExistingAnswer, setErrors, setRequiredFieldsErrors);
    };


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (isEditing) {
            if (sessionId) {
                const parsedSessionId = JSON.parse(sessionId);

                const success = await editAnswerByIdRequest(parsedSessionId, answer);
                if (success === true) navigate("/results");
                else window.alert("There was a problem trying to edit your answer");
            }
        } else {
            // Check if the answer is filled before making the post request.
            if (isValid) {
                // The controller generates an uuid which will be used for storing this key in redux and retrieving the right form so the user can edit it.
                const response = await postAnswerRequest(answer);
                if (response.success) {
                    navigate("/results");
                    // dispatch(setSessionId(response.data.session_id));
                    const sessionId = JSON.stringify(response.data.session_id);
                    localStorage.setItem("sessionId", sessionId);
                    console.log(sessionId);
                }
            };
        };
    };


    // LIFE CYCLES:
    useEffect(() => {
        // Fetch the country code, to make the form friendlier.
        (async () => {
            const response = await getCountryCode();
            if (response.success && response.data) {
                setCountryCode(response.data);
                console.log(response);
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
        }
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
                {
                    isEditing && <p>Yes it is</p>
                }
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
                            value={isEditing ? existingAnswer.full_name : answer.full_name}
                            onChange={(e) => auxHandleInputChange(e, isEditing, "NAME")}
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
                            value={isEditing ? existingAnswer.phone_number : answer.phone_number}
                            onChange={(newNumber) => auxHandleInputChange(newNumber, isEditing, "PHONE_NUMBER")}
                            required={PHONE_NUMBER.required}
                            defaultCountry={countryCode}
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
                            value={isEditing
                                ? (existingAnswer.start_date ? existingAnswer.start_date : "")
                                : (answer.start_date ? answer.start_date : "")
                            }
                            min="2000-01-01"
                            max="2050-12-31"
                            onChange={(e) => auxHandleInputChange(e, isEditing, "START_DATE")}
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
                            value={isEditing ? existingAnswer.preferred_language : answer.preferred_language}
                            required={PREFERRED_LANGUAGE.required}
                            onChange={(e) => auxHandleInputChange(e, isEditing, "PREFERRED_LANGUAGE")}
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
                                        onChange={(e) => auxHandleInputChange(e, isEditing, "HOW_FOUND")}
                                        value={option.value}
                                        checked={isEditing ? option.value === existingAnswer.how_found : false}
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
                        checked={isEditing
                            ? (existingAnswer.newsletter_subscription === true)
                            : (answer.newsletter_subscription === true)
                        }
                        required={NEWSLETTER_SUBSCRIPTION.required}
                        onChange={(e) => auxHandleInputChange(e, isEditing, "NEWSLETTER_SUBSCRIPTION")}
                    />
                </section>
                <button
                    className="w-full mt-[1rem] pt-[1rem] pb-[.35rem] bg-flame text-[3rem] transition-all duration-200 hover:bg-black hover:text-white"
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