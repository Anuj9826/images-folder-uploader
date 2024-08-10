const userModel = require('../model/user');
const tokenModel = require('../model/token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validation = require('../validator/validation');

// ---------------------------------------- LOGIN USER ------------------------------------------------------- \\

module.exports.loginUser = async (req, res) => {
    try {
        let body = req.body;

        // Check request body
        if (!validation.isValidRequest(body)) return res.status(400).send({ status: false, message: 'Please provide email or password' });

        // Check required fields
        const requiredFields = validation.checkRequiredFields(['email', 'password'], body);
        if (requiredFields !== true) return res.status(400).send({ status: false, message: `${requiredFields.charAt(0).toUpperCase() + requiredFields.slice(1)} is required` });

        // Check if user exists
        let user = await userModel.findOne({ email: body.email }).select(['email', 'password']);
        if (!user) return res.status(400).send({ status: false, message: 'User does not exist' });

        // Compare password
        if (!(bcrypt.compare(body.password, user.password))) return res.status(401).send({ status: false, message: 'Invalid login credentials' });

        // Check for existing active token
        const existingToken = await tokenModel.findOne({ userId: user._id });

        if (existingToken) {
            // If an existing token is found, check if it's still valid
            if (new Date() < existingToken.expiresAt) {
                return res.status(400).send({ status: false, message: 'You is already logged in' });
            }

            // Optionally update the existing token's expiration time
            existingToken.expiresAt = new Date(Date.now() + 3600000);
            await existingToken.save();

            // Return existing token
            return res.status(200).send({ status: true, message: 'User login successful', data: { userId: user._id, token: existingToken.token } });
        }

        // Generate new token
        let token = jwt.sign({ userId: user._id.toString(), iat: Math.floor(Date.now() / 1000) },
            process.env.SUPERSECRET,
            { expiresIn: '1h' }
        );

        // Save new token in the database
        await tokenModel.create({
            userId: user._id,
            token: token,
            expiresAt: new Date(Date.now() + 3600000)
        });
        return res.status(200).send({ status: true, message: 'User login successful', data: { userId: user._id, token: token } });
    } catch (err) {
        return res.status(400).send({ status: false, message: 'Something went wrong', error: err.message });
    }
};
