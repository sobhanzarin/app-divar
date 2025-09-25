const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function SwaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "divar-app",
        description: "divar api develop",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:2900",
        },
      ],
    },
    apis: ["./routes/*.js"],
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

module.exports = SwaggerConfig;
