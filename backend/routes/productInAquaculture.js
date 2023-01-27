const express = require("express")

const productInAquaculture = require("../controllers/productInAquacultureController")

const router = express.Router()

router.get("/:id", productInAquaculture.getProductAq)
router.get("/:aquaculture_id", productInAquaculture.getProductAqByAquaculture)
router.get("/:product_id", productInAquaculture.getpProductAqByProduct)
router.post("/", productInAquaculture.postProductAq)
router.delete("/:id", productInAquaculture.deleteProductAq)
router.put("/:id", productInAquaculture.putProductAq)

module.exports = router