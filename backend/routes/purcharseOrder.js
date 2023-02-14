const express = require("express")

const order = require("../controllers/purcharseOrderController")

const router = express.Router()

router.get("/:id", order.getOrder)
router.get("/type/:type_id", order.getOrderByType)
router.get("/", order.getOrders)
router.post("/", order.postOrder)
router.delete("/:id", order.deleteOrder)
router.put("/:id", order.putOrder)

module.exports = router