const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const authCheck = require('../middleware/auth');
const userCtrl = require('../controllers/user');


/**Middleware géneral ajout date */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cmd executer le : ', event.toString());
    next();
})

router.get('/', userCtrl.allUsers);
router.post('/signup',multer, userCtrl.signup);
router.get('/:id', authCheck, userCtrl.oneUser);

router.delete('/:id',multer ,authCheck, userCtrl.deleteAccount);
router.put('/:id',multer ,authCheck ,userCtrl.modifyAccount);



module.exports = router;