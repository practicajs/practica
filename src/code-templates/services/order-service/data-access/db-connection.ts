import { Sequelize } from "sequelize";
import sequelizeConfig from "./config/config";
import * as configurationProvider from "@practica/configuration-provider";

// ️️️✅ Best Practice: Keep a singleton DB connection pool in a process
let dbConnection: Sequelize;

export function getDbConnection() {
  if (!dbConnection) {
    dbConnection = new Sequelize(
      configurationProvider.getValue("DB.dbName"),
      configurationProvider.getValue("DB.userName"),
      configurationProvider.getValue("DB.password"),
      sequelizeConfig
    );
  }

  return dbConnection;
}
