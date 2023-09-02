const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    createProduct,
    getProducts
} = require('../controllers/productController');

const {upload} = require('../utils/fileUpload');

router.post("/",protect,upload.single("image"),createProduct);
router.get('/',getProducts);
module.exports = router;