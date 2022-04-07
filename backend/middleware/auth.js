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
    // Vérifier la validité du token
    // jwt.verify(token, process.env.TOKEN, (err, decodedToken) => {
    //     if(err){
    //         return res.status(401).json({message: 'Bad token'})
    //     }

    //     next()
    // })
    try {
        const verif = jwt.verify(token, process.env.TOKEN);
        console.log(verif);
        console.log('id body:', req.body.user_id);
        console.log('id token :', verif.id);
        let user_id = parseInt(req.body.user_id)
        let userId = parseInt(verif.id)
        if (user_id && user_id !== userId) {
            // if (req.body.id !== verif.id) {

            console.log('bad params');
            throw 'User ID non valable !';
        }

        console.log('next');
        next();
    } catch (err) {
        res.status(401).json({ error: err, message: "Requête non authentifiée !" });

    }

};