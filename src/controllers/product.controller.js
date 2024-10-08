// @ts-nocheck
const Products = require("../models/product.model");
const cloudinary = require("cloudinary");
const fs = require("fs");

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all product
const getAllProducts = (req, res) => {
  Products.find()
    .populate({ path: "category", model: "Category" })
    .then((product) => res.status(200).json(product))
    .catch((error) => {
      res.status(404).json(error);
    });
};

//get 0ne product
const getOneProductById = (req, res) => {
  const id = req.params.id;

  Products.findById(id)
    .populate({ path: "category", model: "Category" })
    .then((product) => res.status(200).json(product))
    .catch((error) => {
      res.status(404).json(error);
    });
};

//add a product
const addProduct = async (req, res, error) => {
  const imagePath = req.file.path;

  // upload to cloudinary
  const result = await cloudinary.uploader.upload(imagePath);
  console.log(result.secure_url);
  console.log(result.secure_url);

  await Products.create({
    name: req.body.name,
    category:
      req.body.category == "eletronics"
        ? "63b8a5e32d8adb78c91a6c15"
        : req.body.category == "books"
        ? "63b8a5f32d8adb78c91a6c17"
        : req.body.category == "sneakers"
        ? "63b8a6072d8adb78c91a6c19"
        : req.body.category == "phone"
        ? "63b8a6232d8adb78c91a6c1b"
        : undefined,
    description: req.body.description,
    price: req.body.price,
    productImage: {
      productImg: result.secure_url,
      productid: result.public_id,
    },
    quantity: req.body.quantity,
  });

  return res.status(201).json({
    message: "product has successfully been created",
  });
};

//update product
const updateProduct = (req, res) => {
  const updates = req.body;
  const id = req.params.id;

  Products.findByIdAndUpdate(id, { $set: updates }, { new: true })
    .then((updates) => {
      res.status(202).json({
        message: "product updated successfully ",
        data: updates,
      });
    })
    .catch((error) => {
      res.status(501).json({
        message: "An error occured when trying update product",
        data: error,
      });
    });
};

//delete product
const deleteProduct = (req, res) => {
  const Id = req.params.id;

  Products.findByIdAndDelete(Id)
    .then(() => {
      res.status(202);
      res.send({
        message: "deleted sucessfully",
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        message: "An error occured  not deleted",
        data: err,
      });
    });
};

module.exports = {
  getAllProducts,
  getOneProductById,
  updateProduct,
  addProduct,
  deleteProduct,
};
