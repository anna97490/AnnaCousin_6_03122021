// Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

// Modèle User
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

// Export
module.exports = mongoose.model('User', userSchema);
