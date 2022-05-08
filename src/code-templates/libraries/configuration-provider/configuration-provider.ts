import convict from "convict";

export const configurationProvider = convict({
  port: {
    doc: "The API listening port",
    format: "Number",
    default: 3000,
    nullable: true,
    env: "PORT",
  },
  logger: {
    level: {
      doc: "Which type of logger entries should actually be written to the target medium (e.g., stdout)",
      format: ["debug", "info", "warn", "error", "critical"],
      default: "info",
      nullable: false,
      env: "LOGGER_LEVEL",
    },
    destination: {
      doc: "destination in which the logger should be written",
      format: '*',
      default: "stdout",
      nullable: false,
      env: "LOGGER_DEST",
    }
  },
  DB: {
    userName: {
      doc: "The DB connection user name",
      format: "String",
      default: "myuser",
      nullable: false,
      env: "DB_USERNAME",
    },
    password: {
      doc: "The DB connection password. Don't put production code here",
      format: "String",
      default: "myuserpassword",
      nullable: false,
      env: "DB_PASSWORD",
    },
    dbName: {
      doc: "The default database name",
      format: "String",
      default: "shop",
      nullable: false,
      env: "DB_NAME",
    },
  },
});
