const express = require('express');
const router = express.Router();
const { registerUser } = require('../user/register');
const { loginUser } = require('../user/login');
const { logoutUser } = require('../user/logout');
const { authentication } = require('../middleware/auth');
const { createFolder } = require('../folder/create');
const { listFolder } = require('../folder/list');
const { uploadImage } = require('../images/upload');
const { getUserImages } = require('../images/list');
const upload = require('../middleware/upload');

// ---------------------------- USER ROUTES ------------------------------------------------------------------- //

router.post('/user/register', registerUser); // Register User

router.post('/user/login', loginUser); // Login User

router.post('/user/logout', authentication, logoutUser); // Logout User

// ---------------------------------------- FOLDER ROUTES ------------------------------------------------------- \\

router.post('/folders', authentication, createFolder); // Create Folder

router.get('/folders', authentication, listFolder); // Fetch User Folders

// ---------------------------------------- IMAGE ROUTES -------------------------------------------------------- \\

router.post('/images', authentication, upload.single('image'), uploadImage); // Upload Image

router.get('/images', authentication, getUserImages); // Fetch User Images and Searching is Perform also in there pass the searchKey in query ?searchKey=imagename

// ---------------------------------------- DEFAULT ROUTES -------------------------------------------------------- \\

// Serve a simple "Hi" message when accessing the root URL

router.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f0f0f0;
                    color: #333;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .message {
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="message">
                    Hi! Welcome to our API service.
                </div>
            </div>
        </body>
        </html>
    `);
});

// Handle 404 for any other routes
router.all('/*', (req, res) => {
    res.status(404).send({ status: false, message: 'Page Not Found' });
});

module.exports = router;