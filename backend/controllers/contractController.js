const PDFDocument = require("pdfkit")
const Contract = require("../models/Contract")
const Employee = require("../models/Employee")
const pdfService = require("../service/pdf")
const contractTemplate = require("../data/contracts/contractTemplate")

/*
Functionality: Get all contracts of one employee by id 
*/
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

/*
Functionality: Get all contracts
*/
exports.getContracts = async (req, res) => {
    try {
        const contracts = await Contract.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: contracts})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new contract 
*/
exports.postContract = async (req, res) => {
    try {
        const contract = new Contract({
            position: req.body.position.toUpperCase(),
            base_salary: req.body.base_salary,
            type: req.body.type.toUpperCase(),
            start_date: req.body.start_date,
            end_date: req.body.end_date == "" ? null: req.body.end_date,
            employee_id: req.body.employee_id
        })
    
        await contract.save()
        res.status(201).send({error: null, data: contract})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a contract by id 
*/
exports.putContract = async (req, res) => {
    try {
        const contractUpdated = req.body
        if (req.body.position) contractUpdated.position = req.body.position.toUpperCase()
        if (req.body.type) contractUpdated.type = req.body.type.toUpperCase()
        const contract = await Contract.update(contractUpdated, { where: {id: req.params.id} })
        if (contract == 1) res.status(200).send({error: null, data: contract}) 
        else res.status(404).send({error: "Contract not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one contract by id 
*/
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

/*
Functionality: Create and send contract pdf by contract_id and employee_id
*/
exports.generateContractPdf = async (req, res) => {
    try {
        const contract = await Contract.findOne({ where: {id : req.params.id }})
        const employee = await Employee.findOne({ where: {id: contract.employee_id}})
        if (contract == null) res.status(404).send({error: "Contracts not found", data: null})
        else {
            const doc = new PDFDocument()
            const contractName = "contrato-" + contract.id + "-" + employee.name + "-" + employee.lastname + ".pdf"
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", `attachment; filename=${contractName}`)
            
            doc.font('Times-Roman')
            doc.text(contractTemplate.title, {align: "center"}).moveDown(1)
            doc.text(contractTemplate.first_par(employee, contract), {align: "justify"})
            
            doc.pipe(res)
            doc.end()
        }
    } catch (e){
        console.log(e)
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get the last contract of one employee by id 
*/
exports.getLastContract = async (req, res) => {
    try {
        const contract = await Contract.findAll({ where: {employee_id : req.params.employee_id }, order: [ [ 'start_date', 'DESC' ]]})
        if (contract == null) res.status(404).send({error: "Contracts not found", data: null})
        else {
            res.status(200).send({error: null, data: contract})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}