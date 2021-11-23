const express = require('express');
const router = express.Router();


const { add_company, get_companies, delete_company, update_company } = require("../controllers/companies")
const verifyToken = require("../middleware/verifyToken")

router.post("/", verifyToken, add_company)
router.get("/", verifyToken, get_companies)
router.delete("/:id", verifyToken, delete_company)
router.put("/:id", verifyToken, update_company)

module.exports = router;