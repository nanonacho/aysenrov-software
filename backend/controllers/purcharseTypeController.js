const PurcharseType = require("../models/PurcharseType")

/*
Functionality: Get all purcharse types 
*/
exports.getPurcharseTypes = async (req, res) => {
    try {
        const purcharseTypes = await PurcharseType.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: purcharseTypes})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new purcharse type
*/
exports.postPurcharseType = async (req, res) => {
    try {
        const purcharseType = new PurcharseType({
            name: req.body.name.toUpperCase(),
        })

        await purcharseType.save()
        res.status(201).send({error: null, data: purcharseType})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a purcharse type by id
*/
exports.putPurcharseType = async (req, res) => {
    try {
        const purcharseTypeUpdated = req.body
        if (req.body.name) purcharseTypeUpdated.name = req.body.name.toUpperCase()

        const purcharseType = await PurcharseType.update(purcharseTypeUpdated, { where: {id: req.params.id} })
        if (purcharseType == 1) res.status(200).send({error: null, data: purcharseType}) 
        else res.status(404).send({error: "Purcharse type not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one purcharse type by id
*/
exports.deletePurcharseType = async (req, res) => {
    try {
        const response = await PurcharseType.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Purcharse type removed"})
        else res.status(404).send({error: null, data: "Purcharse type not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}