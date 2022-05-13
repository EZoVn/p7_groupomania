// const { all } = require('../app');
const DB = require('../database');
const bcrypt = require('bcrypt');
const User = DB.User;



/**################################################################# */
/*************Afficher tous les utilisateurs**************************/
exports.allUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err })); //Ne pas transmettre les erreurs en production. Transmet trop d'informations
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
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
};

/**################################################################# */
/**************** Création de compte *********************************/
exports.signup = async (req, res) => {
    const { pseudo, email, password } = req.body;

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
    let userId = parseInt(req.params.id)
    const user_id = parseInt(req.body.user_id);
    const { pseudo, email, descriptionUser, password } = req.body;
    console.log(req.body.user_id);
    if (!userId) {
        return res.status(400).json({ message: `Erreur id` })
    }
    console.log('pseudo',pseudo);
    console.log('email',email);
    console.log('descriptionUser',descriptionUser);
    console.log('password',password);
    try {
        console.log('req.body ', req.body);
        let user = await User.findOne({ where: { id: userId }, raw: true });
        console.log('modify let user: ', user);
        if (user === null) {
            return res.status(404).json({ message: 'Utilisateur inéxistant !' })
        }
        console.log(req.body.pseudo);
        console.log('req.file', req.file);

        
        if (req.body.password && req.body.password != '') {
            console.log('why');
            let hash = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
            req.body.password = hash;
        }

        
            console.log('Il n y a pas de photo');
            // await User.update(req.body, { where: { id: userId }, individualHooks: true })
            await User.update(req.body, { where: { id: userId } })
            return res.status(200).json({ message: 'Compte mis à jour', data: user })
        


    } catch (error) {
        return res.status(500).json({ message: 'Database Error user', error: error })
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
        .catch(err => res.status(500).json({ message: 'Database Error', error: err })); //Supprimer error: err en production
};