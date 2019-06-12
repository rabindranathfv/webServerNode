const http = require('http');
const axios = require('axios');

http.createServer((req, resp) => {
    resp.writeHead(200, { 'Content-Type': 'application/json' });
    let answ = {
        nombre: 'rabin',
        edad: 28,
        url: req.url
    };
    resp.write(answ.nombre);
    resp.end();
}).listen(8080);