const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on('connect', () => {
    console.log('Connected to the database');
}
);

pool.on('error', (err) => {
    console.error('Error connecting to the database', err);
    process.exit(-1);
});

module.exports = pool;

//Notes on the code above:
// The connection.js file is responsible for creating a connection to the database.
// It uses the pg module to create a connection pool and exports it for use in other parts of the application.
// The pool is configured with the database connection details from the environment variables loaded by dotenv.
// The pool also logs a message when it successfully connects to the database.
// This file is imported in the db.js file to establish a connection to the database.