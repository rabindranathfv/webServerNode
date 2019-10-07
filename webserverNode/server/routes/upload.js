const express = require('express');
const fileUpload = require('express-fileupload');
const { checkToken } = require('../middleware/auth');

const app = express();


// upload files
app.use(fileUpload({ useTempFiles: true }));

app.post('/upload', (req, res) => {
    console.log('upload files');
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no field upload'
            }
        });
    }
    let sampleFile = req.files.sampleFile;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv('uploads/filename.jpg', (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'File uploaded!'
        });
    });
});


module.exports = app;