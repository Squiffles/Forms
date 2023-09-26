// --------------- IMPORTS ---------------
import db from "../../config/db";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { Model } from "sequelize";
import { UserAttributes } from "../../models/User";
import { handlerResponseUser, errorTypes } from "../_handlers/_handlerResponseTypes";


// --------------- CONTROLLER ---------------
const DB_postUser = async (data: any): Promise<handlerResponseUser> => {
    // email and password.
    try {
        const { email, password } = data;

        const USER = db.sequelize.models.User;

        // Salt rounds for the hashing operation:
        const saltRounds = 10;

        // Hash the password before storing it in the DB:
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Find a "user" in the DB that has the same email:
        const USER_FOUND = await USER.findOne({
            where: {
                email_address: email
            }
        });

        console.log(hashedPassword);

        if (USER_FOUND) {
            // If a user with the same email already exists in the DB, then the success is false and the error property is sent.
            return {
                success: false,
                error: {
                    type: errorTypes.EXISTENT,
                    message: `The email ${email} is already in use.`
                }
            };
        } else {
            // If it's a new email, then it creates the user.
            const DB_newUser = await USER.create({
                email_address: email,
                password: hashedPassword
            });

            console.log('Hashed password:', hashedPassword);
            console.log(DB_newUser);

            return {
                success: true,
                data: DB_newUser
            };
        };

    } catch (error) {
        // DEV:
        console.log(`Error while creating "user" in the DB: ${error}`);
        throw new Error(`Error while creating "user" in the DB: ${error}`);
        // PRODUCTION:
        // return {
        //     success: false,
        //     error: {
        //         type: "internalError",
        //         message: `Error while creating "user" in the DB: ${error}`
        //     }
        // };
    };
};

const _postUserLogin = async (data: any): Promise<handlerResponseUser> => {
    try {
        const { email, password } = data;

        const USER = db.sequelize.models.User;

        // Check if the user exists in the DB using the email:
        const USER_FOUND: Model<UserAttributes> | null = await USER.findOne({
            where: {
                email_address: email
            }
        });

        if (!USER_FOUND) {
            // If it doesn't exists, then the success is false.
            return {
                success: false,
                error: {
                    type: errorTypes.NO_FOUND,
                    message: `The user ${email} doesn't exist`
                }
            };
        } else {
            // If it does exists, verify the password.
            const passwordMatch = await bcrypt.compare(password, USER_FOUND.dataValues.password);

            if (!passwordMatch) {
                return {
                    success: false,
                    error: {
                        type: errorTypes.INVALID,
                        message: "Invalid password"
                    }
                };
            } else {
                // Generate a JWT token:
                const token = jwt.sign({ userId: USER_FOUND.dataValues.user_id, email: USER_FOUND.dataValues.email_address }, 'your_secret_key', { expiresIn: '1h' });
                return {
                    success: true,
                    data: token
                };
            };
        };

    } catch (error) {
        // DEV:
        console.log(`Error while loging the user to the website: ${error}`);
        throw new Error(`Error while loging the user to the website: ${error}`);
        // PRODUCTION:
        // return {
        //     success: false,
        //     error: {
        //         type: "internalError",
        //         message: `Error while loging the user to the website: ${error}`
        //     }
        // };
    };
};


// --------------- EXPORTS ---------------
export {
    DB_postUser,
    _postUserLogin
};