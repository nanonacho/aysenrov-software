const express = require("express")

const aquaculture = require("../controllers/aquacultureController")

const router = express.Router()

router.get("/:id", aquaculture.getAquaculture)
router.get("/", aquaculture.getAquacultures)
router.post("/", aquaculture.postAquaculture)
router.delete("/:id", aquaculture.deleteAquaculture)
router.put("/:id", aquaculture.putAquaculture)

module.exports = router