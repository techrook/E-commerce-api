const Products = require('../models/product.model')
const multer = require('multer');

//image uploader
const Storage = multer.diskStorage({
    destination: "product_images",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
 
const upload = multer({ storage: Storage }).single('productimage');

//get all product
const getAllProducts = async (req, res) => {
    await Products.find().populate({path : "category", model: "Category"})
    .then(product => (

        res.status(200).json(product)
        
    ))
    .catch(error => {
        res.status(404).json(error)
    })
};

//get 0ne product
const getOneProductById = async (req, res ) => {
    const id = req.params.id

    await Products.findById(id).populate({path : "category", model: "Category"})
    .then(product => (
        res.status(200).json(product)
    ))
    .catch(error => {
        res.status(404).json(error)
    })
};

//add a product
const addProduct = async (req, res) => {
 
    await upload(req, res, (err)=> {
        if(err){
            console.log(err)
        }
        else{   console.log(req.body.category)

                Products.create({
                name: req.body.name,
                category: (req.body.category == 'eletronics'? '63b8a5e32d8adb78c91a6c15' 
                :req.body.category == 'books'? '63b8a5f32d8adb78c91a6c17' 
                :req.body.category == 'sneakers' ? '63b8a6072d8adb78c91a6c19' 
                : req.body.category == 'phone' ? '63b8a6232d8adb78c91a6c1b'
                : undefined)
                ,
                description: req.body.description,
                price: req.body.price,
                productimage:{
                    data:req.file.filename,
                    contentType: 'image/png'
                },
                
                quantity: req.body.quantity })
                .then(productData => {
                    res.status(201).json({
                        message: "product has successfully been created",
                        data: productData
                    })
                })
                .catch(error => {
                    res.status(400).json({
                        message: "An error occured when trying to create product",
                        data: error
                    })
                })
        }
    })

};


//update product
const updateProduct = async (req, res) => {
    const updates = req.body
    const id = req.params.id

     
     Products.findByIdAndUpdate(id, {$set:updates}, {new:true})
    .then(updates => {

        res.status(202).json({
            message: "product updated successfully ",
            data: updates
        })
    })
    .catch(error => {
        res.status(501).json({
            message: "An error occured when trying update product",
            data: error
        })
    })

}

//delete product
const deleteProduct = (req, res) =>{
    const Id = req.params.id

    Products.findByIdAndDelete(Id)
    .then(() =>{
        res.status(202)
        res.send({
            message: "deleted sucessfully"
        })
    })
    .catch((err) =>{
        res.status(500)
        res.send({
            message: "An error occured  not deleted",
            data : err
        })
    })
}

module.exports = {
    getAllProducts,
    getOneProductById,
    updateProduct,
    addProduct,
    deleteProduct
}