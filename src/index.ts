import config from "./config/env.js";
import express, { Application } from "express";
import db from "./config/database.js";
import middlewares from "./config/express-middlewares.js";

const app: Application = express();

db.connection(config);

middlewares(app);

app.listen(config.PORT, () => {
  console.log(`Server start at port http://localhost:${config.PORT}`);
});
