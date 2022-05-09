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

router.get('/', userCtrl.allUsers);
router.post('/signup', userCtrl.signup);
router.get('/:id', authCheck, userCtrl.oneUser);

router.delete('/:id',authCheck, userCtrl.deleteAccount);
router.put('/:id',authCheck ,userCtrl.modifyAccount);



module.exports = router;