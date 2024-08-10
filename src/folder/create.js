const folderModel = require('../model/folder');
const validation = require('../validator/validation');

// ---------------------------------------- CREATE FOLDER ------------------------------------------------------- \\

module.exports.createFolder = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const userId = req.userId; // Assuming userId is available from authentication middleware

        // Check if request body is provided
        if (!validation.isValidRequest(req.body)) {
            return res.status(400).send({ status: false, message: 'Please provide folder name' });
        }

        // Validate input for folder name
        if (!name) return res.status(400).send({ status: false, message: 'Folder name is required' });
        if (name.length > 100) return res.status(400).send({ status: false, message: 'Folder name should be less than 100 characters' });

        // Check if folder with the same name already exists in the specified parent directory
        const existingFolder = await folderModel.findOne({ name, parent, userId });
        if (existingFolder) {
            return res.status(400).send({ status: false, message: 'Folder with this name already exists in the specified directory' });
        }

        // Create and save folder to the database using create
        const createFolder = await folderModel.create({
            name,
            parent: parent || null,
            userId
        });

        // Respond with success message
        return res.status(200).send({ status: true, message: 'Folder created successfully', data: createFolder });
    } catch (err) {
        return res.status(400).send({ status: false, message: 'Something went wrong', error: err.message });
    }
};
