const express = require("express")

const product = require("../controllers/productController")

const router = express.Router()

router.get("/:id", product.getProduct)
router.get("/category/:category_id", product.getProductByCategory)
router.get("/", product.getProducts)
router.post("/", product.postProduct)
router.delete("/:id", product.deleteProduct)
router.put("/:id", product.putProduct)

module.exports = router