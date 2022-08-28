const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/config");
const { sequelize } = require("./models");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

require("./routes")(app);

sequelize.sync({ force: false }).then(() => {
  app.listen(config.port);
  console.log(`Server start on port ${config.port}`);
});
