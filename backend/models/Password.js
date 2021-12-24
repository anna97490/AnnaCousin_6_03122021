//Import
const passwordValidator = require('password-validator');

// Création du schéma
const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                   
.is().max(70)                                  
.has().uppercase(1)                              
.has().lowercase()                              
.has().digits(1)                                
.has().not().spaces() 

// Export
module.exports = passwordSchema;