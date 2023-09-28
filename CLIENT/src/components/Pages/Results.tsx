// --------------- IMPORTS ---------------
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllAnswers } from "../../redux/rootReducer";


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
            <section className="flex justify-center items-start w-full">
                {
                    reduxAnswers === null ? (
                        null
                    ) : (
                        reduxAnswers.map((answer) => {
                            return (
                                <div className="">
                                    <p>{answer.full_name}</p>
                                    <p>{answer.phone_number}</p>
                                    <p>{answer.start_date}</p>
                                    <p>{answer.preferred_language}</p>
                                    <p>{answer.how_found}</p>
                                    <p>{answer.newsletter_subscription}</p>
                                </div>
                            )
                        })
                    )
                }
            </section>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Results;