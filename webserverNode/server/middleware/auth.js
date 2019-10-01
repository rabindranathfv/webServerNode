const jwt = require('jsonwebtoken');
// check token
let checkToken = (req, res, next) => {
    let authToken = req.get('Authorization');

    jwt.verify(authToken, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        console.log(decoded);
        req.user = decoded.user;
        next();
    })
}

module.exports = {
    checkToken
}