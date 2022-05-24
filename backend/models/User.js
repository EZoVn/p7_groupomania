/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

/**Définition du modèle User */
module.exports = (sequelize) => {
    const User = sequelize.define('Users', {
        id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
        pseudo: { type: DataTypes.STRING(90), defaultValue: '', allowNull: false },
        email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
        password: { type: DataTypes.STRING(128), is: /^[0-9a-f]{64$}/i },
        imgUser:{type: DataTypes.STRING, defaultValue: 'http://localhost:8080/images/_photoProfilBase.png'},
        descriptionUser: {type: DataTypes.STRING(255),defaultValue: '', allowNull: false},
        isAdmin: {type: DataTypes.BOOLEAN,allowNull: true, defaultValue: false}
    });
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel);
    };   
    // Hooks
    User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash;
    });
    return User;
};