const mongoose = require('mongoose')
// var jwt = require('jsonwebtoken');

const RegisterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },    
    email: {
        type: String,
        required: true,
    },    
    username: {
        type: String,
        required: true,
    },    
    password: {
        type: String,
        required: true,
    },  
});

const RegisterModel = mongoose.model("Register", RegisterSchema);
module.exports = RegisterModel;