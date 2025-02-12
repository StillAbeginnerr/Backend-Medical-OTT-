// Description: Main entry point for the application. This file is responsible for starting the server, loading environment variables, connecting to the database, and defining routes.
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// Routes
const authRoutes = require("./routes/auth");
const mediaRoutes = require("./routes/media");
const subscriptionRoutes = require("./routes/subscription");
// Database Connection
const pool = require("./database/connection");
// Swagger
const { swaggerUi, swaggerSpec } = require("./swagger");

// Initialize Express App
const app = express();
app.use(express.json());

// Serve Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Initialize Express App


// Routes
app.use('/api/', authRoutes);
app.use('/api/', mediaRoutes);
app.use('/api/', subscriptionRoutes);

// CORS
app.use(cors({
    origin: '*',
}));

// Load environment variables
dotenv.config();


// Connect to Database
if(pool){
    console.log("Connected to the database");
}

console.log("Swagger Docs available at: http://localhost:3000/api-docs");

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

// Start Server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});