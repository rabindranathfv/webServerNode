const express = require('express');
const app = express();

app.get('/users', function(req, res) {
    res.json('get Users');
});

app.post('/users', function(req, res) {
    res.json('post Users');
});

app.put('/users', function(req, res) {
    res.json('put Users');
});

app.delete('/users', function(req, res) {
    res.json('delete Users');
});

app.listen(3000, () => {
    console.log(`Escuchando en el puerto 3000`);
})