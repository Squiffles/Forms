// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { items } from "../../services/data.json";
import { postAnswerRequest } from "../../services/requests/answer";


// --------------- COMPONENT ---------------
function Form() {


    const NAME = items[0];
    const PHONE_NUMBER = items[1];
    const START_DATE = items[2];
    const PREFERRED_LANGUAGE = items[3];
    const HOW_FOUND = items[4];
    const NEWSLETTER_SUBSCRIPTION = items[5];

    type Answer = {
        name: string;
        phoneNumber: string;
        startDate?: string | null;
        preferredLanguage: string;
        howFound: string;
        newsletter_subscription?: boolean | null
    };

    // LOCAL STATES:
    const [answer, setAnswer] = useState<Answer>({
        name: "",
        phoneNumber: "",
        startDate: null,
        preferredLanguage: "",
        howFound: "",
        newsletter_subscription: null
    });


    // FUNCTIONS:
    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Check if the answer is filled before making the post request.
        // if (answer)
        // postAnswerRequest(answer);
    };


    type inputSort = "NAME" | "PHONE_NUMBER" | "START_DATE" | "PREFERRED_LANGUAGE" | "HOW_FOUND" | "NEWSLETTER_SUBSCRIPTION";
    const handleInputChange = (event: any, sort: inputSort) => {
        let VALUE = event.target.value;

        sort === "NAME" && setAnswer({ ...answer, name: VALUE });
        sort === "PHONE_NUMBER" && setAnswer({ ...answer, phoneNumber: VALUE });
        sort === "START_DATE" && setAnswer({ ...answer, startDate: VALUE });
        sort === "PREFERRED_LANGUAGE" && setAnswer({ ...answer, preferredLanguage: VALUE });
        sort === "HOW_FOUND" && setAnswer({ ...answer, howFound: VALUE });
        sort === "NEWSLETTER_SUBSCRIPTION" && (
            VALUE = event.target.checked ? true : null,
            setAnswer({ ...answer, newsletter_subscription: VALUE })
        );

        return;
    };

    useEffect(() => {
        console.log(answer);
    }, [answer])


    // ELEMENT:
    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-white text-black">
            <header className="flex justify-between items-center w-full text-[4rem] leading-[1]">
                <span>INPUT</span><span>IT</span>
            </header>
            <form
                className="flex flex-col gap-[5rem] w-[70%] mt-[5%] border-black rounded-[0.5rem]"
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
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
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
                        <input
                            className="w-full bg-transparent outline-none text-[5.5rem] leading-[1]"
                            type={PHONE_NUMBER.type}
                            onChange={(e) => handleInputChange(e, "PHONE_NUMBER")}
                            required={PHONE_NUMBER.required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
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
                            onChange={(e) => handleInputChange(e, "START_DATE")}
                            required={START_DATE.required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                </section>
                {/* 4) PREERRED LANGUAGE */}
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
                                        className="text-[6rem]"
                                        htmlFor={`option_${index}`}
                                    >
                                        {option.label}
                                    </label>
                                </span>
                            ))
                        }
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
                >
                    SEND
                </button>
            </form>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Form;