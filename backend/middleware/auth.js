const jwt = require('jsonwebtoken');
const DB = require('../database');

const extractBearer = authorization => {
    if (typeof authorization !== 'string') {
        return false;
    }
    const matches = authorization.match(/(bearer)\s+(\S+)/i);
    /**return bearer et le token
     * et matches[2] return uniquement le token
     */
    return matches && matches[2];
}

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization && extractBearer(req.headers.authorization);
        console.log(token);
        const verif = jwt.verify(token, process.env.TOKEN);
        let userId = parseInt(verif.id)
        req.body.user_id = null;
        console.log(verif);
        DB.User.findOne({ where: { id: userId } })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: 'requête non autorisée'
                    })
                } else {
                    req.body.user_id = user.id
                    req.body.isAdmin = user.isAdmin
                    next();
                }
            })
    } catch (error) {
        return res.status(401).json({message: 'la requête est invalide ou non autorisé !'});
    }
};