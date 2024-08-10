const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads'); // Ensure the path is relative to your project root
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true }); // Create directory if it does not exist
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
    }
});

const upload = multer({ storage });

module.exports = upload;
