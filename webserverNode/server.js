const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    let answ = {
        nombre: 'rabin',
        edad: 28,
        url: req.url
    };
    res.send(answ);
});

app.listen(3000, () => {
    console.log('Peticiones en el puerto 3000');
});