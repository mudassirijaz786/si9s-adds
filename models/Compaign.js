const Joi = require('joi');
const mongoose = require('mongoose');
 
const Compaign = mongoose.model('Compaign', new mongoose.Schema({
    price: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area'
    },
    numberOfCars: {
        type: Number,
        required: true
    },
    // payment: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Payment'
    // },

    // notification: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Notification'
    // },
    
    // timestamps: true
}));
 
function validateCompaign(compaign) {
    const schema = {
        price: Joi.number().required(),
        url: Joi.string().required(),
        startDate: Joi.date().required(),     
        endDate: Joi.string().required(),
        numberOfCars: Joi.number().required()
    };
    return Joi.validate(compaign, schema);
}
 
exports.Compaign = Compaign;
exports.validate = validateCompaign;