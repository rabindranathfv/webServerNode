const mongoose = require('mongoose');
const UserModel = require('./users');

mongoose.set('useFindAndModify', false);

let Schema = mongoose.Schema;

/* using schema type and make reference to an existing model you can combine
    with populate into queries responses for see that instance related into another instances
*/
let categorySchema = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('category', categorySchema);