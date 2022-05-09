const express = require('express');
const postCtrl = require('../controllers/post');

/**Middlewares */
const authCheck = require('../middleware/auth');
const multer = require('../middleware/multer-config');

/**Router */
const router = express.Router();

/**Middleware géneral ajout date */
router.use((req, res, next) => {
    const event = new Date()
    console.log('Cmd executer le : ', event.toString());
    next();
})
/**afficher tous les posts
 * afficher un post
 * afficher les post d'un utilisateur
 * créer un post
 * supprimer un post 
 * modifier un post 
 */

router.get('/',authCheck, postCtrl.getAllPost);
router.get('/:id',authCheck, postCtrl.getOnePost);
router.get('/postUser/:user_id',authCheck, postCtrl.getAllPostUser);
router.post('/', authCheck, multer, postCtrl.createPost);
router.delete('/:id', authCheck, multer, postCtrl.deletePost);
router.put('/:id', authCheck, multer, postCtrl.modifyPost);

module.exports = router;