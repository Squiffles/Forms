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
        // console.log(`Error while fetching "answers" from the DB: ${error}`);
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
};

const DB_findAnswerById = async (sessionId: string) => {
    try {
        const ANSWER = db.sequelize.models.Answer;
        const DB_answerFound = await ANSWER.findOne({
            where: {
                session_id: sessionId
            }
        });

        return {
            success: true,
            data: DB_answerFound
        };

    } catch (error) {
        // DEV:
        // console.log(`Error while fetching "answers" from the DB: ${error}`);
        throw new Error(`Error while fetching "answers" from the DB: ${error}`);
        // PRODUCTION:
        // return {
        //     success: false,
        //     error: `Error while fetching "answers" from the DB: ${error}`
        // };
    };
};


const DB_postAnswer = async (data: Answer) => {
    try {
        const ANSWER = db.sequelize.models.Answer;
        const DB_newAnswer = await ANSWER.create(data);

        // console.log(DB_newAnswer);

        return {
            success: true,
            data: DB_newAnswer
        };

    } catch (error) {
        // DEV:
        // console.log(`Error while creating "answer" in the DB: ${error}`);
        throw new Error(`Error while creating "answer" in the DB: ${error}`);
        // PRODUCTION:
        // return {
        //     success: false,
        //     error: `Error while creating "answer" in the DB: ${error}`
        // };
    };
};


const DB_editAnswerById = async (sessionId: string, newAnswer: any) => {
    try {
        const ANSWER = db.sequelize.models.Answer;
        const DB_answerFound = await ANSWER.findOne({
            where: {
                session_id: sessionId
            }
        });

        if (DB_answerFound) {
            // Update each property
            for (let prop in newAnswer) {
                // Allow null and DON'T validate the existence of the prop.
                (DB_answerFound as any)[prop] = newAnswer[prop];
            };

            await DB_answerFound?.save();

            return {
                success: true,
            };
        } else {
            return {
                success: false
            };
        };


    } catch (error) {
        // DEV:
        // console.log(`Error while editing "answer" in the DB: ${error}`);
        throw new Error(`Error while editing "answer" in the DB: ${error}`);
        // PRODUCTION:
        // return {
        //     success: false,
        //     error: `Error while editing "answer" in the DB: ${error}`
        // };
    };
};


// --------------- EXPORTS ---------------
export {
    DB_findAllAnswers,
    DB_findAnswerById,
    DB_postAnswer,
    DB_editAnswerById
};