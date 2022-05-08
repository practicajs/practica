export default {
  username: "myuser",
  password: "myuserpassword",
  database: "shop",
  host: "localhost",
  port: 54310,
  logging: false,
  dialect: "postgres" as const,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
