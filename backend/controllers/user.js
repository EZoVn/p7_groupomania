// const { all } = require('../app');
const DB = require('../database');
const bcrypt = require('bcrypt');
const User = DB.User;
const fs = require('fs');


/**################################################################# */
/*************Afficher tous les utilisateurs**************************/
exports.allUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Database Error' })); //Ne pas transmettre les erreurs en production. Transmet trop d'informations
};

/**################################################################# */
/************* Afficher un utilisateur avec son ID *******************/
exports.oneUser = (req, res) => {
    let userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ message: `Manque l'id` })
    }

    User.findOne({ where: { id: userId }, attributes: ['id', 'pseudo', 'email', 'imgUser', 'descriptionUser'], raw: true })
        .then(user => {
            if ((user === null)) {
                return res.status(404).json({ message: 'User introuvable' })
            }
            return res.status(200).json({ data: user });
        })
        .catch(err => res.status(500).json({ message: 'Database Error'}));
};

/**################################################################# */
/**************** Création de compte *********************************/
exports.signup = async (req, res) => {
    const { pseudo, email, password, isAdmin } = req.body;

    if (!email || !pseudo || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }

    try {
        let user = await User.findOne({ where: { email: email }, raw: true });
        if (user !== null) {
            return res.status(409).json({ message: `Cette email ${email} est déjà existant !` });
        }

        let createUser = await User.create(req.body);

        return res.status(201).json({ message: 'Utilisateur crée', data: createUser });

    } catch (error) {
        if (error.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Database Error' })
        }
        res.status(500).json({ message: 'Error hash' });
    }
}

/**################################################################# */
/************************ Modifier compte user************************/
exports.modifyAccount = async (req, res) => {
    console.log('req.file ', req.file);
    let userId = parseInt(req.params.id)
    const { pseudo, email, descriptionUser, password } = req.body;
    if (!userId) {
        return res.status(400).json({ message: `Erreur id` })
    }
    try {
        let user = await User.findOne({ where: { id: userId }, raw: true });
        console.log('modify let user: ', user);
        if (user === null) {
            return res.status(404).json({ message: 'Utilisateur inéxistant !' })
        }

        if (req.body.password && req.body.password != '') {
            let hash = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
            req.body.password = hash;
        }

        if (req.file) {
            if (user.imgUser != 'http://localhost:8080/images/_photoProfilBase.png') {
                const ancienneImage = user.imgUser.split(/images/)[1];
                console.log(ancienneImage);
                fs.unlink(`./images/${ancienneImage}`, (err => {
                    console.log('ici');
                    if (err) console.log(err);
                    else {
                        console.log("Ancienne image effacé " + ancienneImage);
                    }
                }))
            }
            let imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            await User.update({ imgUser: imgUrl }, { where: { id: userId } });
            return res.status(200).json({ message: 'Message modifié avec succès !!' })

        }
        else if (!req.file) {
            await User.update(req.body, { where: { id: userId } });
            return res.status(200).json({ message: 'Message modifié avec succès !!' })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Database Error user'})
    }
}



/**################################################################# */
/***********************supprimer un compte***************************/
exports.deleteAccount = (req, res) => {
    let userId = parseInt(req.params.id)
    if (!userId) {
        return res.status(400).json({ message: `Erreur id` })
    }
    User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({ message: 'Compte supprimé avec succès !' }))
        .catch(err => res.status(500).json({ message: 'Database Error' })); 
};