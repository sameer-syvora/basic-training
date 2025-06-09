import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Like = sequelize.define(
    'Like',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false
        },
        postID: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }
);

export default Like;