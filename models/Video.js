const Joi = require('joi');
const mongoose = require('mongoose');
 
const Video = mongoose.model('Video', new mongoose.Schema({
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
    area: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area'
    }],
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification'
    },
    // timestamps: true
}));
 
function validateVideo(video) {
    const schema = {
        price: Joi.date().min(5).max(50).required(),
        url: Joi.string().required()
    };
    return Joi.validate(video, schema);
}
 
exports.Video = Video;
exports.validate = validateVideo;