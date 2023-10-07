// --------------- IMPORTS ---------------
import { Link } from "react-router-dom";


// --------------- COMPONENT ---------------
function HomePage() {


    // COMPONENT:
    return (
        <main className="min-w-full min-h-screen flex justify-center items-center bg-white dark:bg-softBlack ">
            <div className="w-[50%] xs:w-[80%] sm:w-[80%] md:w-[60%] lg:w-[50%] h-[70%] flex flex-col justify-center items-center text-black dark:text-white transition-all">
                <span className="relative min-w-full">
                    <h1 className="flex text-center items-center justify-between w-full text-[clamp(2rem,calc(1rem+12vw+1vh),8rem)] xs:text-[clamp(2rem,calc(1rem+10vw+1vh),8rem)] md:text-[clamp(2rem,calc(1rem+10vw+1vh),8rem)] transition-all duration-100">
                        <span>INPUT</span><span>IT</span>
                    </h1>
                    <div className="flex justify-center items-center absolute bottom-[30%] -left-8 w-8 sm:w-6 xs:w-6 h-8 sm:h-6 xs:h-6 rotate-[-30deg] rounded-full bg-black dark:bg-white text-white dark:text-black font-[ultrabold] select-none transition-all duration-500 hover:rotate-0">
                        R
                    </div>
                </span>
                <div className="p-4 bg-black rounded-3xl shadow-reg-black hover:shadow-foc-black transform transition-all duration-300 hover:scale-[1.01] dark:bg-white dark:shadow-reg-white dark:hover:shadow-foc-white">
                    <p className="text-white px-[.5rem] text-[calc(.5rem+1vw+.5vh)] text-justify dark:text-black">
                        Tu opinión nos importa <u>mucho</u> y queremos saber más de ti para mejorar tu experiencia.
                        <br />
                        Por favor, toma tu tiempo para completar un <u>pequeño formulario</u>.
                    </p>
                </div>
                <Link
                    to="/form"
                    className="mt-[1rem]"
                >
                    <a
                        role="button"
                        className="block w-full mt-4 pt-[1rem] pb-[.6rem] px-4 text-center text-[clamp(1rem,calc(.5rem+5vw+0.5vh),3rem)] transition-all duration-200 bg-flame hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        Fill it (the form)
                    </a>
                </Link>
            </div>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default HomePage;