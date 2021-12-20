require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Accès à la base de données 
mongoose.connect(process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
    const app = express();
    const normalizePort = val => {
        const port = parseInt(val, 10);
}

// Headers de l'objet réponse
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Accès au corps de la req
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrer les routes
app.use('/api/sauces', sauceRoutes);
app.use('api/auth', userRoutes);

module.exports = app;