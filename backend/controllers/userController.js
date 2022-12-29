const User = require("../models/User")

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

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
        //setTimeout(() => {  res.status(200).send({error: null, data: users}) }, 5000);
        res.status(200).send({error: null, data: users})
        
    } catch {
        res.status(500).send({error: "Internal server error", data: null})
    }
}

exports.postUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        rut: req.body.rut
    })
    try {
        await user.save()
        res.status(201).send({error: null, data: user})
    } catch (error) {
        res.status(400).send({error: error, data: null})
    }
    
}

exports.deleteUser = async (req, res) => {
    try {
        const response = await User.deleteOne({_id: req.params.id})
        if (response.deletedCount == 0) res.status(404).send({error: null, data: "User not found"})
        else res.status(200).send({error: null, data: "User removed"})
    } catch (error) {
        res.status(500).send({error: "Internal server error", data: null})
    }
}
