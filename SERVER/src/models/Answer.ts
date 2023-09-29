// --------------- IMPORTS ---------------
import { Sequelize, Model, DataTypes } from "sequelize";


// --------------- MODEL ---------------
interface AnswerAttributes {
    answer_id: number;
    session_id: string;
    full_name: string;
    phone_number: string;
    start_date?: string;
    preferred_language: string;
    how_found: string;
    newsletter_subscription?: boolean;
};

class AnswerClass extends Model<AnswerAttributes> implements AnswerAttributes {
    public answer_id!: number;
    public session_id !: string;
    public full_name!: string;
    public phone_number!: string;
    public start_date?: string;
    public preferred_language!: string;
    public how_found!: string;
    public newsletter_subscription?: boolean;
};

const initAnswer: Function = (sequelize: Sequelize) => {
    AnswerClass.init(
        {
            answer_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
            session_id: {
                type: DataTypes.UUID,
                allowNull: false
            } ,
            full_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            start_date: {
                type: DataTypes.STRING,
                allowNull: true
            },
            preferred_language: {
                type: DataTypes.ENUM("english", "spanish", "french", "german"),
                allowNull: false
            },
            how_found: {
                type: DataTypes.ENUM("friends", "online_search", "advertisement"),
                allowNull: false
            },
            newsletter_subscription: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "Answer",
            tableName: "answers",
            timestamps: false,
            freezeTableName: true
        }
    );
    return AnswerClass;
};


// --------------- EXPORTS ---------------
export { initAnswer, AnswerAttributes };