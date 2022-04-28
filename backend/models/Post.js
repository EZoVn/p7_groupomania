/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');

/**Définition du modèle Post */

module.exports = (sequelize) => {
    
    return Post = sequelize.define('Post', {
        id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
        user_id: { type: DataTypes.INTEGER(11), allowNull: false },
        message: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
        // usersLiked: { type: DataTypes.STRING(255), unique: true },
        // usersDisliked: { type: DataTypes.STRING(255), unique: true },
        // imgUrl: { type: DataTypes.STRING, name: DataTypes.STRING, data: DataTypes.BLOB, allowNull: true }
        imgUrl: { type: DataTypes.STRING, allowNull: true }
    });
};