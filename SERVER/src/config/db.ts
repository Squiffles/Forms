// --------------- IMPORTS ---------------
import path from 'path';
// import "dotenv/config";  // could help later.
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config({ path: path.resolve(__dirname, '../.env') });


// --------------- SEQUELIZE INSTANCE ---------------
const { POSTGRES_DATA_BASE_URL } = process.env;

const db: Sequelize = new Sequelize(`${POSTGRES_DATA_BASE_URL}`, {
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


// // --------------- EXPORTS ---------------
export default db;