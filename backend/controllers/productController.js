const Product = require("../models/Product")
const Item = require("../models/Item")
const Category = require("../models/Category")
const Sequelize = require("sequelize")

/*
Functionality: Get one product by id 
*/
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ 
            where: {id : req.params.id},
            attributes: { 
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("items.aquaculture_id")), "not_avail_stock"],
                    [Sequelize.fn("COUNT", Sequelize.col("items.id")), "total_stock"]
                ] 
            },
            include: [
                {
                    model: Item, attributes: [], required: false
                }
            ],
            group: ["product.id"]
        })
        if (product == null) res.status(404).send({error: "Product not found", data: null})
        else {
            res.status(200).send({error: null, data: product})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all products by category_id 
*/
exports.getProductByCategory = async (req, res) => {
    try {
        const products = await Product.findAll({ 
            where: {category_id : req.params.category_id}, 
            attributes: { 
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("items.aquaculture_id")), "not_avail_stock"],
                    [Sequelize.fn("COUNT", Sequelize.col("items.id")), "total_stock"]
                ] 
            },
            include: [
                {
                    model: Item, attributes: [], required: false
                }
            ],
            group: ["product.id"]
        })
        if (products == null) res.status(404).send({error: "Products not found", data: null})
        else {
            res.status(200).send({error: null, data: products})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all products 
*/
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: { 
                include: [
                    [Sequelize.fn("COUNT", Sequelize.col("items.aquaculture_id")), "not_avail_stock"],
                    [Sequelize.fn("COUNT", Sequelize.col("items.id")), "total_stock"]
                ] 
            },
            include: [
                {
                    model: Item, attributes: [], required: false
                }
        ],
            group: ["product.id"]
        })
        
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: products})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new product 
*/
exports.postProduct = async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name.toUpperCase(),
            category_id: req.body.category_id
        })

        await product.save()
        res.status(201).send({error: null, data: product})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a product by id
*/
exports.putProduct = async (req, res) => {
    try {
        const productUpdated = req.body
        if (req.body.name) productUpdated.name = req.body.name.toUpperCase()

        const product = await Product.update(productUpdated, { where: {id: req.params.id} })
        if (product == 1) res.status(200).send({error: null, data: product}) 
        else res.status(404).send({error: "product not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one product by id
*/
exports.deleteProduct = async (req, res) => {
    try {
        const response = await Product.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Product removed"})
        else res.status(404).send({error: null, data: "Product not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}
