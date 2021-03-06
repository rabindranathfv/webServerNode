const express = require('express');
const UserModel = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { checkToken, checkAdMinRole } = require('../middleware/auth');
const saltRounds = 10;

const app = express();

app.get('/users', checkToken, (req, res) => {

    // route /users?limit=<value>&start=<value>
    console.log(` get All Users `);
    console.log(` QueryParams `, req.query);
    let start = req.query.start || 0;
    start = Number(start);
    let limit = req.query.limit || 15;
    limit = Number(limit);

    // the find condition and count condition must be the same for count in the right way
    UserModel.find({ state: true }, 'name email rol')
        .skip(start)
        .limit(limit)
        .exec((err, usersLists) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `not users exist`,
                    err
                });
            }
            UserModel.countDocuments({ state: true }, (err, numUsers) => {
                res.json({
                    ok: true,
                    message: 'get list of users successfully',
                    amountUsers: numUsers,
                    user: usersLists
                });
            });
        });

});

app.get('/users/:id', checkToken, (req, res) => {
    let userId = req.params.id;
    let body = req.body;
    console.log(`get user with id ${userId}`);
    UserModel.findByIdAndUpdate(userId, body, { new: true, runValidators: true, useFindAndModify: 'false' })
        .exec((err, userDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `the user doesn't exist`,
                    err
                });
            }
            res.json({
                ok: true,
                message: `the user exist`,
                user: userDB
            });
        });

});

app.post('/users', [checkToken, checkAdMinRole], (req, res) => {
    let body = req.body;
    console.log(` POST Create Users `);
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
                message: `problems with users creation, db troubles`,
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

app.put('/users/password', checkToken, (req, res) => {
    let body = req.body;
    let userId = body.id;
    let cleanBody = _.pick(body, ['password']);
    // _.pick grabs and object and return the same object with keys you defined into arrays as second parameter
    cleanBody.password = bcrypt.hashSync(body.newPassword, saltRounds);

    UserModel.findByIdAndUpdate(userId, cleanBody, { new: true, runValidators: true, context: 'query', useFindAndModify: 'false' }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problem with users updated by Id`,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Update user password sucessfully',
        });
    });

});

app.put('/users/:id', [checkToken, checkAdMinRole], (req, res) => {
    console.log(` Update user By ID Users `);
    console.log(`Los params son `, req.params);
    let id = req.params.id;
    // _.pick grabs and object and return the same object with keys you defined into arrays as second parameter
    let body = _.pick(req.body, ['name', 'email', 'img', 'rol', 'state']);
    console.log('***** BODY From request ***********', body);
    // add context: query for update email into this validation
    UserModel.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query', useFindAndModify: 'false' }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problem with users updated by Id`,
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

/* hard delete */
app.delete('/users/:id', [checkToken, checkAdMinRole], (req, res) => {
    console.log(` Delete Users - hard delete `);
    let idUser = req.params.id;

    UserModel.findByIdAndRemove(idUser, (err, userDelete) => {
        console.log('*** User ****', userDelete);
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with users hard delete`,
                err
            });
        }
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exist'
                }
            });
        }
        res.json({
            ok: true,
            message: 'user delete sucessfully',
            user: userDelete
        });
    });
});

/* soft delete */
app.delete('/users/2/:id', checkToken, (req, res) => {
    console.log(` delete User - soft delete `);
    let idUser = req.params.id;
    req.body.state = false;
    let body = _.pick(req.body, ['state']);

    UserModel.findByIdAndUpdate(idUser, body, { new: true, runValidators: true, context: 'query' }, (err, userDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with users soft delete`,
                err
            });
        }

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User does not exist'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Update user sucessfully',
            user: userDelete
        });
    });
});

module.exports = app;