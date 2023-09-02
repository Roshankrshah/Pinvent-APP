const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct
} = require('../controllers/productController');

const {upload} = require('../utils/fileUpload');

router.post("/",protect,upload.single("image"),createProduct);
router.get('/',protect,getProducts);
router.route('/:id').get(protect,getProduct).delete(protect,deleteProduct);
module.exports = router;