// --------------- IMPORTS ---------------
import path from "path";
import { Router, Request, Response } from "express";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../.env") });


// --------------- CONTROLLER ---------------
const { IP_TOKEN } = process.env;


const getCountryCode = async (_req: Request, res: Response): Promise<any> => {
    try {

        const response = await fetch(`https://ipinfo.io/179.6.6.159?token=${IP_TOKEN}`);

        if (!response) return res.status(404).json({
            success: false,
            message: "No response received after attempting to fetch the IP address"
        });

        const data = await response.json();

        return res.status(200).json({
            success: true,
            data: data.country
        });

    } catch (error) {
        console.log(`Error while fetching the IP address: ${error}`);
        return res.status(500).json({
            success: false,
            message: `Internal server error: ${error}`
        });
    };
};


// --------------- ROUTER ---------------
const countryCodeRouter = Router();

countryCodeRouter.get("/", getCountryCode);


// --------------- IMPORTS ---------------
export default countryCodeRouter;