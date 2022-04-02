/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');
// const sequelize = require('../database');
const DB = require('../database');

/**Définition du modèle User */
const User = DB.define('User', {
    id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
    pseudo: { type: DataTypes.STRING(90), defaultValue: '', allowNull: false },
    email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64$}/i }
},
{paranoid: true} //Soft delete mise en corbeille
);

module.exports = User;

// module.exports = (sequelize) => {

//     const User = sequelize.define('User', {
//         id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
//         pseudo: { type: DataTypes.STRING(90), defaultValue: '', allowNull: false },
//         email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
//         password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64$}/i }
//     },
//     {paranoid: true} //Soft delete mise en corbeille
//     );

//     return User;
// }