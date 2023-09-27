// --------------- IMPORTS ---------------
import { useRouteError } from "react-router-dom";


// --------------- COMPONENT ---------------
function ErrorPage() {

    const error: any = useRouteError();

    // ELEMENT:
    return (
        <main className="min-h-screen min-w-full bg-white text-slate-950 flex flex-col gap-9 justify-center items-center">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
        </main>
    )
}


// --------------- EXPORTS ---------------
export default ErrorPage;