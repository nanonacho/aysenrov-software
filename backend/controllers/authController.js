const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Joi = require("joi");

const User = require("../models/User")

// Valid user object for register
const schemaRegister = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    lastname: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    rut: Joi.string().min(6).max(255).required()
})

// Valid user object for login
const schemaLogin = Joi.object({
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

exports.register = async (req, res) => {
    // Validate user
    const { error } = schemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    // Verify unique email
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).send({error: "Email is already in use"})
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        rut: req.body.rut
    })
    
    try {
        const savedUser = await user.save()
        res.status(201).send({error: null, data: user})
    } catch(e) {
        res.status(400).send(error)
    }
}

exports.login = async (req, res) => {
    // Validate user
    const { error } = schemaLogin.validate(req.body)
    
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    // Verify user email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send({ error: "User not found" })

    // Verify password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: "Invalid password" })

    // Create token
    const token = jwt.sign({rut: user.rut, id: user._id}, process.env.TOKEN_SECRET)
    
    setTimeout( () => {res.header("auth-token", token).status(200).send({ error: null, data: {token: token, role: user.role}})}, 5000)
}