const db = require('../database');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// const User = db.User;



// test
exports.allUsers = (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err })); //Ne pas transmettre les erreurs en production. Transmet trop d'informations
};


// afficher un utilisateur via son ID
exports.oneUser = (req, res) => {
    let userId = parseInt(req.params.id);
    if (!userId) {
        return res.status(400).json({ message: `Manque l'id` })
    }

    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if ((user === null)) {
                return res.status(404).json({ message: 'User introuvable' })
            }
            return res.status(200).json({ data: user });
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
};
// exports.oneUser = (req, res) => {
//     // const id = JSON.parse(req.body.users);
//     db.query(`SELECT * FROM users WHERE id = ?`, id, (err, results) => {
//         // !err ? res.json(results) : res.json(err);
//         if (err) throw err;
//         console.log(results);
//         res.send(results);
//     });
// };

/**************** Création de compte *********************/
exports.signup = (req, res) => {
    const { pseudo, email, password } = req.body;

    if (!email || !pseudo || !password) {
        return res.status(400).json({ message: 'Missing Data' })
    }
    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            //Vérif si email existe deja
            if (user !== null) {
                return res.status(409).json({ message: `Cette email ${email} est déjà existant !` });
            }
            // Hashage du mot de passe !
            bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
                .then(hash => {
                    req.body.password = hash;
                    // Création de l'utilisateur !
                    User.create(req.body)
                        .then(user => {
                            res.status(201).json({ message: 'Utilisateur crée', data: user })
                        })
                        .catch(err => res.status(500).json({ message: 'Database Erri' }));
                })
                .catch(err => res.status(500).json({ message: 'Database Error' }));
        })
        .catch(err => res.status(500).json({ message: 'Database Erro' }));
};

// exports.signup = (req, res) => {
//     db.query(`SELECT email FROM users`, (err, results) => {
//         console.log(results);
//         if (err) console.Console(err);
//         // condition pour envoyer une erreur en cas de doublon email
//         if (results.length > 0) {
//             return res.status(400).send({ message: 'That email is already in use' })
//         } else if (password !== passwordConfirm) {
//             return res.status(401).send({ message: 'Password do not match...' });
//         }
//         bcrypt.hash(password, 10)
//             .then(hash => {
//                 const user = new User({
//                     email: mail,
//                     password: hash
//                 });
//                 console.log(user);
//                 console.log(user.password);
//                 db.query(`INSERT INTO users (email, password) VALUE ('${user.email}', '${user.password}')`, (err, results) => {
//                     // gestion des erreurs exemple email deja utilisé
//                     if (err) throw err;
//                     console.log(results);
//                     res.send('Account created');
//                 });
//             })
//             .catch(error => res.status(500).json({ error }));

//     });
// };


// Connexion avec mail et mdp
// exports.login = (req, res, next) => {
//     db.query(
//         `SELECT email FROM Users WHERE email = ${mail} AND password = ${password}`,
//         (err, results) => {
//             if (err) res.status(401).send({ err: err });
//             if (results > 0) {
//                 return res.render('register', { message: 'That email is already in use' })
//             }
//             res.send({ message: 'Wrong email/password' });
//         });
//     console.log(User);
// };


// Modifier compte user
exports.modifyAccount = (req, res) => {
    let userId = parseInt(req.params.id)
    if (!userId) {
        return res.status(400).json({ message: `Erreur id` })
    }
    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {

            if (user === null) {
                return res.status(404).json({ message: 'Utilisateur inéxistant !' })
            }
            console.log(req.body);
            console.log(user);
            if (user == 0) return res.json({ message: 'Aucune modification apporté' });
            // Le mot de passe est toujours different etant donner qu'il compare un hash a un clean
            if (user.password !== req.body.password) {
                console.log('mdp changes');
                bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
                    .then(hash => {
                        req.body.password = hash;
                        User.update(req.body, { where: { id: userId } })
                            .then(user => {

                                res.status(200).json({ message: 'Compte mis à jour', data: user })
                            })
                            .catch(err => res.status(500).json({ message: 'Database Error' }));
                    })
                    .catch(err => res.status(500).json({ message: 'Database Error' }));
            }
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};
// exports.modifyEmail = (req, res, next) => {
//     let id = 5;
//     let newMail = 'zyxwvutsr@email.com';
//     db.query(`UPDATE users SET email = '${newMail}' WHERE id = ${id}`, (err, results) => {
//         if (err) throw err;
//         console.log(results);
//         // res.send(results);
//     });
//     res.status(200);
// };

// supprimer un compte
exports.deleteAccount = (req, res) => {
    let userId = parseInt(req.params.id)
    if (!userId) {
        return res.status(400).json({ message: `Erreur id` })
    }
    User.destroy({ where: { id: userId }, force: true })
        .then(() => res.status(204).json({ message: 'Compte supprimé avec succès !' }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err })); //Supprimer error: err en production
};