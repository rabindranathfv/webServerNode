const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    priceUnit: {
        type: Number,
        required: [true, 'El precio únitario es necesario']
    },
    description: {
        type: String,
        required: false
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    /* categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' } */
});


module.exports = mongoose.model('products', productSchema);