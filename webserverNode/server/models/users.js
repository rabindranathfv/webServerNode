const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        required: false,
        default: null
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

// define with fields i want to return, i am protecting info users
userSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
}


// use plugin
userSchema.plugin(uniqueValidator, { message: '{PATH} emil must be unique' });

module.exports = mongoose.model('user', userSchema);