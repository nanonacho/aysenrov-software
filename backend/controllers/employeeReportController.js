const EmployeeReport = require("../models/EmployeeReport")

/*
Functionality: Get all employee reports of one employee by id 
*/
exports.getEmployeeReports = async (req, res) => {
    try {
        const employeeReport = await EmployeeReport.findAll({ where: {employee_id : req.params.employee_id }})
        if (employeeReport == null) res.status(404).send({error: "Employee Reports not found", data: null})
        else {
            res.status(200).send({error: null, data: employeeReport})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new employee report
*/
exports.postEmployeeReport = async (req, res) => {
    const employeeReport = new EmployeeReport({
        employee_id: req.body.employee_id,
        customer: req.body.customer,
        date: req.body.date,
        place: req.body.place,
        description: req.body.description,
    })
    try {
        await employeeReport.save()
        res.status(201).send({error: null, data: employeeReport})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Find and update a existent employee report by id 
*/
exports.putEmployeeReport = async (req, res) => {
    try {
        const employeeReport = await EmployeeReport.update(req.body, { where: {id: req.params.id} })
        if (employeeReport == 1) res.status(200).send({error: null, data: employeeReport}) 
        else res.status(404).send({error: "Employee Report not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one employee report by id 
*/
exports.deleteEmployeeReport = async (req, res) => {
    try {
        const response = await EmployeeReport.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Employee Report removed"})
        else res.status(404).send({error: null, data: "Employee Report not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}