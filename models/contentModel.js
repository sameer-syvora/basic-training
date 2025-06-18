import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Content = sequelize.define(
    'Content',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.ARRAY(DataTypes.ENUM(
                "Action",
                "Comedy",
                "Drama",
                "Horror",
                "Thriller",
                "Sci-Fi",
                "Romance",
                "Documentary",
                "Animation",
                "Biography",
                "Fantasy",
                "Crime"
            )),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        thumbnailURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contentURL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contentType: {
            type: DataTypes.ENUM("movie", "series", "short", "live"),
            allowNull: false
        },
        isPremium: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        releaseDate: {
            type: DataTypes.DATE,
        },
        duration: {
            type: DataTypes.INTEGER
        },
        language: {
            type: DataTypes.STRING
        },
        rating: {
            type: DataTypes.DECIMAL(3,1)
        }
    }
);

export default Content;