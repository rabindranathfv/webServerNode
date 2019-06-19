const express = require('express');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const saltRounds = 10;

const app = express();

app.get('/users', (req, res) => {

    UserModel.find({}).exec((err, usersLists) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'get list of users successfully',
            user: usersLists
        });
    });

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
    // _.pick grabs and object and return the same object with keys you defined into arrays as second parameter
    let body = _.pick(req.body, ['name', 'email', 'img', 'rol', 'state']);
    console.log('***** BODY From request ***********', body);
    // add context: query for update email into this validation
    UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
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