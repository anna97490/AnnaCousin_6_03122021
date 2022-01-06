// Imports
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
// donne acces au chemin de notre systeme de fichier
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

// Connexion à la base de données
mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Sécurisation des en-têtes HTTP
app.use(helmet());

// Ajout des headers à l'objet réponse
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
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
