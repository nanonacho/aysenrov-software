const Aquaculture = require("../models/Aquaculture")
const Item = require("../models/Item")

/*
Functionality: Get one item by id 
*/
exports.getItem = async (req, res) => {
    try {
        const item = await Product.findOne({ where: {id : req.params.id }})
        if (item == null) res.status(404).send({error: "Item not found", data: null})
        else {
            res.status(200).send({error: null, data: item})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all items by product_id 
*/
exports.getItemByProduct = async (req, res) => {
    try {
        const items = await Item.findAll({ 
            where: {product_id : req.params.product_id },
            include: {model: Aquaculture, attributes: ["name"]}
        })
        if (items == null) res.status(404).send({error: "Items not found", data: null})
        else {
            res.status(200).send({error: null, data: items})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all items 
*/
exports.getItems = async (req, res) => {
    try {
        const items = await Item.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: items})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new item 
*/
exports.postItem = async (req, res) => {
    try {
        const item = new Item({
            code: req.body.code == "" ? null : req.body.code,
            description: req.body.description == "" ? null : req.body.description ,
            condition: req.body.condition == "" ? null : req.body.condition.toUpperCase(),
            product_id: req.body.product_id == "" ? null : req.body.product_id,
            aquaculture_id: req.body.aquaculture_id == "" ? null : req.body.aquaculture_id
        })

        await item.save()
        res.status(201).send({error: null, data: item})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a item by id
*/
exports.putItem = async (req, res) => {
    try {
        const itemUpdated = req.body
        if (req.body.condition) itemUpdated.name = req.body.condition.toUpperCase()

        const item = await Item.update(itemUpdated, { where: {id: req.params.id} })
        if (item == 1) res.status(200).send({error: null, data: item}) 
        else res.status(404).send({error: "Item not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one item by id
*/
exports.deleteItem = async (req, res) => {
    try {
        const response = await Item.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Item removed"})
        else res.status(404).send({error: null, data: "Item not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}
