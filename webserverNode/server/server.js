require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse applicattion /x-www/form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

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

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})