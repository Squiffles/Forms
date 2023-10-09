// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllAnswers } from "../../redux/rootReducer";
import { getAnswerByIdRequest } from "../../services/requests/answer";
import { items } from "../../services/data.json";
import { useNavigate, Link } from "react-router-dom";


const NAME = items[0];
const PHONE_NUMBER = items[1];
const START_DATE = items[2];
const PREFERRED_LANGUAGE = items[3];
const HOW_FOUND = items[4];
const NEWSLETTER_SUBSCRIPTION = items[5];


// --------------- COMPONENT ---------------
function Results() {


    // GLOBAL STATES:
    const reduxAnswers = useAppSelector((state) => state.root.answers.data);


    // LOCAL STATES:
    const [currentAnswer, setCurrentAnswer] = useState<any>({});


    // CONST:
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    // FUNCTIONS:
    // Map only the ones that are actually values and not labels: "preferred_language" and "how_found".
    const mapOptionValuesToLabels = (fieldName: string, value: any) => {
        const field = items.find((item) => item.name === fieldName);
        if (field && field.options) {
            const option = field.options.find((opt) => opt.value === value);
            // Return the label if found or the value if not found.
            return option ? option.label : value;
        }
        // Fallback:
        return value;
    };

    const handleEditButton = () => {
        navigate("/form?edit=true");
    };

    const sessionId = (localStorage.getItem("sessionId"));


    // LIFE CYCLES:
    useEffect(() => {
        try {
            if (sessionId) {
                const parsedSessionId = JSON.parse(sessionId);
                console.log(sessionId);
                (async () => {
                    const currentAnswer = await getAnswerByIdRequest(parsedSessionId);
                    if (currentAnswer.success) {
                        console.log(currentAnswer);
                        setCurrentAnswer(currentAnswer.data);
                    };
                })();
            }
        } catch (error) {
            console.log(error);
            console.log("error localstorage");
            localStorage.setItem("sessionId", "");
        };

        dispatch(getAllAnswers());
        console.log(reduxAnswers);
    }, []);

    useEffect(() => {
        console.log(currentAnswer)
    }, [currentAnswer])


    // COMPONENT:
    return (
        <main className="flex flex-col w-full min-h-screen bg-white dark:bg-black text-black dark:text-white">
            {/* <header className="flex justify-between items-center w-full text-[4rem] leading-[1]">
                <span>INPUT</span><span>IT</span>
            </header> */}
            <header className="flex justify-center w-full py-8 border-solid border-b-[1px] border-black dark:border-white">
                <nav className="flex justify-between items-center w-[75%] xs:w-[80%]">
                    <span className="text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[1.5rem] transition-all">INPUT IT</span>
                    <Link
                        to="/"
                        className="flex justify-center items-center w-[3.5rem] h-[3.5rem] xs:w-[1.5rem] xs:h-[1.5rem] sm:w-[3rem] sm:h-[3rem] md:w-[3.5rem] md:h-[3.5rem] rounded-full hover:bg-flame transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" fill="currentColor" className="bi bi-x transition-colors xs:w-[2rem] xs:h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] md:w-[3rem] md:h-[3rem]" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </Link>
                </nav>
            </header>
            <div className="flex w-full my-10 xs&sm:flex-col-reverse xs&sm:items-center">
                <section className="flex flex-col items-center relative w-[75%] xs&sm:w-full">
                    <h1 className="mb-8 w-[90%] text-[clamp(1rem,calc(1rem+4vw+1vh),5rem)] text-center leading-tight">This is your last answer</h1>
                    <div className="flex flex-col items-center w-[60%] xs&sm:w-[90%]">
                        {/* RECREATE THE FORM */}
                        {
                            localStorage.getItem("sessionId") && (
                                <div className="[&>p]:text-[calc(2rem+1vw)] [&>p]:text-ellipsis [&>p]:overflow-hidden w-full p-10 border border-x-2 border-t-2 rounded-xl border-black dark:border-white">
                                    <label>{NAME.label}</label>
                                    <p>{currentAnswer.full_name}</p>
                                    <label className="mt-4">{PHONE_NUMBER.label}</label>
                                    <p>{currentAnswer.phone_number}</p>
                                    <label className={`mt-4 ${currentAnswer.start_date === null ? 'line-through opacity-50' : ''}`}>{START_DATE.label}</label>
                                    <p>{currentAnswer.start_date ? currentAnswer.start_date : null}</p>
                                    <label className="mt-4">{PREFERRED_LANGUAGE.label}</label>
                                    <p>{mapOptionValuesToLabels("preferred_language", currentAnswer.preferred_language)}</p>
                                    <label className="mt-4">{HOW_FOUND.label}</label>
                                    <p>{mapOptionValuesToLabels("how_found", currentAnswer.how_found)}</p>
                                    <label className={`mt-4 ${currentAnswer.newsletter_subscription === null ? 'line-through opacity-50' : ''}`}>{NEWSLETTER_SUBSCRIPTION.label}</label>
                                    <p>{currentAnswer.newsletter_subscription === true ? "Sí" : null}</p>
                                    <button
                                        className="w-full mt-8 pt-[1rem] pb-[.35rem] text-[3rem] transition-all duration-200 bg-flame hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                                        onClick={handleEditButton}
                                    >
                                        EDIT
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </section>
                <div className="sticky overflow-hidden top-8 h-1/2 pt-4 border-white xs&sm:static xs&sm:pt-0 xs&sm:w-[90%]">
                    <p className="mb-4 text-flame text-[clamp(0.5rem,calc(0.25rem+1vw+1vh),1rem)] animate-pulse xs&sm:mb-1">(scroll down)</p>
                    <h2 className="text-[clamp(0.5rem,calc(.5rem+2vw+1vh),3rem)] leading-tight xs&sm:mb-8">
                        Review<br className="xs&sm:hidden" /> other<br className="xs&sm:hidden" /> inputs
                    </h2>
                </div>
            </div>
            <hr />
            <div className="flex justify-center w-full mt-10">
                <section className="grid grid-cols-3 gap-7 mx-[auto] w-[90%] md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
                    {
                        !reduxAnswers || !Array.isArray(reduxAnswers) ? (
                            null
                        ) : (
                            reduxAnswers.map((answer, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="[&>p]:text-[calc(1rem+1vw)] [&>p]:text-ellipsis [&>p]:overflow-hidden flex flex-1 flex-col p-10 border border-black dark:border-white rounded-xl"
                                    >
                                        <label>{NAME.label}</label>
                                        <p>{answer.full_name}</p>
                                        <label className="mt-4">{PHONE_NUMBER.label}</label>
                                        <p>{answer.phone_number}</p>
                                        <label className={`mt-4 ${answer.start_date === null ? 'line-through opacity-50' : ''}`}>{START_DATE.label}</label>
                                        <p>{answer.start_date ? answer.start_date : null}</p>
                                        <label className="mt-4">{PREFERRED_LANGUAGE.label}</label>
                                        <p>{mapOptionValuesToLabels("preferred_language", answer.preferred_language)}</p>
                                        <label className="mt-4">{HOW_FOUND.label}</label>
                                        <p>{mapOptionValuesToLabels("how_found", answer.how_found)}</p>
                                        <label className={`mt-4 ${answer.newsletter_subscription === null ? 'line-through opacity-50' : ''}`}>{NEWSLETTER_SUBSCRIPTION.label}</label>
                                        <p >{answer.newsletter_subscription === true ? "Sí" : null}</p>
                                    </div>
                                )
                            })
                        )
                    }
                </section>
            </div>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Results;