// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { items } from "../../services/data.json";
import { postAnswerRequest } from "../../services/requests/answer";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import validateAnswer from "../../services/validator";


export type Answer = {
    name: string;
    phoneNumber: string;
    startDate?: string | null;
    preferredLanguage: string;
    howFound: string;
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

    // LOCAL STATES:
    const [answer, setAnswer] = useState<Answer>({
        name: "",
        phoneNumber: "",
        startDate: null,
        preferredLanguage: "",
        howFound: "",
        newsletter_subscription: null
    });

    const [isValid, setIsValid] = useState(false);

    const [errors, setErrors] = useState({
        nameError: "",
        phoneNumberError: "",
        startDateError: "",
        preferredLanguageError: "",
        howFoundError: "",
        newsletter_subscription: ""
    });

    const [requiredFieldsErrors, setRequiredFieldsErrors] = useState({
        nameError: "",
        phoneNumberError: "",
        preferredLanguageError: "",
        howFoundError: ""
    });


    // FUNCTIONS:
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Check if the answer is filled before making the post request.
        if (isValid) postAnswerRequest(answer);
    };


    type inputSort = "NAME" | "PHONE_NUMBER" | "START_DATE" | "PREFERRED_LANGUAGE" | "HOW_FOUND" | "NEWSLETTER_SUBSCRIPTION";
    const handleInputChange = (event: any, sort: inputSort) => {
        // let VALUE = event.target.value;

        sort === "NAME" && setAnswer({ ...answer, name: event.target.value });
        // In the phone number case, with the PhoneInput tag, the newNumber is passed directly as parameter, so I just set event as phoneNumber.
        sort === "PHONE_NUMBER" && setAnswer({ ...answer, phoneNumber: event });
        sort === "START_DATE" && setAnswer({ ...answer, startDate: event.target.value });
        sort === "PREFERRED_LANGUAGE" && setAnswer({ ...answer, preferredLanguage: event.target.value });
        sort === "HOW_FOUND" && setAnswer({ ...answer, howFound: event.target.value });
        sort === "NEWSLETTER_SUBSCRIPTION" && (setAnswer({ ...answer, newsletter_subscription: event.target.checked ? true : null }));

        return;
    };

    useEffect(() => {
        const { errors, requiredFieldsErrors } = validateAnswer(answer);
        setErrors(errors);
        setRequiredFieldsErrors(requiredFieldsErrors);
    }, [answer]);

    useEffect(() => {
        const requiredFieldsErrorsAreEmpty = Object.values(requiredFieldsErrors).every(value => value === "")
        const errorsAreEmpty = Object.values(errors).every(value => value === "");
        if (errorsAreEmpty && requiredFieldsErrorsAreEmpty) {
            setIsValid(true);
        } else setIsValid (false);
    }, [errors, requiredFieldsErrors]);

    useEffect(() => {
        console.log(isValid)
    }, [isValid])

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
                    <label className="text-[1.5rem]">{NAME.label}</label>
                    <div className="relative w-full mt-4">
                        <input
                            className="w-full bg-transparent outline-none text-[5.5rem] leading-[1]"
                            type={NAME.type}
                            onChange={(e) => handleInputChange(e, "NAME")}
                            required={NAME.required}
                            spellCheck={false}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                    <p>{errors.nameError}</p>
                </section>
                {/* 2) PHONE NUMBER */}
                <section className="flex flex-col justify-start">
                    {
                        PHONE_NUMBER.required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label className="text-[1.5rem]">{PHONE_NUMBER.label}</label>
                    <div className="relative w-full mt-4">
                        <PhoneInput
                            className="w-full bg-transparent outline-none text-[3rem] leading-[1]"
                            type={PHONE_NUMBER.type}
                            value={answer.phoneNumber}
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
                        className="text-[1.5rem]"
                        htmlFor="start_date"
                    >
                        {START_DATE.label}
                    </label>
                    <div className="relative w-full mt-4">
                        <input
                            id="start_date"
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
                        className="text-[1.5rem]"
                        htmlFor="preferred_language"
                    >
                        {PREFERRED_LANGUAGE.label}
                    </label>
                    <div className="relative w-full mt-4">
                        <select
                            id="preferred_language"
                            className="w-full bg-transparent outline-none text-[5.5rem] leading-[1]"
                            required={PREFERRED_LANGUAGE.required}
                            onChange={(e) => handleInputChange(e, "PREFERRED_LANGUAGE")}
                        >
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
                    <label className="text-[1.5rem]">{HOW_FOUND.label}</label>
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