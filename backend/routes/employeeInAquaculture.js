const express = require("express")

const employeeInAquaculture = require("../controllers/employeeInAquacultureController")

const router = express.Router()

router.get("/:id", employeeInAquaculture.getShift)
router.get("/:aquaculture_id", employeeInAquaculture.getShiftByAquaculture)
router.get("/:employee_id", employeeInAquaculture.getShiftByEmployee)
router.post("/", employeeInAquaculture.postShift)
router.delete("/:id", employeeInAquaculture.deleteShift)
router.put("/:id", employeeInAquaculture.putShift)

module.exports = router