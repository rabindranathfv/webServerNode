const express = require('express');
const UserModel = require('../models/users');

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
        password: body.password,
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
        res.status(200).json({
            ok: true,
            msg: 'create users sucessfully',
            user: userDB
        });
    });

});

app.put('/users/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    res.json({
        id
    });
});

app.delete('/users', (req, res) => {
    res.json('delete Users');
});

module.exports = app;