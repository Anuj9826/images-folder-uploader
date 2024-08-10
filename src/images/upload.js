const imageModel = require('../model/image');
const validation = require('../validator/validation');

// ---------------------------------------- UPLOAD IMAGE ------------------------------------------------------- \\
module.exports.uploadImage = async (req, res) => {
    try {
        const { name, folderId } = req.body;
        const userId = req.userId;
        const imagePath = req.file.path;

        // Check if request body is provided
        if (!validation.isValidRequest(req.body)) {
            return res.status(400).send({ status: false, message: 'Please provide image data' });
        }

        // Validate input for image name
        if (!name) return res.status(400).send({ status: false, message: 'Image name is required' });
        if (name.length > 100) return res.status(400).send({ status: false, message: 'Image name should be less than 100 characters' });

        // Create and save image to the database
        const createImage = await imageModel.create({
            name,
            path: imagePath,
            folderId: folderId || null,
            userId
        });

        return res.status(201).send({ status: true, message: 'Image uploaded successfully', data: createImage });
    } catch (err) {
        return res.status(400).send({ status: false, message: 'Something went wrong', error: err.message });
    }
};
