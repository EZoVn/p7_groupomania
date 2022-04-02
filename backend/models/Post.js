/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');
const DB = require('../database');

/**Définition du modèle User */
const Post = DB.define('User', {
    id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
    user_id: { type: DataTypes.INTEGER(11), allowNull: false },
    message: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
    usersLiked: { type: DataTypes.STRING(255), unique: true },
    usersLiked: { type: DataTypes.STRING(255), unique: true },
    imgUrl: { type: DataTypes.STRING(255), allowNull: false }
},
    { paranoid: true } //Soft delete mise en corbeille
);

module.exports = Post;
