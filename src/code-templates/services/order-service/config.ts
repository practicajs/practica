// ️️️✅ Best Practice: Store configuration in a self-explanatory, strongly typed and hierarchical store

export default {
  port: {
    doc: "The API listening port. By default is 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned",
    format: "Number",
    default: 0,
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
};
