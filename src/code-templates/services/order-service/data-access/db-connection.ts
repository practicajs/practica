import { Sequelize } from "sequelize";
import sequelizeConfig from "./config/config";
import { configurationProvider } from "@practica/configuration-provider";

// ️️️✅ Best Practice: Keep a singleton DB connection pool in a process
let dbConnection: Sequelize;

export function getDbConnection() {
  if (!dbConnection) {
    dbConnection = new Sequelize(
      configurationProvider.get("DB.dbName"),
      configurationProvider.get("DB.userName"),
      configurationProvider.get("DB.password"),
      sequelizeConfig
    );
  }

  return dbConnection;
}
