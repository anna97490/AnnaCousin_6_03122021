// Imports
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


// Accès à la base de données 
mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
    
const app = express();

// Sécurisation des en-têtes HTTP
app.use(helmet());

// Headers de l'objet réponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Accès au corps de la req
app.use(express.json());

// Mongo-Sanitize contre les injections
app.use(mongoSanitize());

// Les images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrer les routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Export
module.exports = app;