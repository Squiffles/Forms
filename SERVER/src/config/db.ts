// --------------- IMPORTS ---------------
import path from 'path';
// import "dotenv/config";  // could help later.
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { initAnswer } from '../models/Answer';
import { initUser } from '../models/User';

config({ path: path.resolve(__dirname, '../.env') });


// --------------- SEQUELIZE INSTANCE ---------------
const { POSTGRES_DATA_BASE_URL } = process.env;


// SEQUELIZE INSTANCE:
const sequelize: Sequelize = new Sequelize(`${POSTGRES_DATA_BASE_URL}`, {
    dialect: 'postgres',
    logging: false,
    native: false,

    // for deploy:
    dialectOptions: {
        ssl: {
            require: true,
        }
    }
});


// Store all the models initializators in an array so it can be used later to pass the sequelize instance to each initializator.
const modelInitializators: Function[] = [
    initAnswer,
    initUser
];

// Here the array previously filled is used to pass each of its values the sequelize instance.
modelInitializators.forEach((model: Function) => model(sequelize));

const { Answer, User } = sequelize.models;

// --------------- ASSOCIATIONS ---------------
User.hasMany(Answer, {
    foreignKey: {
        name: "user_id",
        allowNull: true
    },
});
Answer.belongsTo(User, { foreignKey: "user_id" });


const db = {
    sequelize
};


// --------------- EXPORTS ---------------
export default db;