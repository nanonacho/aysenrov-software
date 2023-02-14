const express = require("express")

const line = require("../controllers/purcharseLineController")

const router = express.Router()

router.get("/:id", line.getLine)
router.get("/order/:order_id", line.getLineByOrder)
router.post("/", line.postLine)
router.delete("/:id", line.deleteLine)
router.put("/:id", line.putLine)

module.exports = router