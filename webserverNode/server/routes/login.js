const express = require('express');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    UserModel.findOne({ email: body.email }, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario! o contraseña incorrecta'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario o contraseña! incorrecta'
                }
            });
        }

        res.json({
            ok: true,
            message: 'User Loggin sucess',
            user: userDB,
            token: '123'
        });
    });
});

module.exports = app;