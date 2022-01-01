// Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Modèle User
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

// Export
module.exports = mongoose.model('User', userSchema);
