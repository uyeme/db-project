const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database user
    process.env.DB_PASSWORD, // Database password
    {
        host: process.env.DB_HOST, // Database host
        port: process.env.DB_PORT, // Database port
        dialect: process.env.DB_DIALECT, // Database dialect (e.g., 'mysql', 'postgres')
        logging: false // Disable Sequelize query logging
    }
);

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to MySQL database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize; // Export Sequelize instance for use in your app
