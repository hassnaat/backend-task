const express = require('express');
const router = express.Router();
const { add_department, get_departments, delete_department, update_department } = require("../controllers/departments")
const verifyToken = require("../middleware/verifyToken")

router.post("/", verifyToken, add_department)
router.get("/", verifyToken, get_departments)
router.delete("/:id", verifyToken, delete_department)
router.put("/:id", verifyToken, update_department)
module.exports = router;