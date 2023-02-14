const PurcharseOrder = require("../models/PurcharseOrder")
const PurcharseLine = require("../models/PurcharseLine")
const PurcharseType = require("../models/PurcharseType")
const Sequelize = require("sequelize")
const Supplier = require("../models/Supplier")

/*
Functionality: Get one order by id 
*/
exports.getOrder = async (req, res) => {
    try {
        const order = await PurcharseOrder.findOne({ 
            where: {id : req.params.id},
            include: [
                {
                    model: Supplier, attributes: ["name"]
                },
                {
                    model: PurcharseType, attributes: ["name"]
                }
            ]
        })
        if (order == null) res.status(404).send({error: "Purcharse order not found", data: null})
        else {
            res.status(200).send({error: null, data: order})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all orders by type_id 
*/
exports.getOrderByType = async (req, res) => {
    try {
        const orders = await PurcharseOrder.findAll({ 
            where: {type_id : req.params.type_id},
            include: [
                {
                    model: Supplier, attributes: ["name"]
                },
                {
                    model: PurcharseType, attributes: ["name"]
                }
            ]
        })
        if (orders == null) res.status(404).send({error: "Orders not found", data: null})
        else {
            res.status(200).send({error: null, data: orders})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all orders
*/
exports.getOrders = async (req, res) => {
    try {
        const orders = await PurcharseOrder.findAll({
            include: [
                {
                    model: Supplier, attributes: ["name"]
                },
                {
                    model: PurcharseType, attributes: ["name"]
                }
            ]
        })
        
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: orders})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new order 
*/
exports.postOrder = async (req, res) => {
    try {
        const order = new PurcharseOrder({
            amount: req.body.amount,
            date: req.body.date,
            description: req.body.description,
            supplier_id: req.body.supplier_id,
            type_id: req.body.type_id
        })

        await order.save()
        res.status(201).send({error: null, data: order})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a order by id
*/
exports.putOrder = async (req, res) => {
    try {
        const orderUpdated = req.body

        const order = await PurcharseOrder.update(orderUpdated, { where: {id: req.params.id} })
        if (order == 1) res.status(200).send({error: null, data: product}) 
        else res.status(404).send({error: "Purcharse order not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one order by id
*/
exports.deleteOrder = async (req, res) => {
    try {
        const response = await PurcharseOrder.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Purcharse order removed"})
        else res.status(404).send({error: null, data: "Purcharse order not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}
