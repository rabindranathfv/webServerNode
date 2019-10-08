const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'the name is mandatory']
    },
    priceUnit: {
        type: Number,
        required: [true, 'the Unit price is mandatory']
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
    img: {
        type: String,
        required: false,
        default: null
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});


module.exports = mongoose.model('products', productSchema);