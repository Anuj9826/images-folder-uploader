const tokenModel = require('../model/token');

// ---------------------------------------- LOGOUT USER ------------------------------------------------------- \\

module.exports.logoutUser = async (req, res) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) return res.status(400).send({ status: false, message: 'No token provided' });

        await tokenModel.deleteOne({ token: token });

        return res.status(200).send({ status: true, message: 'User logged out successfully' });
    } catch (err) {
        return res.status(400).send({ status: false, message: 'Something went wrong', error: err.message });
    }
};
