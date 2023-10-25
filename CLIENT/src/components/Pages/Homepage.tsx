// --------------- IMPORTS ---------------
import { Link } from "react-router-dom";


// --------------- COMPONENT ---------------
function HomePage() {


    // COMPONENT:
    return (
        <main className="min-w-full min-h-screen flex justify-center items-center bg-white dark:bg-softBlack">
            <div className="w-[50%] xs:w-[80%] sm:w-[80%] md:w-[60%] lg:w-[50%] h-[70%] flex flex-col justify-center items-center text-softBlack dark:text-white transition-all">
                <span className="relative min-w-full">
                    <h1 className="flex text-center items-center justify-between w-full text-[clamp(2rem,calc(1rem+12vw+1vh),8rem)] xs:text-[clamp(2rem,calc(1rem+10vw+1vh),8rem)] md:text-[clamp(2rem,calc(1rem+10vw+1vh),8rem)] transition-all duration-100">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center w-[calc(1rem+10vw+1vh)] h-[calc(1rem+10vw+1vh)] rotate-[-30deg] rounded-full bg-softBlack dark:bg-white text-white dark:text-softBlack font-[ultrabold] select-none transition-all duration-500 hover:rotate-0">
                                <span className="translate-y-2 xs:translate-y-[0.35rem] transition-transform">
                                    I
                                </span>
                            </div>
                            <span className="translate-y-2 xs:translate-y-[0.35rem] transition-transform">NPUT</span>
                        </div>
                        <span className="translate-y-2 xs:translate-y-[0.35rem] transition-transform">IT</span>
                    </h1>
                </span>
                <div className="p-4 bg-black rounded-3xl shadow-reg-black hover:shadow-foc-black transform transition-all duration-300 hover:scale-[1.01] dark:bg-white dark:shadow-reg-white dark:hover:shadow-foc-white">
                    <p className="text-white px-[.5rem] text-[calc(.5rem+1vw+.5vh)] text-justify dark:text-black">
                        Your input <u>matters</u> to us and we'd like to know more about you to improve your experience.
                        <br />
                        Please, take your time to fill a <u>short form</u>.
                    </p>
                </div>
                <Link
                    to="/form"
                    className="mt-8 block w-full pt-[1rem] pb-[.6rem] px-4 text-center text-[clamp(1rem,calc(.5rem+5vw+0.5vh),3rem)] transition-all duration-200 bg-flame hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                >
                    {/* <a
                        role="button"
                        className="block w-full pt-[1rem] pb-[.6rem] px-4 text-center text-[clamp(1rem,calc(.5rem+5vw+0.5vh),3rem)] transition-all duration-200 bg-flame hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    > */}
                        Fill it (the form)
                    {/* </a> */}
                </Link>
            </div>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default HomePage;