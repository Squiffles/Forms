// --------------- IMPORTS ---------------
import { useEffect } from "react";
import { getAllAnswers } from "../../services/requests/answer";



// --------------- COMPONENT ---------------
function Answers() {


    useEffect(() => {
        (async() => {
            const data = await getAllAnswers();
            console.log(data);
        })()
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
            <section>

            </section>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Answers;