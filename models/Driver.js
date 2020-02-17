const Joi = require('joi');
const mongoose = require('mongoose');
 
const Driver = mongoose.model('Driver', new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    phone: {
      type: String,
      required: true
    }
    // timestamps: true
}));
 
function validateDriver(driver) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
    };
    return Joi.validate(driver, schema);
}
 
exports.Driver = Driver;
exports.validate = validateDriver;