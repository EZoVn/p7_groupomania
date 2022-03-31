const express = require('express');
const router = express.Router();

// router.post('/signup');

const user = require('../controllers/user');


router.get('/getAllUsers', user.AllUsers);
router.get('/getAllUsers/:id', user.OneUser);
router.post('/signup', user.signup);

module.exports = router;