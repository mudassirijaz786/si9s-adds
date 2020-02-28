const Joi = require("joi");
const mongoose = require("mongoose");

const Video = mongoose.model(
  "Video",
  new mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    compaignName: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    url: {
      type: String
    }
  })
);

function validateVideo(video) {
  const schema = {
    description: Joi.string().required(),
    compaignName: Joi.string().required(),
    location: Joi.string().required()
  };
  return Joi.validate(video, schema);
}

exports.Video = Video;
exports.validate = validateVideo;
