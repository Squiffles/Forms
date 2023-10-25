// --------------- IMPORTS ---------------
import axios from "axios";


// --------------- REQUESTS ---------------
const getCountryCode = async (): Promise<any> => {
    try {
        const { data } = await axios.get("countryCode");

        return data;

    } catch (error) {
        // console.log(`Error after attempting to: getCountryCode | CLIENT: ${error}`);
        return {
            success: false
        };
    };
};


// --------------- EXPORTS ---------------
export {
    getCountryCode
};