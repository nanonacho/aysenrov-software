const express = require("express")

const contract = require("../controllers/contractController")

const router = express.Router()

router.get("/:employee_id", contract.getContract)
router.get("/", contract.getContracts)
router.post("/", contract.postContract)
router.delete("/:id", contract.deleteContract)
router.put("/:id", contract.putContract)
router.get("/pdf/:id", contract.generateContractPdf)
router.get("/last/:employee_id", contract.getLastContract)

module.exports = router