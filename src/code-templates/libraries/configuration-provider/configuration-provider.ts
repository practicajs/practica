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
    prettyPrint: {
      doc: "Weather the logger should be configured to pretty print the output",
      format: 'Boolean',
      default: true,
      nullable: false,
      env: "PRETTY_PRINT_LOG",
    },
    destination: {
      doc: "destination in which the logger should be written, empty value will be considered as stdout",
      format: '*',
      default: null,
      nullable: true,
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
