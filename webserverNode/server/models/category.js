const mongoose = require('mongoose');
const UserModel = require('./users');

mongoose.set('useFindAndModify', false);

let Schema = mongoose.Schema;

let categorySchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'description is required']
    },
    user: {
        type: Object
    }
});

module.exports = mongoose.model('category', categorySchema);