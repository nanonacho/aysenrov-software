const express = require("express")

const employee = require("../controllers/employeeController")

const router = express.Router()

router.get("/:id", employee.getEmployee)
router.get("/", employee.getEmployees)
router.post("/", employee.postEmployee)
router.delete("/:id", employee.deleteEmployee)
router.put("/:id", employee.putEmployee)

module.exports = router