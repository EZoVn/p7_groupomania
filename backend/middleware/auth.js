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
    console.log('req.headers.authorization : ', req.headers.authorization);
    const token = req.headers.authorization && extractBearer(req.headers.authorization);
    console.log('req.body : ', req.body);
    console.log('Token : ', token);


    const verif = jwt.verify(token, process.env.TOKEN);
    // console.log('verif', verif);
    let userId = parseInt(verif.id)
    console.log('userId', userId);
    DB.User.findOne({ where: { id: userId } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'requête non autorisée'
                })
            } else {
                req.body.user_id = user.id
                console.log(req.body.user_id);
                console.log('req.user.id', user.id);
                console.log('fin des log auth');
                next();
            }
        })
};