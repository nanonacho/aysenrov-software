const CustomerEmployee = require("../models/CustomerEmployee")

/*
Functionality: Get all customer employees by customer_id
*/
exports.getCustomerEmployee = async (req, res) => {
    try {
        const customerEmployees = await CustomerEmployee.findOne({ where: {customer_id : req.params.customer_id }})
        if (customerEmployees == null) res.status(404).send({error: "Customer employees not found", data: null})
        else {
            res.status(200).send({error: null, data: customerEmployees})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all customer employees
*/
exports.getCustomerEmployees = async (req, res) => {
    try {
        const customerEmployees = await CustomerEmployee.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: customerEmployees})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new customer employee
*/
exports.postCustomerEmployee = async (req, res) => {
    try {
        const customerEmployee = new CustomerEmployee({
            name: req.body.name.toUpperCase(),
            lastname: req.body.lastname.toUpperCase(),
            rut: req.body.rut == "" ? null: ChileanRutify.formatRut(req.body.rut),
            phone_number: req.body.phone_number == "" ? null: req.body.phone_number,
            email: req.body.email == "" ? null: req.body.email,
            position: req.body.position.toUpperCase() == "" ? null: req.body.position
        })
    
        await customerEmployee.save()
        res.status(201).send({error: null, data: customerEmployee})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a customer employee by id
*/
exports.putCustomerEmployee = async (req, res) => {
    try {
        const customerEmployeeUpdated = req.body
        if (req.body.rut) employeeUpdated.rut = ChileanRutify.formatRut(req.body.rut)
        if (req.body.name) employeeUpdated.name = req.body.name.toUpperCase()
        if (req.body.lastname) employeeUpdated.lastname = req.body.lastname.toUpperCase()
        if (req.body.position) employeeUpdated.position = req.body.position.toUpperCase()
        
        const customerEmployee = await CustomerEmployee.update(customerEmployeeUpdated, { where: {id: req.params.id} })
        if (customerEmployee == 1) res.status(200).send({error: null, data: customerEmployee}) 
        else res.status(404).send({error: "Customer employee not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one customer employee by id
*/
exports.deleteCustomerEmployee = async (req, res) => {
    try {
        const response = await CustomerEmployee.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Customer employee removed"})
        else res.status(404).send({error: null, data: "Customer employee not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}