// --------------- IMPORTS ---------------
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllAnswers } from "../../redux/rootReducer";
import { getAnswerByIdRequest } from "../../services/requests/answer";
import { items } from "../../services/data.json";
import { useNavigate } from "react-router-dom";


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
            <header className="flex justify-between items-center w-full text-[4rem] leading-[1]">
                <span>INPUT</span><span>IT</span>
            </header>
            <div className="flex w-full mt-10">
                <section className="flex flex-col items-center relative w-[80%]">
                    <h1 className="text-[4rem]">This is your last answer</h1>
                    <div className="flex flex-col items-center w-[60%]">
                        {/* RECREATE THE FORM */}
                        {
                            localStorage.getItem("sessionId") && (
                                <div className="w-full p-10 border border-x-2 border-t-2 rounded-xl border-black dark:border-white">
                                    <label>{NAME.label}</label>
                                    <p className="text-[calc(2rem+1vw)]">{currentAnswer.full_name}</p>
                                    <label className="mt-4">{PHONE_NUMBER.label}</label>
                                    <p className="text-[calc(2rem+1vw)]">{currentAnswer.phone_number}</p>
                                    <label className={`mt-4 ${currentAnswer.start_date === null ? 'line-through' : ''}`}>{START_DATE.label}</label>
                                    <p className="text-[calc(2rem+1vw)]">{currentAnswer.start_date ? currentAnswer.start_date : null}</p>
                                    <label className="mt-4">{PREFERRED_LANGUAGE.label}</label>
                                    <p className="text-[calc(2rem+1vw)]">{mapOptionValuesToLabels("preferred_language", currentAnswer.preferred_language)}</p>
                                    <label className="mt-4">{HOW_FOUND.label}</label>
                                    <p className="text-[calc(2rem+1vw)]">{mapOptionValuesToLabels("how_found", currentAnswer.how_found)}</p>
                                    <label className={`mt-4 ${currentAnswer.newsletter_subscription === null ? 'line-through' : ''}`}>{NEWSLETTER_SUBSCRIPTION.label}</label>
                                    <p className="text-[calc(2rem+1vw)]">{currentAnswer.newsletter_subscription ? (currentAnswer.newsletter_subscription === true ? "Sí" : null) : null}</p>
                                </div>
                            )
                        }
                        <button
                            className="pt-[1rem] pb-[.35rem] text-[3rem] transition-all duration-200 bg-flame hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                            onClick={handleEditButton}
                        >
                            EDIT
                        </button>
                    </div>
                </section>
                <div>
                    <p>(scroll down)</p>
                    <h2 className="text-[4rem]">Review<br />other<br />inputs</h2>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <section className="grid grid-cols-3 gap-7 mx-[auto] w-[90%] scree">
                    {
                        !reduxAnswers || !Array.isArray(reduxAnswers) ? (
                            null
                        ) : (
                            reduxAnswers.map((answer, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-1 flex-col p-10 border border-black dark:border-white rounded-xl"
                                    >
                                        <label>{NAME.label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.full_name}</p>
                                        <label className="mt-4">{PHONE_NUMBER.label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.phone_number}</p>
                                        <label className={`mt-4 ${answer.start_date === null ? 'line-through' : ''}`}>{START_DATE.label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.start_date ? answer.start_date : null}</p>
                                        <label className="mt-4">{PREFERRED_LANGUAGE.label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{mapOptionValuesToLabels("preferred_language", answer.preferred_language)}</p>
                                        <label className="mt-4">{HOW_FOUND.label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{mapOptionValuesToLabels("how_found", answer.how_found)}</p>
                                        <label className={`mt-4 ${answer.newsletter_subscription === null ? 'line-through' : ''}`}>{NEWSLETTER_SUBSCRIPTION.label}</label>
                                        <p>sada</p>
                                        <p className="text-[calc(2rem+1vw)]">{answer.newsletter_subscription ? currentAnswer.newsletter_subscription === true : null}</p>
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