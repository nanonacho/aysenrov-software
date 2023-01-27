const express = require("express")

const customerEmployee = require("../controllers/customerEmployeeController")

const router = express.Router()

router.get("/:id", customerEmployee.getCustomerEmployee)
router.post("/", customerEmployee.postCustomerEmployee)
router.delete("/:id", customerEmployee.deleteCustomerEmployee)
router.put("/:id", customerEmployee.putCustomerEmployee)

module.exports = router