const Joi = require('joi');
const mongoose = require('mongoose');
 
const Notification = mongoose.model('Notification', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    // timestamps: true
}));
 
function validateNotification(notification) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
    };
    return Joi.validate(notification, schema);
}
 
exports.Notification = Notification;
exports.validate = validateNotification;