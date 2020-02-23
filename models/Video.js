const Joi = require('joi');
const mongoose = require('mongoose');
 
const Video = mongoose.model('Video', new mongoose.Schema({
    url: {
      type: String,
      required: true
    }

}));
 
function validateVideo(video) {
    const schema = {
        url: Joi.string().required(),
    };
    return Joi.validate(video, schema);
}
 
exports.Video = Video;
exports.validate = validateVideo;