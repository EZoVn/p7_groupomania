/**Import des modules nécessaires */
const { DataTypes } = require('sequelize');

const bcrypt = require('bcrypt');


/**Définition du modèle User */
module.exports = (sequelize) => {

    const User = sequelize.define('Users', {
        id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
        pseudo: { type: DataTypes.STRING(90), defaultValue: '', allowNull: false },
        email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
        password: { type: DataTypes.STRING(128), is: /^[0-9a-f]{64$}/i }
    },
    {paranoid: true} //Soft delete mise en corbeille
    );

    User.beforeCreate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash;
    });
    
    User.checkPassword = async (password, originel) => {
        return await bcrypt.compare(password, originel);
    };
    
    User.beforeUpdate( async (user, options) => {
        let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        user.password = hash;
        return hash;
    });

    return User;
};



// const User = DB.define('User', {
//     id: { type: DataTypes.INTEGER(11), primaryKey: true, autoIncrement: true, },
//     pseudo: { type: DataTypes.STRING(90), defaultValue: '', allowNull: false },
//     email: { type: DataTypes.STRING, unique: true, validate: { isEmail: true } },
//     password: { type: DataTypes.STRING(64), is: /^[0-9a-f]{64$}/i }
// },
//     { paranoid: true } //Soft delete mise en corbeille
// );

// User.beforeCreate( async (user, options) => {
//     let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
//     user.password = hash;
// });

// User.checkPassword = async (password, originel) => {
//     return await bcrypt.compare(password, originel);
// };

// User.beforeUpdate( async (user, options) => {
//     let hash = await bcrypt.hash(user.password, parseInt(process.env.BCRYPT_SALT_ROUND))
//     user.password = hash;
//     return hash;
// });



