const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 0,
        maxlength: 30,
        trim: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, role: this.role}, config.get('jwtPrivateKey'));
    return token
}
userSchema.methods.logout = function(){
    const token = "";
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = ({
        name: Joi.string().min(4).max(30).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        role: Joi.string().required()
    })
    return Joi.validate(user, schema)
}
exports.User= User;
exports.validate = validateUser;