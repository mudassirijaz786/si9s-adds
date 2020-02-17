const Joi = require('joi');
const mongoose = require('mongoose');
 
const Payment = mongoose.model('Payment', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    },
    // timestamps: true
}));
 
function validatePayment(payment) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };
    return Joi.validate(payment, schema);
}
 
exports.Payment = Payment;
exports.validate = validatePayment;