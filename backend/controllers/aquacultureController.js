const Aquaculture = require("../models/Aquaculture")
const Customer = require("../models/Customer")
const Sequelize = require("sequelize")

/*
Functionality: Get all aquacultures by customer_id 
*/
exports.getAquaculture = async (req, res) => {
    try {
        const aquaculture = await Aquaculture.findOne({ where: {customer_id : req.params.customer_id }})
        if (aquaculture == null) res.status(404).send({error: "Aquaculture not found", data: null})
        else {
            res.status(200).send({error: null, data: aquaculture})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all aquacultures
*/
exports.getAquacultures = async (req, res) => {
    try {
        const aquacultures = await Aquaculture.findAll({
            include: {model: Customer, attributes: ["name"]}
        })
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: aquacultures})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new aquaculture 
*/
exports.postAquaculture = async (req, res) => {
    try {
        const aquaculture = new Aquaculture({
            name: req.body.name.toUpperCase(),
            location: req.body.location.toUpperCase(),
            customer_id: req.body.customer_id
        })
    
        await aquaculture.save()
        res.status(201).send({error: null, data: aquaculture})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a aquaculture by id
*/
exports.putAquaculture = async (req, res) => {
    try {
        const aquacultureUpdated = req.body
        if (req.body.name) aquacultureUpdated.name = req.body.name.toUpperCase()
        if (req.body.location) aquacultureUpdated.location = req.body.location.toUpperCase()
        
        const aquaculture = await Aquaculture.update(aquacultureUpdated, { where: {id: req.params.id} })
        if (aquaculture == 1) res.status(200).send({error: null, data: aquaculture}) 
        else res.status(404).send({error: "Aquaculture not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one aquaculture by id
*/
exports.deleteAquaculture = async (req, res) => {
    try {
        const response = await Aquaculture.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Aquaculture removed"})
        else res.status(404).send({error: null, data: "Aquaculture not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}