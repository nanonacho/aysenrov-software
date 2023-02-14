const Supplier = require("../models/Supplier")
const ChileanRutify = require("chilean-rutify")

/*
Functionality: Get one supplier by id 
*/
exports.getSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findOne({ where: {id : req.params.id }})
        if (supplier == null) res.status(404).send({error: "Supplier not found", data: null})
        else {
            res.status(200).send({error: null, data: supplier})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all suppliers
*/
exports.getSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: suppliers})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new supplier
*/
exports.postSupplier = async (req, res) => {
    try {
        const supplier = new Supplier({
            name: req.body.name.toUpperCase(),
            rut: ChileanRutify.formatRut(req.body.rut),
            entry_date: req.body.entry_date == "" ? null : req.body.entry_date,
            address: req.body.address.toUpperCase(),    
            email: req.body.email.toLowerCase(),
            phone_number: req.body.phone_number
        })
    
        await supplier.save()
        res.status(201).send({error: null, data: supplier})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a supplier by id
*/
exports.putSupplier = async (req, res) => {
    try {
        const supplierUpdated = req.body
        if (req.body.rut) supplierUpdated.rut = ChileanRutify.formatRut(req.body.rut)
        if (req.body.name) supplierUpdated.name = req.body.name.toUpperCase()
        if (req.body.address) supplierUpdated.address = req.body.address.toUpperCase()
        if (req.body.email) supplierUpdated.email = req.body.email.toLowerCase()
        if (req.body.date == "") supplierUpdated.date = null
        
        const supplier = await Supplier.update(supplierUpdated, { where: {id: req.params.id} })
        if (supplier == 1) res.status(200).send({error: null, data: supplier}) 
        else res.status(404).send({error: "Supplier not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one supplier by id
*/
exports.deleteSupplier = async (req, res) => {
    try {
        const response = await Supplier.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Supplier removed"})
        else res.status(404).send({error: null, data: "Supplier not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}