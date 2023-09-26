// --------------- IMPORTS ---------------
import { Sequelize, Model, DataTypes } from "sequelize";


// --------------- MODEL ---------------
interface ResponseAttributes {
    response_id: number;
    full_name: string;
    phone_number: string;
    start_date?: string;
    preferred_language: string;
    how_found: string;
    newsletter_subscription?: boolean;
};

class ResponseClass extends Model<ResponseAttributes> implements ResponseAttributes {
    public response_id!: number;
    public full_name!: string;
    public phone_number!: string;
    public start_date?: string | undefined;
    public preferred_language!: string;
    public how_found!: string;
    public newsletter_subscription?: boolean | undefined;
}

const initResponse: Function = (sequelize: Sequelize) => {
    ResponseClass.init(
        {
            response_id: {
                primaryKey: true,
                type: DataTypes.NUMBER,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
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
                type: DataTypes.STRING,
                allowNull: false
            },
            how_found: {
                type: DataTypes.STRING,
                allowNull: false
            },
            newsletter_subscription: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: "Currency",
            tableName: "currencies",
            timestamps: false,
            freezeTableName: true
        }
    );
    return CurrencyClass;
};



// --------------- EXPORTS ---------------