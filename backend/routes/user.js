const express = require("express")

const user = require("../controllers/userController")

const router = express.Router()

router.get("/:rut", user.getUser)
router.get("/", user.getUsers)
router.post("/", user.postUser)
router.delete("/:id", user.deleteUser)
router.put("/:id", user.putUser)

module.exports = router