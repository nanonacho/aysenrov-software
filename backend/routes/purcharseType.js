const express = require("express")

const purcharseType = require("../controllers/purcharseTypeController")

const router = express.Router()

router.get("/", purcharseType.getPurcharseTypes)
router.post("/", purcharseType.postPurcharseType)
router.delete("/:id", purcharseType.deletePurcharseType)
router.put("/:id", purcharseType.putPurcharseType)

module.exports = router