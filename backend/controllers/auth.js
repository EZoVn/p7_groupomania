const jwt = require('jsonwebtoken');
const DB = require('../database');
const User = DB.User;

exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Mauvais email ou mot de passe !' });
    }
    try {
        let user = await User.findOne({ where: { email: email }, raw: true });
        if (user === null) {
            return res.status(401).json({ message: `Ce compte n'existe pas !` });
        }
        let valid = await User.checkPassword(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
        }, process.env.TOKEN,
            { expiresIn: process.env.TOKEN_DURING });
        return res.status(200).json({ access_token: token, user_id: user.id })
    } catch (error) {
        if (error.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Database Error' });
        }
        res.status(400).json({ message: 'Connexion echoué' });
    }
};