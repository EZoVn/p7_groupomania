const express = require('express');
const commentsCtrl = require('../controllers/comments');

const authCheck = require('../middleware/auth');

const router = express.Router();

router.put('/:post_id/:user_id',authCheck, commentsCtrl.createComments);
router.get('/post/:post_id', commentsCtrl.getAllCommentsPost);
router.get('/:id', commentsCtrl.getOneComment);
router.delete('/:id',authCheck, commentsCtrl.deleteComment);
router.patch('/:id',authCheck, commentsCtrl.modifyComment);

module.exports = router;