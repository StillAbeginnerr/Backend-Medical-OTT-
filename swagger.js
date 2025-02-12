const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clinikk TV API",
            version: "1.0.0",
            description: "API documentation for the Clinikk TV backend service",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            }
        ],
    },
    apis: ["./routes/*.js"], // Automatically scan all route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };