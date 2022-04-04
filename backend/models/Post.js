/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');
const DB = require('../database');

/**Définition du modèle User */
const Post = DB.define('post', {
    id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
    user_id: { type: DataTypes.INTEGER(11), allowNull: false },
    message: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
    usersLiked: { type: DataTypes.STRING(255), unique: true },
    usersDisliked: { type: DataTypes.STRING(255), unique: true },
    imgUrl: { type: DataTypes.STRING(255), allowNull: true }
},
    { paranoid: true } //Soft delete mise en corbeille
);

module.exports = Post;