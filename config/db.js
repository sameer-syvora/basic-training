import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    host: process.env.HOST,
    dialect: 'postgres'
});

export default sequelize;
