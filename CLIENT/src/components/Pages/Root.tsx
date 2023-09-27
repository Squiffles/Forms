// --------------- IMPORTS ---------------
import { Outlet } from "react-router-dom";


// --------------- COMPONENT ---------------
function Root() {


    // VARIABLES:
    const route: string = "root";


    // ELEMENT:
    return (
        <>
            {/* <Header route={route} /> */}
            <Outlet />
        </>
    );
};


// --------------- EXPORTS ---------------
export default Root;