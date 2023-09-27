// --------------- IMPORTS ---------------


// --------------- COMPONENT ---------------
function Success() {


    // COMPONENT:
    return (
        <main className="min-w-full min-h-screen h-[100vh] flex justify-center items-center bg-softBlack">
            <div className="w-[50%] h-[70%] flex flex-col justify-center items-center text-white">
                <span className="relative w-full">
                    <h1 className="flex justify-between w-full text-[2rem] mb-5">
                        <span>INPUT</span><span>IT</span>
                    </h1>
                    <div className="flex justify-center items-center absolute bottom-9 -left-6 w-5 h-5 rotate-[-30deg] rounded-full bg-white text-black font-[ultrabold] select-none transition-all duration-500 hover:rotate-0">
                        R
                    </div>
                </span>
                <h2 className="flex justify-between w-full text-[10rem] leading-[.75]">
                    <span>THANKS</span><span>!</span>
                </h2>
                <p className="text-[1.5rem] text-justify px-[.5rem]">
                    for your response.
                </p>
                <button
                    className="w-full mt-[1rem] pt-[1rem] pb-[.7rem] bg-flame text-[3rem] transition-all duration-200 hover:bg-white hover:text-flame"
                // onClick={ }
                >
                    VIEW ALL THE ANSWERS
                </button>
                <p className="mt-4 text-[1.5rem] text-justify px-[.5rem]">
                    you are on time to change your answer. Click above.
                </p>
            </div>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Success;