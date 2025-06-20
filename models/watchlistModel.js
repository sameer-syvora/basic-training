import sequelize from "../config/db.js";
import User from "./userModel.js";
import Content from "./contentModel.js";

const Watchlist = sequelize.define(
    "Watchlist",
    {}, 
    { timestamps: false });

User.belongsToMany(Content, { through: Watchlist });
Content.belongsToMany(User, { through: Watchlist });

export { User, Content, Watchlist };
