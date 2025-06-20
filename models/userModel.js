import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
    'User', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user"
        },
        subscriptionStart: {
            type: DataTypes.DATE,
        },
        subscriptionEnd: {
            type: DataTypes.DATE,
        }
    }
);

export default User;
