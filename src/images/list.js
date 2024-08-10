const imageModel = require('../model/image');

// ---------------------------------------- LIST IMAGE ------------------------------------------------------- \\

module.exports.getUserImages = async (req, res) => {
    try {
        const userId = req.userId;
        const images = await imageModel.find({ userId }).populate('folderId');

        // Validate query parameter
        if (req.query.searchKey) {
            const images = await imageModel.find({
                userId,
                name: { $regex: req.query.searchKey, $options: 'i' } // Case-insensitive search
            }).populate('folderId');
            return res.status(200).send({ status: true, data: images });
        }

        return res.status(200).send({ status: true, data: images });
    } catch (err) {
        return res.status(400).send({ status: false, message: 'Something went wrong', error: err.message });
    }
};