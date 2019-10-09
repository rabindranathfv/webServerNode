const express = require('express');

let { checkToken } = require('../middleware/auth');

let app = express();

const CategoryModel = require('../models/category');
const UserModel = require('../models/users');
const ProductModel = require('../models/products');


/* 
    get all productos, use populate, pagination
*/
app.get('/products', checkToken, (req, res) => {
    console.log(` get All products `);
    ProductModel.find({})
        .populate('user', 'name email rol')
        .populate('category', 'description')
        .exec((err, productList) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `problems with get all products`,
                    err
                });
            }
            ProductModel.countDocuments((err, numProducts) => {
                res.json({
                    ok: true,
                    messaage: 'get all list of products',
                    ammountProducts: numProducts,
                    products: productList

                });
            })
        });
});


/* 
    get productos by id, use populate
*/
app.get('/products/:id', checkToken, (req, res) => {
    console.log(` get products by id `);
    let productId = req.params.id;
    let body = req.body
    ProductModel.findByIdAndUpdate(productId, body, { new: true, runValidators: true, useFindAndModify: 'false' })
        .populate('user', 'name email rol')
        .populate('category', 'description')
        .exec((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `problems with products by Id, can not save into db`,
                    err
                });
            }
            res.json({
                ok: true,
                messaage: `the product ${productId} was updated suucessfully`,
                product: productDB
            });
        });
});


/* 
    Search products by term
*/
app.get('/products/search/:searchTerm', checkToken, (req, res) => {
    let term = req.params.searchTerm;
    console.log(`buscando el termino ${term}`);

    ProductModel.find({ name: { "$regex": term, "$options": "i" } })
        .populate('product', 'name')
        .exec((err, productDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: `problems with search products by name`,
                    err
                });
            }
            res.json({
                ok: true,
                message: `coincidences of ${term}`,
                products: productDB
            });

        });

});

/* 
    create product, save user, save category
*/
app.post('/products', checkToken, (req, res) => {
    console.log(` create product `);
    let user = req.user;
    let body = req.body;
    let product = new ProductModel({
        name: body.name,
        priceUnit: body.priceUnit,
        description: body.description,
        available: body.available,
        category: body.category,
        user: user._id
    });

    product.save((err, productDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: `problems with create products`,
                err
            });
        }
        if (!productDB) {
            return res.status(400).json({
                ok: false,
                message: `problems with create products, can not save into db`,
                err
            });
        }
        res.json({
            ok: true,
            message: 'product created sucessfully',
            product: productDB
        });
    });
});

/* 
    Update product
*/
app.put('/products/:id', checkToken, (req, res) => {
    console.log(` update a products `);
    let productId = req.params.id;
    let body = req.body;
    ProductModel.findByIdAndUpdate(productId, body, { new: true, runValidators: true, useFindAndModify: 'false' }, (err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with get product by id`,
                err
            });
        }
        res.json({
            ok: true,
            message: `Update ${productDB._id} product by Id`,
            product: productDB
        });
    });
});

/* 
    delete product, soft delete with available pass to false
*/
app.delete('/products/:id', checkToken, (req, res) => {
    console.log(` delte product by id `);
    let productId = req.params.id;

    CategoryModel.findByIdAndRemove(productId, (err, productDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `problems with hard delete products`,
                err
            });
        }
        res.json({
            ok: true,
            message: `product ${productId} delete sucessfully`,
            productId: productId
        });
    });
});


module.exports = app;