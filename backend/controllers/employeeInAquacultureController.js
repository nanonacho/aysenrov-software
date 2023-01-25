const EmployeeInAquaculture = require("../models/EmployeeInAquaculture")

/*
Functionality: Get one shift by id 
*/
exports.getShift = async (req, res) => {
    try {
        const shift = await EmployeeInAquaculture.findOne({ where: {id : req.params.id }})
        if (shift == null) res.status(404).send({error: "Shift not found", data: null})
        else {
            res.status(200).send({error: null, data: shift})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all shifts by employee_id 
*/
exports.getShiftByEmployee = async (req, res) => {
    try {
        const shifts = await EmployeeInAquaculture.findOne({ where: {employee_id : req.params.employee_id }})
        if (shifts == null) res.status(404).send({error: "Shift not found", data: null})
        else {
            res.status(200).send({error: null, data: shifts})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all shifts by aquaculture_id 
*/
exports.getShiftByAquaculture = async (req, res) => {
    try {
        const shifts = await EmployeeInAquaculture.findOne({ where: {aquaculture_id : req.params.aquaculture_id }})
        if (shifts == null) res.status(404).send({error: "Shift not found", data: null})
        else {
            res.status(200).send({error: null, data: shifts})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all shifts 
*/
exports.getShifts = async (req, res) => {
    try {
        const shifts = await EmployeeInAquaculture.findAll()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: shifts})
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new shift 
*/
exports.postShift = async (req, res) => {
    try {
        const shift = new EmployeeInAquaculture({
            employee_id: req.body.employee_id,
            aquaculture_id: req.body.aquaculture_id,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })
    
        await shift.save()
        res.status(201).send({error: null, data: shift})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a shift by id
*/
exports.putShift = async (req, res) => {
    try {
        const shift = await EmployeeInAquaculture.update(req.body, { where: {id: req.params.id} })
        if (shift == 1) res.status(200).send({error: null, data: shift}) 
        else res.status(404).send({error: "Shift not found", data: null})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one shift by id
*/
exports.deleteShift = async (req, res) => {
    try {
        const response = await EmployeeInAquaculture.destroy({where: {id: req.params.id}})
        
        if (response == 1) res.status(200).send({error: null, data: "Shift removed"})
        else res.status(404).send({error: null, data: "Shift not found"})
        
       console.log(response)
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}