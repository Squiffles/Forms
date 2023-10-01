// --------------- IMPORTS ---------------
import { Link } from "react-router-dom";


// --------------- COMPONENT ---------------
function HomePage() {


    // COMPONENT:
    return (
        <main className="min-w-full min-h-screen h-[100vh] flex justify-center items-center bg-softBlack">
            <div className="w-[50%] h-[70%] flex flex-col justify-center items-center text-white">
                <span className="relative w-full">
                    <h1 className="flex justify-between w-full text-[10rem] leading-[.75]">
                        <span>INPUT</span><span>IT</span>
                    </h1>
                    <div className="flex justify-center items-center absolute bottom-4 -left-8 w-8 h-8 rotate-[-30deg] rounded-full bg-white text-black font-[ultrabold] select-none transition-all duration-500 hover:rotate-0">
                        R
                    </div>
                </span>
                <p className="text-[1.5rem] text-justify px-[.5rem]">
                    Your input matters to us and we want to know more about you so we can enhance your experience.
                    <br />
                    Please take your time to complete a <u>short form</u>.
                </p>
                <Link
                    to="/form"
                    className="mt-[1rem]"
                >
                    <button
                        className="w-full pt-[1rem] pb-[.7rem] bg-flame text-[3rem] transition-all duration-200 hover:bg-white hover:text-flame"
                    // onClick={ }
                    >
                        FILL IT (the form)
                    </button>
                </Link>
            </div>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default HomePage;