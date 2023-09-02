const { StatusCodes } = require('http-status-codes');
const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;
const {fileSizeFormatter} = require('../utils/fileUpload');

const createProduct = async(req,res)=>{
    const {name, sku, category, quantity, price, description} = req.body;

    if(!name || !category || !quantity || !price || !description){
        res.status(StatusCodes.BAD_REQUEST);
        throw new Error("Please fill in all fields");
    }

    let fileData = {};
    let uploadedFile;

    if(req.file){
        try{
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder: "Pinvent APP",
                resource_type: "image"
            });
        }catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            throw new Error("Image could not be uploaded");
        }
    }

    fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size,2)
    };

    const product = await Product.create({
        user: req.user.id,
        name, 
        sku,
        category,
        quantity,
        price,
        description,
        image: fileData,
    });

    res.status(StatusCodes.CREATED).json(product);
}

const getProducts = async(req,res)=>{
    const products = await Product.find({user: req.user.id}).sort("-createdAt");

    res.status(StatusCodes.OK).json(products);
}

module.exports = {
    createProduct,
    getProducts
}