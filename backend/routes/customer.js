const express = require("express")

const customer = require("../controllers/customerController")

const router = express.Router()

router.get("/:id", customer.getCustomer)
router.get("/", customer.getCustomers)
router.post("/", customer.postCustomer)
router.delete("/:id", customer.deleteCustomer)
router.put("/:id", customer.putCustomer)

module.exports = router