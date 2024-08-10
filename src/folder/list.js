const folderModel = require('../model/folder');
const validation = require('../validator/validation');

// ---------------------------------------- LIST FOLDER ------------------------------------------------------- \\

module.exports.listFolder = async (req, res) => {
    try {
        const userId = req.userId;
        const folder = await folderModel.find({ userId }).populate('parent');
        if (!folder.length) return res.status(200).send({ status: true, data: [] });
        return res.status(200).send({ status: false, data: folder });
    } catch(err) {
        return res.status(400).send({ status: false, message: err.message });
    }
}