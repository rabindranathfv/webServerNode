const jwt = require('jsonwebtoken');
// check token
let checkToken = (req, res, next) => {
    let authToken = req.get('Authorization');

    jwt.verify(authToken, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: '401 UnAuthorized - user without token'
                }
            });
        }
        req.user = decoded.user;
        next();
    })
}

let checkTokenUrl = (req, res, next) => {
    let authToken = req.query.token;

    jwt.verify(authToken, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: '401 UnAuthorized - user without token'
                }
            });
        }
        req.user = decoded.user;
        next();
    })
}

let checkAdMinRole = (req, res, next) => {

    let user = req.user;
    console.log(' middleware checkAdminRole', user);

    if (user.rol === 'ADMIN_ROLE') {
        console.log(`this ${user.name} is Admin`);
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'this user is not admin'
            }
        });
    }
}

module.exports = {
    checkToken,
    checkAdMinRole,
    checkTokenUrl
}