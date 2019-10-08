const express = require('express');
const { checkToken } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/image/:type/:img', checkToken, (req, res) => {
    let type = req.params.type;
    let img = req.params.img;
    let pathImg = `./uploads/${type}/${img}`;
    let noPathImg = path.resolve(__dirname, '../assets/no-image.jpg');

    res.sendFile(noPathImg);
});


module.exports = app;