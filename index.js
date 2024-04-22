const express = require('express');
const SQLpool = require('./config/db');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use('/api/v1/employees', require('./routers/employeeRoutes'));

// Test route
app.get("/test", (req, res) => {
    res.status(200).send("<h1>Hello World</h1>")
});

// Database connection check
SQLpool.query('SELECT 1')
    .then(() => {
        console.log('Database connected');
        // Start server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });
