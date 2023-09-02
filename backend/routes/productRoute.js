const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
} = require('../controllers/productController');

const { upload } = require('../utils/fileUpload');

router.route("/")
    .post(protect, upload.single("image"), createProduct)
    .get(protect, getProducts);
router.route('/:id')
    .get(protect, getProduct)
    .delete(protect, deleteProduct)
    .patch(protect, upload.single(("image")), updateProduct);
    
module.exports = router;