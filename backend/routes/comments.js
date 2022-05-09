const express = require('express');
const commentsCtrl = require('../controllers/comments');

const authCheck = require('../middleware/auth');

const router = express.Router();
/**Créer un commentaire
 * afficher tous les commentaires d'un post
 * afficher un commentaire
 * supprimer un commentaire
 * modifier un commentaire
 */

router.post('/:post_id',authCheck, commentsCtrl.createComments);
router.get('/post/:post_id',authCheck, commentsCtrl.getAllCommentsPost);
router.get('/:id',authCheck, commentsCtrl.getOneComment);
router.delete('/:id',authCheck, commentsCtrl.deleteComment);
router.put('/:id',authCheck, commentsCtrl.modifyComment);

module.exports = router;