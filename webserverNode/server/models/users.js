const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: 'this {VALUE} is invalid'
}

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is mandatory']
    },
    img: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} emil must be unique' });

module.exports = mongoose.model('user', userSchema);