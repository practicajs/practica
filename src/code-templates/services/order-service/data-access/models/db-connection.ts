import { Sequelize, Options } from 'sequelize';
import * as configurationProvider from '@practica/configuration-provider';
import { logger } from '@practica/logger';

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
        dialect: 'postgres',
        benchmark: true,
        logging: (sql: string, duration?: number) => {
          logger.info(
            `Sequelize operation was just executed in ${duration} ms with sql: ${sql}`
          );
        },
        logQueryParameters: true,
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
