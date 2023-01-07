const Category = require('../models/category.model');

const  getAllCategories = async (req, res) => {

    await Category.find()
    .then(categories => (
        res.status(200).json(categories)
    ))
    .catch(error => {
        res.status(404).json(error)
    })
}

const  getACategories = async (req, res) => {
    const id = req.params.id

    await Category.findById(id)
    .then(category => (
        res.status(200).json(category)
    ))
    .catch(error => {
        res.status(404).json(error)
    })
}

const  addCategories = async (req, res) => {
    const category = req.body

    await Category.create(category)
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