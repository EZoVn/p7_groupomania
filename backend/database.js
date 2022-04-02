const mysql = require('mysql2');
/**Chargement du fichier .env */
require('dotenv').config();


// const connexion = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER_DB,
//     password: process.env.PASSWORD_DB,
//     database: process.env.DATABASE,
//     // ??? est-ce indispensable ???
//     port: process.env.PORT_DB
// });

// connexion.connect((error) => {
//     if (error) {
//         console.log(error.message);
//     }
//     console.log('Vous etes connecter à la base de donnée ' + process.env.DATABASE);
// });

// module.exports = connexion;

// test connexion avec sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE, process.env.USER_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
}
);

// synchronisation des models
sequelize.sync((err) => {
    console.log('Database Sync OK', err);
})

module.exports = sequelize;