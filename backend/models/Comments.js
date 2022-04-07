/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');

/**Définition du modèle Commentary */
module.exports = (sequelize) => {

    return Comments = sequelize.define('Comments', {
        id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
        user_id: { type: DataTypes.INTEGER(11), allowNull: false },
        comment: { type: DataTypes.TEXT, defaultValue: '', allowNull: false },
        post_id: {type: DataTypes.INTEGER(10), allowNull: false}
    });
};