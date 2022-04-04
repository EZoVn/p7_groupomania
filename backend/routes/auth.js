const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Mauvais email ou mot de passe !' });
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            console.log(user);
            // Petit problème pour rentrer dans le if user est null mais renvoi le catch directement
            if (user === null) {
                console.log(user.password);
                return res.status(401).json({ message: 'Compte non trouvé !' });
            }
            bcrypt.compare(password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log(user);
                        return res.status(401).json({ message: 'Mot de passe incorrect' })
                    }
                    const token = jwt.sign({
                        id: user.id,
                        pseudo: user.pseudo,
                        email: user.email,
                    }, process.env.TOKEN,
                        { expiresIn: process.env.TOKEN_DURING });
                    return res.status(200).json({ access_token: token })
                })
                .catch(err => res.status(500).json({ message: 'Connexion echoué', error: err }));

        })
        .catch(err => {
            res.status(500).json({ message: 'Database Error', error: err })
        });
});

module.exports = router;