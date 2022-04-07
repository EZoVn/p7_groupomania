const DB = require('../database');
// const Post = DB.Post;
// const User = DB.User;
const fs = require('fs');

// Crée un post avec une image ou sans image
exports.createPost = async (req, res, next) => {
    const { user_id, message, imgUrl } = req.body;
    if (!user_id || !message) {
        return res.status(404).json({ message: 'Aucun message, data manquante. Un des parametres nest pas rempli' });
    }
    // essai possible avec un url image mais pas encore essayer avec un fichier
    // if (imgUrl !== null) {
    //     console.log(imgUrl);
    //     imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    //     console.log(imgUrl);
    //     next();
    // }

    try {

        let post = await DB.Post.create(req.body);
        return res.status(201).json({ message: 'Message crées avec succès !!', data: post })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Modifier un message
exports.modifyPost = async (req, res, next) => {
    try {
        let postId = parseInt(req.params.id)
        let post = await DB.Post.findOne({ where: { id: postId }, raw: true })
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
    DB.Post.destroy({ where: { id: postId }, force: true })
        .then(() => res.status(200).json({ message: 'Message supprimé avec succès !' }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err })); //Supprimer error: err en production
};

// Afficher tous les posts d'un utilisateur non terminé !!!!
exports.getAllPostUser = (req, res, next) => {
    let user_id = parseInt(req.params.user_id);
    console.log(user_id);
    if (!user_id) {
        return res.status(404).json({ message: `Cette utilisateur n'a pas de post` })
    }
    DB.Post.findAll({ where: { user_id: user_id } })
        .then(posts => {
            res.json({ data: posts })
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};

// Afficher un post grace a son ID
exports.getOnePost = async (req, res, next) => {
    let postId = parseInt(req.params.id);
    if (!postId) return res.status(400).json({ message: 'Post non trouvé' });

    try {
        let post = await DB.Post.findOne({ where: { id: postId }, raw: true, include: { model: DB.User, attributes: ['id', 'pseudo', 'email'] }, });
        if (post === null) return res.status(404).json({ message: `Le message n'existe pas` })

        return res.status(200).json({ data: post })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Afficher tous les posts sur le forum
exports.getAllPost = (req, res, next) => {
    DB.Post.findAll()
        .then(post => res.json({ data: post }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};