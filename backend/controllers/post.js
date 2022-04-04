const Post = require('../models/Post');

// Crée un post avec une image ou sans image
exports.createPost = async (req, res, next) => {
    const { user_id, message, imgUrl } = req.body;
    if (!user_id || !message) {
        return res.status(404).json({ message: 'Aucun message, data manquante. Un des parametres nest pas rempli' });
    }
    // Manque la gestion des images 
    try {
        // let post = await Post.findOne({ where: { user_Id: user_id }, raw: true })
        // if (post === null) {
        //     return res.status(409).json({ message: `Le message ${user_Id} exist déjà !` })
        // }
        post = await Post.create(req.body);
        return res.status(201).json({ message: 'Message crées avec succès !!', data: post })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Modifier un message
exports.modifyPost = async (req, res, next) => {
    try {
        let postId = parseInt(req.params.id)
        let post = await Post.findOne({ where: { id: postId }, raw: true })
        if (post === null) {
            return res.status(404).json({ message: `Le message ${postId} est inexistant !` })
        }
        await Post.update(req.body, { where: { id: postId } });
        return res.status(200).json({ message: 'Message modifié avec succès !!' })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Supprimer un message
exports.deletePost = (req, res, next) => {
    let postId = parseInt(req.params.id)
    if (!postId) {
        return res.status(404).json({ message: `ID non connu` })
    }
    Post.destroy({ where: { id: postId }, force: true })
        .then(() => res.status(200).json({ message: 'Message supprimé avec succès !' }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err })); //Supprimer error: err en production
};

// Afficher tous les posts d'un utilisateur
exports.getAllPostUser = async (req, res, next) => {
    let user_id = parseInt(req.params.user_id);
};

// Afficher un post grace a son ID
exports.getOnePost = async (req, res, next) => {
    let postId = parseInt(req.params.id);
    if (!postId) return res.status(400).json({ message: 'Post non trouvé' });

    try {
        let post = await Post.findOne({ where: { id: postId }, raw: true });
        if (post === null) return res.status(404).json({ message: `Le message n'existe pas` })

        return res.status(200).json({ data: post, message: 'Message trouvé avec succès !' })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Afficher tous les posts sur le forum
exports.getAllPost = (req, res, next) => {
    Post.findAll()
        .then(post => res.json({ data: post }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};