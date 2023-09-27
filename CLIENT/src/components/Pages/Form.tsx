// --------------- IMPORTS ---------------
import { items } from "../../services/data.json";


// --------------- COMPONENT ---------------
function Form() {


    // ELEMENT:
    return (
        <main className="flex flex-col items-center w-full min-h-screen bg-white text-black">
            <header className="flex justify-between items-center w-full text-[4rem] leading-[1]">
                <span>INPUT</span><span>IT</span>
            </header>
            <form className="flex flex-col gap-[5rem] w-[70%] mt-[5%] border-black rounded-[0.5rem]">
                {/* NAME */}
                <section className="flex flex-col justify-start">
                    {
                        items[0].required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label className="text-[1.5rem]">{items[0].label}</label>
                    <div className="relative w-full mt-4">
                        <input
                            className="w-full bg-transparent outline-none text-[6rem] leading-[1]"
                            type={items[0].type}
                            required={items[0].required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                </section>
                {/* PHONE NUMBER */}
                <section className="flex flex-col justify-start">
                    {
                        items[1].required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label className="text-[1.5rem]">{items[1].label}</label>
                    <div className="relative w-full mt-4">
                        <input
                            className="w-full bg-transparent outline-none text-[6rem] leading-[1]"
                            type={items[1].type}
                            required={items[1].required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                </section>
                {/* START DATE */}
                <section className="flex flex-col justify-start">
                    {
                        items[2].required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        className="text-[1.5rem]"
                        htmlFor="start_date"
                    >
                        {items[2].label}
                    </label>
                    <div className="relative w-full mt-4">
                        <input
                            id="start_date"
                            className="w-full bg-transparent outline-none text-[6rem] leading-[1]"
                            type={items[2].type}
                            required={items[2].required}
                        />
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                </section>
                {/* PREERRED LANGUAGE */}
                <section className="flex flex-col justify-start">
                    {
                        items[3].required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        className="text-[1.5rem]"
                        htmlFor="preferred_language"
                    >
                        {items[3].label}
                    </label>
                    <div className="relative w-full mt-4">
                        <select
                            id="preferred_language"
                            className="w-full bg-transparent outline-none text-[6rem] leading-[1]"
                            required={items[3].required}
                        >
                            {
                                items[3].options?.map((option, idx) => (
                                    <option key={idx}>{option.label}</option>
                                ))
                            }
                        </select>
                        <div className="absolute w-full h-1 bg-black" />
                    </div>
                </section>
                {/* HOW FOUND */}
                <section className="flex flex-col justify-start">
                    {
                        items[4].required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label className="text-[1.5rem]">{items[4].label}</label>
                    <div className="relative w-full mt-4">
                        {
                            items[4].options?.map((option, index) => (
                                <span className="flex">
                                    <input
                                        key={index}
                                        id={`option_${index}`}
                                        className="w-[30px] bg-transparent outline-none text-[6rem] leading-[1]"
                                        type={items[4].type}
                                        name="how_found"
                                        required={items[4].required}
                                    />
                                    <label
                                        className="text-[6rem]"
                                        htmlFor={`option_${index}`}
                                    >
                                        {option.label}
                                    </label>
                                </span>
                            ))
                        }
                    </div>
                </section>
                {/* NEWSLETTER */}
                <section className="flex flex-row-reverse justify-end">
                    {
                        items[5].required ? (
                            <p>*Required</p>
                        ) : null
                    }
                    <label
                        className="text-[1rem]"
                        htmlFor="newsletter"
                    >{items[5].label}</label>
                    <input
                        id="newsletter"
                        className="w-[50px] bg-transparent outline-none text-[6rem] leading-[1] checked:bg-flame form-radio"
                        type={items[5].type}
                        required={items[5].required}
                    />
                </section>
                <button
                    className="w-full mt-[1rem] pt-[1rem] pb-[.35rem] bg-flame text-[3rem] transition-all duration-200 hover:bg-black hover:text-white"
                // onClick={ }
                >
                    SEND
                </button>
            </form>
        </main>
    );
};


// --------------- EXPORTS ---------------
export default Form;