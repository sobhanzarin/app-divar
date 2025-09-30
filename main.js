const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllErrorHandler = require("./src/common/exception/all-exception");
const cookieParser = require("cookie-parser");
dotenv.config();

async function main() {
  const app = express();
  const PORT = process.env.PORT ?? 2900;
  require("./src/config/mongoose.config");
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
  app.use(mainRouter);

  SwaggerConfig(app);

  NotFoundHandler(app);
  AllErrorHandler(app);
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
