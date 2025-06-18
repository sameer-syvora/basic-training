import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Friend = sequelize.define(
    "Friend",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        senderID: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        recipientID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("Accepted", "Rejected", "Pending"),
            allowNull: false,
            defaultValue: "Pending"
        }
    }
);

export default Friend;