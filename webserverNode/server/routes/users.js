const express = require('express');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

app.get('/users', (req, res) => {
    res.json('get Users');
});

app.post('/users', (req, res) => {
    let body = req.body;

    console.log('***** Body data *****', req.body);

    let user = new UserModel({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, saltRounds),
        rol: body.rol
    });

    console.log('***** User model instance *****', user);

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'create users sucessfully',
            user: userDB
        });
    });

});

app.put('/users/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;
    console.log('***** BODY From request ***********', body);
    UserModel.findByIdAndUpdate(id, body, { new: true }, (err, userDB) => {
        if (err) {
            return req.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Update user sucessfully',
            user: userDB
        });
    });

});

app.delete('/users', (req, res) => {
    res.json('delete Users');
});

module.exports = app;