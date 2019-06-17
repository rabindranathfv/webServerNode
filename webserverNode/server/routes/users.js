const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.json('get Users');
});

app.post('/users', (req, res) => {
    let body = req.body;
    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'name is required'
        });
    } else {
        res.json({
            user: body
        });
    }
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

module.export = app;