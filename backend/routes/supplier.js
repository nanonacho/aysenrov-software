const express = require("express")

const supplier = require("../controllers/supplierController")

const router = express.Router()

router.get("/:id", supplier.getSupplier)
router.get("/", supplier.getSuppliers)
router.post("/", supplier.postSupplier)
router.delete("/:id", supplier.deleteSupplier)
router.put("/:id", supplier.putSupplier)

module.exports = router