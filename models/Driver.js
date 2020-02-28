const Joi = require("joi");
const mongoose = require("mongoose");

const Driver = mongoose.model(
  "Driver",
  new mongoose.Schema({
    fullname: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
      // unique: true
    }
    // timestamps: true
  })
);

function validateDriver(driver) {
  const schema = {
    fullname: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .required()
      .email(),
    phone: Joi.string().required()
  };
  return Joi.validate(driver, schema);
}

exports.Driver = Driver;
exports.validate = validateDriver;
