const express = require("express")

const employeeReport = require("../controllers/employeeReportController")

const router = express.Router()

router.get("/:employee_id", employeeReport.getEmployeeReports)
router.post("/", employeeReport.postEmployeeReport)
router.delete("/:id", employeeReport.deleteEmployeeReport)
router.put("/:id", employeeReport.putEmployeeReport)

module.exports = router