// Imports
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
       const userId = decodedToken.userId;
       if (req.body.userId && req.body.userId !== userId) {
           throw 403;
       } else {
           next();
       }
    } catch (error) {
        if (error == 403) {
            res.status(403).json({ error: new Error('Unauthorized request!') });
        } else {
            res.status(401).json({ error: new Error('Invalid Request!') });
        }     
    }
};