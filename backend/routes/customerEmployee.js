const express = require("express")

const customerEmployee = require("../controllers/customerEmployeeController")

const router = express.Router()

router.get("/:customer_id", customerEmployee.getCustomerEmployeesByCustomer)
router.post("/", customerEmployee.postCustomerEmployee)
router.delete("/:id", customerEmployee.deleteCustomerEmployee)
router.put("/:id", customerEmployee.putCustomerEmployee)

module.exports = router