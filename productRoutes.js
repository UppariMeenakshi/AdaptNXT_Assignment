const express = require('express');
const router = express.Router();

// Check this line:
const { getProducts } = require('../controllers/productController');

// Route:
router.get('/', getProducts); // This line expects getProducts to be defined

module.exports = router;