// --------------- IMPORTS ---------------
import { Sequelize, Model, DataTypes } from "sequelize";


// --------------- MODEL ---------------
interface UserAttributes {
    user_id: number;
    email_address: string;
    password: string;
};

class UserClass extends Model<UserAttributes> implements UserAttributes {
    public user_id!: number;
    public email_address!: string;
    public password!: string;
};

const initUser: Function = (sequelize: Sequelize) => {
    UserClass.init(
        {
            user_id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true
            },
            email_address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            // Hashed password.
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: false,
            freezeTableName: true
        }
    );
    return UserClass;
};


// --------------- EXPORTS ---------------
export { initUser, UserAttributes };