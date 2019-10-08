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
    let nameFileSplited = sampleFile.name.split('.');
    let extensionFile = nameFileSplited[nameFileSplited.length - 1];

    console.log(`se proceso ${nameFileSplited} y su extension es ${extensionFile}`);

    let validateImgFiles = ['png', 'jpg', 'gif', 'jepg'];

    if (validateImgFiles.indexOf(extensionFile) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `the validates extensitions are ${validateImgFiles.join(', ')}, please upload in the correct format`,
                extension: `your file extension is ${extensionFile}`
            }
        });
    }

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`uploads/${sampleFile.name}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: 'File uploaded!',
            fileUpload: sampleFile.name
        });
    });
});


module.exports = app;