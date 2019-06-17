require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users');

// parse applicattion /x-www/form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(userRoute);

mongoose.connect('mongodb://localhost:27017/coffe', (err, resp) => {
    if (err) console.log(err)
    console.log('DB Connection sucessfully');
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
})