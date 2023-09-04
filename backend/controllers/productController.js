const { StatusCodes } = require('http-status-codes');
const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;
const { fileSizeFormatter } = require('../utils/fileUpload');

const createProduct = async (req, res) => {
    const { name, category, quantity, price, description } = req.body;

    if (!name || !category || !quantity || !price || !description) {
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Please fill in all fields");
    }

    let fileData = {};
    let uploadedFile;

    if (req.file) {
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Pinvent APP",
                resource_type: "image"
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        };
    }

    const product = await Product.create({
        user: req.user.id,
        name,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    if (product) {
        return res.status(StatusCodes.CREATED).send("success");
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

const getProducts = async (req, res) => {
    const products = await Product.find({ user: req.user.id }).sort("-createdAt");

    res.status(StatusCodes.OK).json(products);
}

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Product not Found");
    }

    if (product.user.toString() !== req.user.id) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("User not authorized");
    }

    res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user.id) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("User not authorized");
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
};

const updateProduct = async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        res.status(StatusCodes.NOT_FOUND);
        throw new Error("Product not found");
    }

    if (product.user.toString() !== req.user.id) {
        res.status(StatusCodes.UNAUTHORIZED);
        throw new Error("User not authorized");
    }

    let fileData = {};
    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Pinvent APP",
                resource_type: "image"
            });
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error("Image could not be uploaded");
        }
        fileData = {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        };
    }



    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: id },
        {
            name,
            sku,
            category,
            quantity,
            price,
            description,
            image: Object.keys(fileData).length === 0 ? product.image : fileData
        },
        {
            new: true,
            runValidators: true
        }
    );

    res.status(StatusCodes.OK).json(updatedProduct);
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}