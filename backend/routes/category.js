const express = require("express")

const category = require("../controllers/categoryController")

const router = express.Router()

router.get("/", category.getCategories)
router.post("/", category.postCategory)
router.delete("/:id", category.deleteCategory)
router.put("/:id", category.putCategory)

module.exports = router