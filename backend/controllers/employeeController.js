const Employee = require("../models/Employee")
const ChileanRutify = require("chilean-rutify")

/*
Functionality: Get one employee by id 
*/
exports.getEmployee = async (req, res) => {
    try {
        const employee = await Employee.findOne({ where: {id : req.params.id }})
        if (employee == null) res.status(404).send({error: "Employee not found", data: null})
        else {
            res.status(200).send({error: null, data: employee})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all employees 
*/
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: employees})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new employee 
*/
exports.postEmployee = async (req, res) => {
    try {
        const employee = new Employee({
            name: req.body.name.toUpperCase(),
            lastname: req.body.lastname.toUpperCase(),
            email: req.body.email.toLowerCase(),
            rut: ChileanRutify.formatRut(req.body.rut),
            position: req.body.position.toUpperCase(),
            entry_date: req.body.entry_date,
            address: req.body.address,
            phone_number: req.body.phone_number,
            birth_date: req.body.birth_date,
            afp: req.body.afp.toUpperCase(),
            salud:req.body.salud.toUpperCase(),
            city: req.body.city.toUpperCase(),
            bank: req.body.bank.toUpperCase(),
            account_type: req.body.account_type.toUpperCase(),
            account: req.body.account
        })
    
        await employee.save()
        res.status(201).send({error: null, data: employee})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a employee by id
*/
exports.putEmployee = async (req, res) => {
    try {
        const employeeUpdated = req.body
        if (req.body.rut) employeeUpdated.rut = ChileanRutify.formatRut(req.body.rut)
        if (req.body.name) employeeUpdated.name = req.body.name.toUpperCase()
        if (req.body.lastname) employeeUpdated.lastname = req.body.lastname.toUpperCase()
        if (req.body.email) employeeUpdated.email = req.body.email.toLowerCase()
        if (req.body.afp) employeeUpdated.afp = req.body.afp.toUpperCase()
        if (req.body.salud) employeeUpdated.salud = req.body.salud.toUpperCase()
        if (req.body.city) employeeUpdated.city = req.body.city.toUpperCase()
        if (req.body.bank) employeeUpdated.bank = req.body.bank.toUpperCase()
        if (req.body.position) employeeUpdated.position = req.body.position.toUpperCase()
        if (req.body.account_type) employeeUpdated.account_type = req.body.account_type.toUpperCase()
        const employee = await Employee.update(employeeUpdated, { where: {id: req.params.id} })
        if (employee == 1) res.status(200).send({error: null, data: employee}) 
        else res.status(404).send({error: "Employee not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one employee by id
*/
exports.deleteEmployee = async (req, res) => {
    try {
        const response = await Employee.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Employee removed"})
        else res.status(404).send({error: null, data: "Employee not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}