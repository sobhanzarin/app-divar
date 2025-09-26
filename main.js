const express = require("express");
const dotenv = require("dotenv");
const SwaggerConfig = require("./src/config/swagger.config");
const mainRouter = require("./src/app.routes");

async function main() {
  const app = express();
  const PORT = process.env.PORT ?? 2900;
  require("./src/config/mongoose.config");
  SwaggerConfig(app);
  app.use(mainRouter);
  app.listen(PORT, () => {
    console.log(`server: http://localhost:${PORT}`);
  });
}

main();
