const Customer = require("../models/Customer")
const ChileanRutify = require("chilean-rutify")

/*
Functionality: Get one customer by id 
*/
exports.getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findOne({ where: {id : req.params.id }})
        if (customer == null) res.status(404).send({error: "Customer not found", data: null})
        else {
            res.status(200).send({error: null, data: customer})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all customers 
*/
exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: customers})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new customer 
*/
exports.postCustomer = async (req, res) => {
    try {
        const customer = new Customer({
            name: req.body.name.toUpperCase(),
            rut: ChileanRutify.formatRut(req.body.rut),
            entry_date: req.body.entry_date
        })
    
        await customer.save()
        res.status(201).send({error: null, data: customer})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a customer by id
*/
exports.putCustomer = async (req, res) => {
    try {
        const customerUpdated = req.body
        if (req.body.rut) employeeUpdated.rut = ChileanRutify.formatRut(req.body.rut)
        if (req.body.name) employeeUpdated.name = req.body.name.toUpperCase()
        
        const customer = await Customer.update(customerUpdated, { where: {id: req.params.id} })
        if (customer == 1) res.status(200).send({error: null, data: customer}) 
        else res.status(404).send({error: "Customer not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one customer by id
*/
exports.deleteCustomer = async (req, res) => {
    try {
        const response = await Customer.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Customer removed"})
        else res.status(404).send({error: null, data: "Customer not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}