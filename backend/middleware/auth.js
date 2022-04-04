const jwt = require('jsonwebtoken');

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

    const token = req.headers.authorization && extractBearer(req.headers.authorization);
    if (!token) {
        return res.status(401).json({ message: 'Le token n est pas bon' });
    }
    // Reste a ajouter une vérification id pour limiter les requetes par compte 
    jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
        console.log('decodedToken ', decodedToken);
        console.log(req.body);
        if (err) res.status(401).json({ message: 'Token incorrect !' });

        next();
    })
}