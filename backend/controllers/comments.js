const DB = require('../database');

/**Créer un commentaire */
exports.createComments = async (req, res, next) => {
    const { comment, user_id } = req.body;
    const post_id = parseInt(req.params.post_id);
    console.log('user_id', user_id);

    if (!user_id || !comment) {
        return res.status(404).json({ Message: 'Aucun commentaire data manquante' });
    }

    try {
        console.log('req.body:', req.body);
        console.log('req.body:', comment);
        console.log('req.params:', req.params.post_id);
        console.log('req.params:', post_id);
        console.log('req.user:', user_id);
        let com = await DB.Comments.create({ comment, post_id, user_id });
        return res.status(201).json({ Message: 'Commentaire envoyer avec succès', data: com });
    } catch (err) {
        return res.status(500).json({ message: 'Error Data!', error: err });
    }
};

/**Afficher tous les commentaires d'un post */
exports.getAllCommentsPost = (req, res, next) => {
    let postId = parseInt(req.params.post_id)
    console.log(postId);
    if (!postId) return res.status(404).json({ message: `Post non trouvé` });
    console.log(postId);
    DB.Comments.findAll({ where: { post_id: postId }, include: { model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] } })
        .then(coms => res.json({ data: coms }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};

/**Afficher un commentaire */
exports.getOneComment = async (req, res, next) => {
    let comId = parseInt(req.params.id);
    try {
        comId = await DB.Comments.findOne({ where: { id: comId }, raw: true, include: { model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] } })
        if (!comId) return res.status(404).json({ message: `Commentaire non trouvé` });
        return res.status(200).json({ data: comId })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
};

/**Modifier un commentaire */
exports.modifyComment = async (req, res, next) => {
    try {
        let comId = parseInt(req.params.id);
        let comment = await DB.Comments.findOne({ where: { id: comId }, raw: true });
        if (comment === null) {
            return res.status(404).json({ message: `Le commentaire ${comId} est inexistant !` })
        }
        
        const user_id = req.body.user_id

        if (comment.user_id === user_id) {

            await DB.Comments.update(req.body, { where: { id: comId } })
            return res.status(200).json({ message: 'Commentaire modifié !' });
        } else {
            return res.status(403).json({ message: 'Non authentifié' });
        }

    } catch (err) {
        return res.status(500).json({ message: 'Databasee Error' })
    }
};

/**Supprimer un commentaire */
exports.deleteComment = async (req, res, next) => {
    let comId = parseInt(req.params.id)
    if (!comId) {
        return res.status(404).json({ message: `ID non connu` })
    }
    try {
        const comment = await DB.Comments.findOne({ where: { id: comId } })
        console.log('comment.user_id', comment.user_id);
        console.log(comment.user_id);

        const user_id = req.body.user_id
        console.log('user_id', user_id);
        // comparer comId avec l'id du token req.body.user_id
        if (comment.user_id === user_id) {
            const del = await DB.Comments.destroy({ where: { id: comId }, force: true })
            return res.status(204).json({ message: 'Commentaire supprimé !', del })
        } else {
            return res.status(403).json({ message: 'Non authentifié' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Database Error' });
    }



};