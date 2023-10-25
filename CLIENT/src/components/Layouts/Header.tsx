// --------------- IMPORTS ---------------
import { Link } from "react-router-dom";


// --------------- COMPONENT ---------------
function Header() {
    return (
        <header className="flex justify-center w-full py-8 border-solid border-b-[1px] border-black dark:border-white">
            <nav className="flex justify-between items-center w-[75%] xs:w-[80%]">
                <div className="flex items-center text-[3rem] md:text-[3rem] sm:text-[2rem] xs:text-[1.5rem] transition-all">
                    <span className="flex justify-center items-center xs:w-[calc(0.5rem+4vw+0.5vh)] xs:h-[calc(0.5rem+4vw+0.5vh)] sm:w-[calc(0.5rem+4vw+0.5vh)] sm:h-[calc(0.5rem+4vw+0.5vh)] w-[calc(0.5rem+5vw+1vh)] h-[calc(0.5rem+5vw+1vh)] xs:min-w-[2rem] xs:min-h-[2rem] max-w-[4rem] max-h-[4rem] rotate-[-30deg] rounded-full bg-black dark:bg-white text-white dark:text-black font-[ultrabold] select-none transition-all duration-500 hover:rotate-0">
                        <div className="translate-y-1 xs:translate-y-[0.15rem] translate-x-[0.045rem] sm:translate-x-[0.035rem] transition-transform">
                            I
                        </div>
                    </span>
                    <span className="translate-y-[0.25rem] xs:translate-y-[.15rem] whitespace-nowrap">NPUT IT</span>
                </div>
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
    );
};


// --------------- EXPORTS ---------------
export default Header;