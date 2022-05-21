const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const pwd = require('../middleware/password-validator');
const authCheck = require('../middleware/auth');
const userCtrl = require('../controllers/user');

/**Middleware géneral ajout date */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cmd executer le : ', event.toString());
    next();
})

/**Créer un utilisateur
 * afficher tous les utilisateurs
 * afficher un utilisateur
 * supprimer un utilisateur
 * modifier un utilisateur
 */
router.post('/signup', pwd.passwordSchema, multer, userCtrl.signup);
router.get('/', userCtrl.allUsers);
router.get('/:id', authCheck, userCtrl.oneUser);
router.delete('/:id',multer ,authCheck, userCtrl.deleteAccount);
router.put('/:id',multer ,authCheck ,userCtrl.modifyAccount);

module.exports = router;