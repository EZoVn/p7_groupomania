const DB = require('../database');

const fs = require('fs');
// const { post } = require('../app');

// Crée un post avec une image ou sans image
exports.createPost = async (req, res, next) => {
    const { user_id, message } = req.body;
    console.log('req.body :', req.body);
    console.log('req.file :', req.file);

    if (!user_id) {
        return res.status(404).json({ message: 'Aucun message, data manquante. Un des parametres nest pas rempli' });
    }

    try {
        if (req.file) {
            let imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

            let post = await DB.Post.create({ user_id: user_id, message: message, imgUrl: imgUrl });
            return res.status(201).json({ message: 'Message crées avec succès !!', data: post })
        }
        if (!req.file) {
            console.log('interdit');
            let post = await DB.Post.create({ user_id: user_id, message: message });
            return res.status(201).json({ message: 'Message sans image crées avec succès !!', data: post })
        }

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

/**  Modifier un Post 
 * Cherche le post dans la base de donnée
 * s'il ne le trouve pas return err 404
 * s'il y a une photo j'efface l'ancienne et ajoute la nouvelle ensuite put
 * s'il n'y a pas de photo, modifie uniquement le message
 * pas authorisé return 403
*/
exports.modifyPost = async (req, res, next) => {

    try {
        let postId = parseInt(req.params.id)
        const user_id = parseInt(req.body.user_id);

        let post = await DB.Post.findOne({ where: { id: postId }, raw: true })
        if (post === null) {
            return res.status(404).json({ message: `Le message ${postId} est inexistant !` })
        }

        if (post.user_id === user_id) {
            if (req.file) {
                const ancienneImage = post.imgUrl.split(/images/)[1];
                fs.unlink(`./images/${ancienneImage}`, (err => {
                    if (err) console.log(err);
                    else {
                        console.log("Ancienne image effacé " + ancienneImage);
                    }
                }))

                let imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                await Post.update({ user_id, message: req.body.message, imgUrl }, { where: { id: postId } });
                return res.status(200).json({ message: 'Message modifié avec succès !!' })
            }
            if (!req.file) {
                console.log('No req.file');
                await Post.update(req.body, { where: { id: postId } });
                return res.status(200).json({ message: 'Message modifié avec succès !!' })
            }

        } else {
            return res.status(403).json({ message: 'Non authentifié' });
        }

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Supprimer un message
exports.deletePost = async (req, res, next) => {
    let postId = parseInt(req.params.id)
    if (!postId) {
        return res.status(404).json({ message: `ID non connu` })
    }

    const user_id = req.body.user_id
    console.log('user_id', user_id);

    const post = await DB.Post.findOne({ where: { id: postId } })
    console.log(post.user_id);

    if (post.user_id === user_id) {

        const file = post.dataValues.imgUrl;
        if (file) {
            const filename = file.split('/images/')[1];
            await fs.unlink(`./images/${filename}`, () => {
                DB.Post.destroy({ where: { id: postId }, force: true })
                return res.status(200).json({ message: 'Message supprimé avec succès !' })
            });
        } else {
            DB.Post.destroy({ where: { id: postId }, force: true })
            return res.status(200).json({ message: 'Message supprimé avec succès !' })
        }
    } else {
        return res.status(403).json({ message: 'Non authentifié' });
    }


};

// Afficher tous les posts d'un utilisateur non terminé !!!!
exports.getAllPostUser = (req, res, next) => {
    let user_id = parseInt(req.params.user_id);
    console.log(user_id);
    if (!user_id) {
        return res.status(404).json({ message: `Cette utilisateur n'a pas de post` })
    }
    DB.Post.findAll({ where: { user_id: user_id }, include: [{ model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] }, { model: DB.Comments, include: { model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] } }] })
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
        // let post = await DB.Post.findOne({ where: { id: postId }, raw: true, include: { model: DB.User, attributes: ['id', 'pseudo', 'email'] }, });
        let post = await DB.Post.findOne({ where: { id: postId }, raw: true, include: [{ model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] }, { model: DB.Comments }] });
        if (post === null) return res.status(404).json({ message: `Le message n'existe pas` })

        return res.status(200).json({ data: post })

    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
};

// Afficher tous les posts sur le forum
exports.getAllPost = (req, res, next) => {
    DB.Post.findAll({ include: [{ model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] }, { model: DB.Comments, include: { model: DB.User, attributes: ['id', 'pseudo', 'email', 'imgUser'] } }] })
        .then(post => res.json({ data: post }))
        .catch(err => res.status(500).json({ message: 'Database Error' }));
};