// ️️️✅ Best Practice: Store configuration in a self-explanatory, strongly typed and hierarchical store

export default {
  jwtTokenSecret: {
    doc: 'The JWT token signing algorithm secret',
    format: 'String',
    default: 'just-a-default-secret',
    nullable: false,
    env: 'JWT_TOKEN_SECRET',
  },
  port: {
    doc: 'The API listening port. Testing will pass 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned',
    format: 'Number',
    default: 3000,
    nullable: true,
    env: 'PORT',
  },
  logger: {
    level: {
      doc: 'Which type of logger entries should actually be written to the target medium (e.g., stdout)',
      format: ['debug', 'info', 'warn', 'error', 'critical'],
      default: 'info',
      nullable: false,
      env: 'LOGGER_LEVEL',
    },
    prettyPrint: {
      doc: 'Weather the logger should be configured to pretty print the output',
      format: 'Boolean',
      default: true,
      nullable: false,
      env: 'PRETTY_PRINT_LOG',
    },
    destination: {
      doc: 'destination in which the logger should be written, empty value will be considered as stdout',
      format: '*',
      default: null,
      nullable: true,
      env: 'LOGGER_DEST',
    },
  },
  DB: {
    userName: {
      doc: 'The DB connection user name',
      format: 'String',
      default: 'myuser',
      nullable: false,
      env: 'DB_USERNAME',
    },
    port: {
      doc: 'The DB port',
      format: 'Number',
      default: '54320',
      nullable: false,
      env: 'DB_PORT',
    },
    url: {
      doc: 'The DB cluster URL',
      format: 'String',
      default: 'localhost',
      nullable: false,
      env: 'DB_URL',
    },
    password: {
      doc: "The DB connection password. Don't put production code here",
      format: 'String',
      default: 'myuserpassword',
      nullable: false,
      env: 'DB_PASSWORD',
    },
    dbName: {
      doc: 'The default database name',
      format: 'String',
      default: 'shop',
      nullable: false,
      env: 'DB_NAME',
    },
  },
};
