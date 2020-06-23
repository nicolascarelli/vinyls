const Joi = require("joi")

function validate(vinyl) {
  const schema = {
    title: Joi.string().required(),
    band: Joi.string().required(),
    album: Joi.string().required(),
  };

  return Joi.validate(vinyl, schema);
}

module.exports = validate;
