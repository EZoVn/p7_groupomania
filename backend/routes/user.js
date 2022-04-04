const express = require('express');
const router = express.Router();

const authCheck = require('../middleware/auth');

const userCtrl = require('../controllers/user');


/**Middleware géneral ajout date */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cmd executer le : ', event.toString());
    next();
})

router.get('/', authCheck, userCtrl.allUsers);
router.get('/:id', authCheck, userCtrl.oneUser);
router.put('/signup', userCtrl.signup);

router.delete('/:id', userCtrl.deleteAccount);

router.patch('/:id',authCheck ,userCtrl.modifyAccount);



module.exports = router;