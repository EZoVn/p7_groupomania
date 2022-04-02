const express = require('express');
const router = express.Router();


const User = require('../models/User');


const userCtrl = require('../controllers/user');


// const DB = require('../database');
// const User = DB.Users;


router.get('/', userCtrl.allUsers);
router.get('/:id', userCtrl.oneUser);
router.put('/signup', userCtrl.signup);

router.delete('/:id', userCtrl.deleteAccount);

router.patch('/:id', (req, res) => {
    let userId = parseInt(req.params.id)
    if (!userId) {
        return res.status(400).json({ message: `Erreur id` })
    }
    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {

            console.log(userId);
            console.log(user);
            console.log(req.body);
            if (user === NULL) {
                return res.status(404).json({ message: 'Utilisateur inéxistant !' })
            }
// ne rentre pas dans le User.update 
            User.update(req.body, { where: { id: userId } })
                .then(user => { res.status(200).json({ message: 'Compte mis à jour', data: user }) })
                .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
});


// router.put('/signup', userCtrl.signup);
// router.post('/login', userCtrl.login);

module.exports = router;