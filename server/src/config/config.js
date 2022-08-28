const path = require("path");

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || "myflix",
    user: process.env.DB_USER || "myflix",
    password: process.env.DB_PASS || "myflix",
    options: {
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: path.resolve(__dirname, "../../myflix.sqlite"),
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
