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

router.put('/signup', userCtrl.signup);
router.get('/',  userCtrl.allUsers);
// router.get('/:id', authCheck, userCtrl.oneUser);
router.get('/:id', userCtrl.oneUser);

router.delete('/:id',authCheck, userCtrl.deleteAccount);
router.patch('/:id',authCheck ,userCtrl.modifyAccount);



module.exports = router;