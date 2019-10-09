const express = require('express');

let { checkToken, checkAdMinRole } = require('../middleware/auth');

let app = express();

const CategoryModel = require('../models/category');
const UserModel = require('../models/users');

/* all categorys */
app.get('/category', checkToken, (req, res) => {
    console.log(` get All categories `);
    CategoryModel.find({})
        .sort('description')
        .populate('user', 'name email rol')
        .exec((err, categoryList) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `problems with get all category`,
                    err
                });
            }
            CategoryModel.countDocuments((err, numCategories) => {
                res.json({
                    ok: true,
                    message: 'get all list of category',
                    amountCategories: numCategories,
                    categories: categoryList
                });
            })
        });
});

/* show category by ID */
app.get('/category/:id', checkToken, (req, res) => {
    console.log(` get category by Id `);
    let categoryId = req.params.id;
    let body = req.body;

    CategoryModel.findByIdAndUpdate(categoryId, body, { new: true, runValidators: true, useFindAndModify: 'false' }, (err, categoryDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: `problems with category by Id, category doesn't exist`,
                err
            });
        }
        res.json({
            ok: true,
            message: 'category updated sucessfully',
            category: categoryDB
        });
    });
});

/* create category */
app.post('/category', checkToken, (req, res) => {
    console.log(` Create category `);
    let body = req.body;
    let user = req.user;
    console.log(user, body);
    let category = new CategoryModel({
        description: body.description,
        user: user._id
    });

    console.log(category);
    category.save((err, categDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: `problems with category create`,
                err
            });
        }
        if (!categDB) {
            return res.status(400).json({
                ok: false,
                message: `can not create category in db`,
                err
            });
        }
        res.json({
            ok: true,
            message: 'Category create sucessfully',
            category: categDB
        });
    });

});

/* update category by id */
app.put('/category/:id', checkToken, (req, res) => {
    console.log(` update category by id `);
    let categoryId = req.params.id;
    let body = req.body;
    CategoryModel.findByIdAndUpdate(categoryId, body, { new: true, runValidators: true, useFindAndModify: 'false' }, (err, categoryDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with users hard delete`,
                err
            });
        }
        res.json({
            ok: true,
            message: `Update ${categoryDB._id} category by Id`,
            category: categoryDB
        });
    });

});

/* just admin role can deleted */
/* delete category */
app.delete('/category/:id', [checkToken, checkAdMinRole], (req, res) => {
    console.log(` delete category by Id`);
    let categoryId = req.params.id;

    CategoryModel.findByIdAndRemove(categoryId, (err, categoryDelete) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with category delete`,
                err
            });
        }
        res.json({
            ok: true,
            message: `category ${categoryId} delete sucessfully`,
            categoryId: categoryId
        });
    });
});


module.exports = app;