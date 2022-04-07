const express = require('express');
const auth = require('../controllers/auth');

const router = express.Router();

/**Middleware géneral ajout date */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cmd executer le : ', event.toString());
    next();
})

router.post('/login', auth.login);

module.exports = router;