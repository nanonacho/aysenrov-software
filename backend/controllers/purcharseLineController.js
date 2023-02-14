const PurcharseLine = require("../models/PurcharseLine")
const Sequelize = require("sequelize")
const Product = require("../models/Product")

/*
Functionality: Get one line by id 
*/
exports.getLine = async (req, res) => {
    try {
        const line = await PurcharseLine.findOne({ 
            where: {id : req.params.id},
            include: [
                {
                    model: Product, attributes: ["name"]
                }
            ]
        })
        if (line == null) res.status(404).send({error: "Purcharse line not found", data: null})
        else {
            res.status(200).send({error: null, data: order})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all lines by order 
*/
exports.getLineByOrder = async (req, res) => {
    try {
        const lines = await PurcharseLine.findAll({ 
            where: {order_id : req.params.order_id},
            include: [
                {
                    model: Product, attributes: ["name"]
                }
            ]
        })
        if (lines == null) res.status(404).send({error: "Purcharse lines not found", data: null})
        else {
            res.status(200).send({error: null, data: lines})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new line 
*/
exports.postLine = async (req, res) => {
    try {
        const line = new PurcharseLine({
            description: req.body.description,
            unit_price: req.body.unit_price,
            quantity: req.body.quantity,
            order_id: req.body.order_id,
            product_id: req.body.product_id
        })

        await line.save()
        res.status(201).send({error: null, data: line})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Find and update a line by id
*/
exports.putLine = async (req, res) => {
    try {
        const lineUpdated = req.body

        const line = await PurcharseLine.update(lineUpdated, { where: {id: req.params.id} })
        if (order == 1) res.status(200).send({error: null, data: line}) 
        else res.status(404).send({error: "Purcharse line not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one line by id
*/
exports.deleteLine = async (req, res) => {
    try {
        const response = await PurcharseLine.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Purcharse line removed"})
        else res.status(404).send({error: null, data: "Purcharse line not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}
