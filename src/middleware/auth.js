
const jwt = require('jsonwebtoken');
const { isValidId } = require('../validator/validation');
const userModel = require('../model/user');
const tokenModel = require('../model/token');
require('dotenv').config();

// ************************ Authentication *********************** //

module.exports.authentication = async (req, res, next) => {
    let token;
    try {
        // Extract token from Authorization header
        token = req.headers.authorization;

        // If no token is found
        if (!token) return res.status(401).send({ success: false, message: 'No token provided' });

        // Extract the token from "Bearer <token>"
        token = token.split(' ')[1];

        // Check if the token exists in the database
        const tokenDoc = await tokenModel.findOne({ token });

        if (!tokenDoc) return res.status(401).send({ status: false, message: 'Invalid or expired token' });

        // Verify the token
        const decodedToken = jwt.verify(token, process.env.SUPERSECRET);
        req.userId = decodedToken.userId;

        // Proceed to next middleware or route handler
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError' && token) {
            await tokenModel.deleteOne({ token });
            return res.status(401).send({ status: false, message: 'Session expired. Please log in again.' });
        }
        return res.status(400).send({ status: false, message: 'Something went wrong', error: err.message });
    }
};
