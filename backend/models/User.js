const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    rut: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    role: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("User", schema)