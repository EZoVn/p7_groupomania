const DB = require('../database');

/**Créer un commentaire */
exports.createComments = async (req, res, next) => {
    const { user_id, comment, post_id } = req.body;

    if (!user_id || !comment) {
        return res.status(404).json({ Message: 'Aucun commentaire data manquante' });
    }

    try {
        console.log(req.body);
        let comment = await DB.Comments.create(req.body);
        return res.status(201).json({ Message: 'Commentaire envoyer avec succès', data: comment });
    } catch (err) {
        return res.status(500).json({ message: 'Error Data !', error: err });
    }
};

/**Afficher tous les commentaires d'un post */
exports.getAllCommentsPost = (req, res, next) => {
    let postId = parseInt(req.params.post_id)
    console.log(postId);
    if (!postId) return res.status(404).json({ message: `Post non trouvé` });
    console.log(postId);
    DB.Comments.findAll({ where: { post_id: postId } })
        .then(coms => res.json({ data: coms }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};

/**Afficher un commentaire */
exports.getOneComment = async (req, res, next) => {
    let comId = parseInt(req.params.id);
    try {
        comId = await DB.Comments.findOne({ where: { id: comId }, raw: true })
        if (!comId) return res.status(404).json({ message: `Commentaire non trouvé` });
        return res.status(200).json({ data: comId })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
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
        await DB.Comments.update(req.body, { where: { id: comId } })
        return res.status(200).json({message:'Commentaire modifié !'});

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

/**Supprimer un commentaire */
exports.deleteComment = (req, res, next) => {
    let comId = parseInt(req.params.id)
    if (!comId) {
        return res.status(404).json({ message: `ID non connu` })
    }
    DB.Comments.destroy({ where: { id: comId }, force: true })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};