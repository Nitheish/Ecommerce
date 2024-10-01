// routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct ,getProductById} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',protect, getProducts);
router.post('/',protect, addProduct);
router.get('/:id', getProductById); 
module.exports = router;
