const express = require('express');
const app = express();

const path = require('path');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentsRouter = require('./routes/comments');
const authCheck = require("./middleware/auth");
/**Chargement du fichier .env */
require('dotenv').config();

/**Routes */
const usersRoutes = require('./routes/user');



/**CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**Route images */
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes API
app.use('/auth', authRouter);
// app.use('/users', authCheck, usersRoutes);
app.use('/users', usersRoutes);
app.use('/post', postRouter);
app.use('/comments', commentsRouter);

module.exports = app;