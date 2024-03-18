import dbConfig from "./db.config";
import { Sequelize, Dialect } from "sequelize";

const sequelize = new Sequelize(
    dbConfig.DB || '', 
    dbConfig.USER || '', 
    dbConfig.PASSWORD || '', 
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect as Dialect,
    }
);

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;