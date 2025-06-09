import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Post = sequelize.define(
    'Post',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userID: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(256),
            allowNull: false
        }
    },
    {
        timestamps: true,
        updatedAt: false
    }
)

export default Post;