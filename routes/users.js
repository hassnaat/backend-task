const express = require('express');
const router = express.Router();
const { register_user, get_users, delete_user, update_user } = require("../controllers/users")
const verifyToken = require("../middleware/verifyToken")

router.post("/", register_user)
router.get("/", verifyToken, get_users)
router.delete("/:id", verifyToken, delete_user)
router.put("/:id", verifyToken, update_user)

module.exports = router;