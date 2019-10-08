const express = require('express');
const fileUpload = require('express-fileupload');
const { checkToken } = require('../middleware/auth');

// models
const UserModel = require('../models/users');
const ProductModel = require('../models/products');

const path = require('path');
const fs = require('fs');

const app = express();

// upload files
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:type/:id', checkToken, (req, res) => {
    let type = req.params.type;
    let id = req.params.id;
    console.log('upload files', type, id);
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'no field upload'
            }
        });
    }

    /* validate type of entity for save into DB */
    let validTypes = ['user', 'product'];

    if (validTypes.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: `the types allowed are ${validTypes.join(', ')}`,
                type: `${type}`
            }
        });
    }

    /* validate if the id exist */


    let sampleFile = req.files.sampleFile;
    let nameFileSplited = sampleFile.name.split('.');
    let extensionFile = nameFileSplited[nameFileSplited.length - 1];

    console.log(`se proceso ${nameFileSplited} y su extension es ${extensionFile}`);

    /* validate type by extension */
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

    let nameSaveFile = `${id}-${type}-${ new Date().getMilliseconds() }.${extensionFile}`

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(`uploads/${type}/${nameSaveFile}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        uploadImgUser(id, res, nameSaveFile, type);
        /* res.json({
            ok: true,
            message: 'File uploaded!',
            fileUpload: sampleFile.name
        }); */
    });
});

function uploadImgUser(id, res, nameF, type) {

    UserModel.findById(id, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: `user ${id} doesn't exist`
                }
            });
        }

        deleteFile(userDB.img, type)

        userDB.img = nameF;
        userDB.save((err, userDBSave) => {
            res.json({
                ok: true,
                message: `user ${id} is updated sucessfully`,
                user: userDBSave
            });
        });
    });

}

function uploadImgProduct() {

}

function deleteFile(imgName, type) {
    let pathImg = path.resolve(__dirname, `./../../uploads/${type}/${imgName}`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

module.exports = app;