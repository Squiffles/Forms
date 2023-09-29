// --------------- IMPORTS ---------------
import db from "../../config/db";
import { handlerResponseAnswer } from "./_handlerResponseTypes";
import { AnswerAttributes } from "../../models/Answer";


// --------------- CONTROLLER ---------------
const DB_findAllAnswers = async (): Promise<handlerResponseAnswer> => {
    try {
        const ANSWER = db.sequelize.models.Answer;
        const DB_allAnswers = await ANSWER.findAll();

        // Extract the dataValues of each "answer" instance:
        const DB_allAnswersData: AnswerAttributes[] = DB_allAnswers.map((answer) => answer.dataValues);

        return {
            success: true,
            data: DB_allAnswersData
        };

    } catch (error) {
        // DEV:
        console.log(`Error while fetching "answers" from the DB: ${error}`);
        throw new Error(`Error while fetching "answers" from the DB: ${error}`);
        // PRODUCTION:
        // return {
        //     success: false,
        //     error: `Error while fetching "answers" from the DB: ${error}`
        // };
    };
};

type Answer = {
    session_id: string,
    full_name: string,
    phone_number: string,
    start_date?: string,
    preferred_language: string,
    how_found: string,
    newsletter_subscription?: boolean
}

const DB_postAnswer = async (data: Answer) => {
    try {
        const ANSWER = db.sequelize.models.Answer;
        const DB_newAnswer = await ANSWER.create(data);

        console.log(DB_newAnswer);

        return {
            success: true,
            data: DB_newAnswer
        };

    } catch (error) {
        // DEV:
        console.log(`Error while creating "answer" in the DB: ${error}`);
        throw new Error(`Error while creating "answer" in the DB: ${error}`);
        // PRODUCTION:
        return {
            success: false,
            error: `Error while creating "answer" in the DB: ${error}`
        };
    };
};


// --------------- EXPORTS ---------------
export {
    DB_findAllAnswers,
    DB_postAnswer
};