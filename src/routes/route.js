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

router.get('/images', authentication, getUserImages); // Fetch User Images and Seaching is Perform also in there pass the searchKey in query ?searchKey=imagename

// ---------------------------------------- DEFAULT ROUTES -------------------------------------------------------- \\

router.all('/*', (req, res) => { return res.status(404).send({ status: false, message: 'Page Not Found' }) }); // Validating the endpoint

module.exports = router;