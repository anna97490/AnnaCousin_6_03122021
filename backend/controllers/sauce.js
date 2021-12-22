// Imports
const Sauce = require('../models/Sauce');
const fs = require('fs');
//const {likeSauce} = require('./sauces');

// Créer une sauce
exports.createSauce = (req, res, next) => {
    console.log('sauce');
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        userLiked: [],
        userDisliked: []
    });
    console.log(sauce);
    sauce.save()
        .then(() => res.status(201).json({ message : 'Post saved successfully!'}))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Récupérer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
};

// Modifier une sauce
exports.modifySauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];

        if(req.file) {
            fs.unlink(`images/${filename}`, () => {
            });
            const sauceObject = {
                ...JSON.parse(req.body.sauce), 
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            };
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce updated successfully!' }))
            .catch(error => res.status(400).json({ error }));
        } else {
            const sauceObject = {...req.body}
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce modified!' }))
            .catch(error => res.status(400).json({ error }));
        }
    });
    /*const sauceObject = req.file ?
    { 
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce updated successfully!' }))
        .catch(error => res.status(400).json({ error }));*/
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
           const filename = sauce.imageUrl.split('/images/')[1];
           fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Deleted !' }))
                .catch(error => res.status(400).json({ error }));
           });
        })
        .catch(error => res.status(500).json({ error }));     
};

// Like et Dislike des sauces
exports.likeSauce = (req, res, next) => {
    if (req.body.like == 1) { // Like
        Sauce.updateOne({ _id: req.params.id }, { $push: { like: req.body.userId}, $inc: { like: +1} })
            .then(() => res.status(200).json({ message: 'Sauce liked!'}))
            .catch(error => res.status(400).json({ error }));
    } else if (req.body.like == -1) { // Dislike
        Sauce.updateOne({ _id: req.params.id }, { $push: { dislike: req.body.userId}, $inc: { like: -1} })
            .then(() => res.status(200).json({ message: 'Sauce disliked!'}))
            .catch(error => res.status(400).json({ error }));
    } else { // Like ou Dislike retiré
        Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.like.includes(req.body.userId)) {
                Sauce.updateOne(( { _id:req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }))
                    .then(() => res.status(200).json({ message: 'Like deleted!' }))
                    .catch(error => res.status(400).json({ error }));
            } else if (sauce.dislike.includes(req.body.userId)) {
                Sauce.updateOne(( { _id:req.params.id },  { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }))
                .then(() => res.status(200).json({ message: 'Dislike deleted!' }))
                .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
    }
};

