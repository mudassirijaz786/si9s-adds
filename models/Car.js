const Joi = require('joi');
const mongoose = require('mongoose');
 
const Car = mongoose.model('Car', new mongoose.Schema({
    make: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    model: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    year: {
        type: Number,
        required: true,
        minlength: 4,
        maxlength: 4
    },
    number: {
        type: Number,
        required: true,
        minlength: 4,
        maxlength: 4
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    // timestamps: true

}));
 
function validateCar(car) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        model: Joi.string().min(5).max(50).required(),
        year: Joi.number().min(4).max(4).required(),
        number: Joi.number().min(4).max(4).required()

    };
    return Joi.validate(car, schema);
}
 
exports.Car = Car;
exports.validate = validateCar;