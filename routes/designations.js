const express = require('express');
const router = express.Router();
const { add_designation, get_designations, delete_designation, update_designation } = require("../controllers/designations")
const verifyToken = require("../middleware/verifyToken")

router.post("/", verifyToken, add_designation)
router.get("/", verifyToken, get_designations)
router.delete("/:id", verifyToken, delete_designation)
router.put("/:id", verifyToken, update_designation)


module.exports = router;