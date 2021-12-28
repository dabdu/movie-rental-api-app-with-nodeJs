const config = require('config')
const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const auth = require('../middleware/auth');

router.post('/', async(req, res) =>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password');

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isValidPassword) return res.status(400).send('Invalid Email or Password');

    const token = user.generateAuthToken();
    res.send(token)
});


function validate(Inputs){
    const schema = ({
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return Joi.validate(Inputs, schema);
}
module.exports = router;