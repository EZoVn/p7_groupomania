/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');

/**Définition du modèle Post */

module.exports = (sequelize) => {
    
    return Post = sequelize.define('Post', {
        id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
        user_id: { type: DataTypes.INTEGER(11), allowNull: false },
        message: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
        imgUrl: { type: DataTypes.STRING, allowNull: true }
    });
};