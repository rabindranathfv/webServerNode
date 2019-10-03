const mongoose = require('mongoose');
const UserModel = require('./users');

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    user: {
        type: UserModel,
        required: [false]
    }
});

module.exports = mongoose.model('category', categorySchema);