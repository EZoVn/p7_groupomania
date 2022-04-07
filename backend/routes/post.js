const express = require('express');
const postCtrl = require('../controllers/post');

const authCheck = require('../middleware/auth');

const router = express.Router();

/**Middleware géneral ajout date */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cmd executer le : ', event.toString());
    next();
})

router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.getOnePost);
router.get('/postUser/:user_id', postCtrl.getAllPostUser);
router.put('/',authCheck, postCtrl.createPost);
router.delete('/:id',authCheck, postCtrl.deletePost);
router.patch('/:id',authCheck, postCtrl.modifyPost);

module.exports = router;