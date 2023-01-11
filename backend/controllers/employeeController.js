const Employee = require("../models/Employee")

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

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: employees})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

exports.postEmployee = async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        rut: req.body.rut,
        position: req.body.position,
        entry_date: req.body.entry_date,
        address: req.body.address,
        phone_number: req.body.phone_number,
        birth_date: req.body.birth_date,
        afp: req.body.afp
    })
    try {
        await employee.save()
        res.status(201).send({error: null, data: employee})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

exports.putEmployee = async (req, res) => {
    try {
        const employee = await Employee.update(req.body, { where: {id: req.params.id} })
        if (employee == 1) res.status(200).send({error: null, data: employee}) 
        else res.status(404).send({error: "Employee not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

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