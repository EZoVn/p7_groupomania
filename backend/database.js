const { Sequelize } = require('sequelize');
/**Chargement du fichier .env */
require('dotenv').config();


// test connexion avec sequelize

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

/**Mise en palce des relations entre les tables 
 * je ramene mes models dans ce fichier
 * a chaque model j'envoi sequelize ligne 8
*/
const db = {};

db.sequelize = sequelize;
db.User = require('./models/User')(sequelize);
db.Post = require('./models/Post')(sequelize);
db.Comments = require('./models/Comments')(sequelize);

/**User peu avoir plusieurs Post 
 * foreignKey choisit le champ dedié pour la clé de liaison
 * onDelete sur User supprime les posts en cas de suppression du compte
*/

db.User.hasMany(db.Post, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Post.belongsTo(db.User, { foreignKey: 'user_id' });

db.Post.hasMany(db.Comments, { foreignKey: 'post_id', onDelete: 'cascade' });
db.Comments.belongsTo(db.Post, { foreignKey: 'post_id' });

db.User.hasMany(db.Comments, { foreignKey: 'user_id', onDelete: 'cascade' });
db.Comments.belongsTo(db.User, { foreignKey: 'user_id' });

db.sequelize.sync({ alter: true })

module.exports = db;