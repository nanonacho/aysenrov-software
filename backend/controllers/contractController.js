const Contract = require("../models/Contract")

exports.getContract = async (req, res) => {
    try {
        const contract = await Contract.findAll({ where: {employee_id : req.params.employee_id }})
        if (contract == null) res.status(404).send({error: "Contracts not found", data: null})
        else {
            res.status(200).send({error: null, data: contract})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

exports.getContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: contracts})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

exports.postContract = async (req, res) => {
    try {
        const contract = new Contract({
            position: req.body.position,
            base_salary: req.body.base_salary,
            type: req.body.type.toLowerCase(),
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })
    
        await contract.save()
        res.status(201).send({error: null, data: contract})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

exports.putContract = async (req, res) => {
    try {
        const contractUpdated = req.body
        if (req.body.type) contractUpdated.type = req.body.type.toLowerCase()
        const contract = await Contract.update(contractUpdated, { where: {id: req.params.id} })
        if (contract == 1) res.status(200).send({error: null, data: contract}) 
        else res.status(404).send({error: "Contract not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

exports.deleteContract = async (req, res) => {
    try {
        const response = await Contract.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Contract removed"})
        else res.status(404).send({error: null, data: "Contract not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}