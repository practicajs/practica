import { Sequelize, Options } from 'sequelize';
import * as configurationProvider from '@practica/configuration-provider';

// ️️️✅ Best Practice: Keep a singleton DB connection pool in a process
let dbConnection: Sequelize;

export default function getDbConnection() {
  if (!dbConnection) {
    dbConnection = new Sequelize(
      configurationProvider.getValue('DB.dbName'),
      configurationProvider.getValue('DB.userName'),
      configurationProvider.getValue('DB.password'),
      {
        port: 54320,
        logging: false,
        dialect: 'postgres',
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
  }

  return dbConnection;
}
