const Category = require('../models/category.model');

const  getAllCategories =  (req, res) => {

    Category.find()
    .then(categories => (
        res.status(200).json(categories)
    ))
    .catch(error => {
        res.status(404).json(error)
    })
}

const  getACategories =  (req, res) => {
    const id = req.params.id

    Category.findById(id)
    .then(category => (
        res.status(200).json(category)
    ))
    .catch(error => {
        res.status(404).json(error)
    })
}

const  addCategories = (req, res) => {
    const category = req.body

     Category.create(category)
    .then(category => (
        res.status(200).json(category)
    ))
    .catch(error => {
        res.status(404).json(error)
    })
}

module.exports = {
    getAllCategories,
    getACategories,
    addCategories
}