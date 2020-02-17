const Joi = require('joi');
const mongoose = require('mongoose');
 
const Customer = mongoose.model('Customer', new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    phone: {
      type: Number,
      required: true,
    }


    // paymentMethod: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Payment'
    // },

    // timestamps: true
}));
 
function validateCustomer(customer) {
    const schema = {
        firstname: Joi.string().min(5).max(50).required(),
        lastname: Joi.string().min(5).max(50).required(),
        phone: Joi.required()
    };
    return Joi.validate(customer, schema);
}
 
exports.Customer = Customer;
exports.validate = validateCustomer;