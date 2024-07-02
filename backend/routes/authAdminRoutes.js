const express = require("express");
const { login } = require("../controllers/adminAuthController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/admin/login", login,authMiddleware);

module.exports = router;
