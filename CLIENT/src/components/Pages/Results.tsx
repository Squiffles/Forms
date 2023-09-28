// --------------- IMPORTS ---------------
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllAnswers } from "../../redux/rootReducer";
import { items } from "../../services/data.json";


// --------------- COMPONENT ---------------
function Results() {


    // GLOBAL STATES:
    const reduxAnswers = useAppSelector((state) => state.root.answers.data);


    // CONST:
    const dispatch = useAppDispatch();


    // LIFE CYCLES:
    useEffect(() => {
        dispatch(getAllAnswers());
        console.log(reduxAnswers);
    }, []);


    // COMPONENT:
    return (
        <main className="flex flex-col w-full min-h-screen bg-white text-black">
            <header className="flex justify-between items-center w-full text-[4rem] leading-[1]">
                <span>INPUT</span><span>IT</span>
            </header>
            <div className="flex w-full mt-10">
                <section className="flex flex-col items-center relative w-[80%]">
                    <h1 className="text-[4rem]">This is your last answer</h1>
                    <div className="flex flex-col items-center w-[50%]">
                        <div className="w-full border">
                            {/* RECREATE THE FORM */}
                        </div>
                        <button className="pt-[1rem] pb-[.35rem] bg-flame text-[3rem] transition-all duration-200 hover:bg-black hover:text-white">
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
                        reduxAnswers === null ? (
                            null
                        ) : (
                            reduxAnswers.map((answer) => {
                                return (
                                    <div className="flex flex-1 flex-col p-10 border border-black rounded-xl">
                                        <label>{items[0].label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.full_name}</p>
                                        <label className="mt-4">{items[1].label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.phone_number}</p>
                                        <label className={`mt-4 ${answer.start_date === null ? 'line-through' : ''}`}>{items[2].label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.start_date !== null ? answer.start_date : null}</p>
                                        <label className="mt-4">{items[3].label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.preferred_language}</p>
                                        <label className="mt-4">{items[4].label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.how_found}</p>
                                        <label className={`mt-4 ${answer.newsletter_subscription === null ? 'line-through' : ''}`}>{items[5].label}</label>
                                        <p className="text-[calc(2rem+1vw)]">{answer.newsletter_subscription !== null ? (answer.newsletter_subscription === true ? "Sí" : "No") : null}</p>
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