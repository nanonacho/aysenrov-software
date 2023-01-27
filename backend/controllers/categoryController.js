const Category = require("../models/Category")

/*
Functionality: Get all categories 
*/
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: categories})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new category 
*/
exports.postCategory = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name.toUpperCase(),
        })

        await category.save()
        res.status(201).send({error: null, data: category})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a category by id
*/
exports.putCategory = async (req, res) => {
    try {
        const categoryUpdated = req.body
        if (req.body.category) categoryUpdated.name = req.body.name.toUpperCase()

        const category = await Category.update(categoryUpdated, { where: {id: req.params.id} })
        if (category == 1) res.status(200).send({error: null, data: category}) 
        else res.status(404).send({error: "Category not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one category by id
*/
exports.deleteCategory = async (req, res) => {
    try {
        const response = await Category.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Category removed"})
        else res.status(404).send({error: null, data: "Category not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}