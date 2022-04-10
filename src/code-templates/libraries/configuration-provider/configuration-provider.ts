import convict from "convict";

export const configurationProvider = convict({
  port: {
    doc: "The API listening port",
    format: "Number",
    default: 3000,
    nullable: true,
    env: "PORT",
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
