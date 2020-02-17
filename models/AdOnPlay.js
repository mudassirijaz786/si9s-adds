const Joi = require('joi');
const mongoose = require('mongoose');
 
const AdOnPlay = mongoose.model('AdOnPlay', new mongoose.Schema({
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area'
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    // timestamps: true

    //server logs
    //updated
}));
 
function validateAdOnPlay(adOnPlay) {
    const schema = {
      start: Joi.Date().required(),
      end: Joi.Date().required()
    };
    return Joi.validate(adOnPlay, schema);
}
 
exports.AdOnPlay = AdOnPlay;
exports.validate = validateAdOnPlay;