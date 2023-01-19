const User = require("../models/User")

/*
Functionality: Get one user by rut 
*/
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ rut: req.params.rut })
        if (user == null) res.status(404).send({error: "User not found", data: null})
        else {
            res.status(200).send({error: null, data: user})
        }
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Get all users 
*/
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: users})
        
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

/*
Functionality: Create a new user
*/
exports.postUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        rut: req.body.rut,
        role: req.body.role
    })
    try {
        await user.save()
        res.status(201).send({error: null, data: user})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

/*
Functionality: Find and update a existent user by id 
*/
exports.putUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        if (user == null) res.status(404).send({error: "User not found", data: null})
        else {
            res.status(200).send({error: null, data: user})
        }
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
}

/*
Functionality: Delete one user by id 
*/
exports.deleteUser = async (req, res) => {
    try {
        const response = await User.deleteOne({_id: req.params.id})
        if (response.deletedCount == 0) res.status(404).send({error: null, data: "User not found"})
        else res.status(200).send({error: null, data: "User removed"})
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}
