const express = require('express');
const app = express();


/**Chargement du fichier .env */
require('dotenv').config();

const usersRoutes = require('./routes/user');

/**CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes API
app.use('/', usersRoutes);

module.exports = app;