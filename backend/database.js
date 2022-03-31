const mysql = require('mysql');
/**Chargement du fichier .env */
require('dotenv').config();


const connexion = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
    port: process.env.PORT_DB
});
connexion.connect((error) => {
    if (error) {
        console.log(error.message);
    }
    console.log('Vous etes connecter à la base de donnée ' + process.env.DATABASE);
});

module.exports = connexion;