import { Sequelize, Options } from 'sequelize';
import * as configurationProvider from '@practica/configuration-provider';
import sequelizeConfig from './config/config';

// ️️️✅ Best Practice: Keep a singleton DB connection pool in a process
let dbConnection: Sequelize;

export default function getDbConnection() {
  if (!dbConnection) {
    dbConnection = new Sequelize(
      configurationProvider.getValue('DB.dbName'),
      configurationProvider.getValue('DB.userName'),
      configurationProvider.getValue('DB.password'),
      sequelizeConfig as Options
    );
  }

  return dbConnection;
}
