const express = require("express")

const item = require("../controllers/itemController")

const router = express.Router()

router.get("/:id", item.getItem)
router.get("/item/:product_id", item.getItemByProduct)
router.get("/", item.getItems)
router.post("/", item.postItem)
router.delete("/:id", item.deleteItem)
router.put("/:id", item.putItem)

module.exports = router