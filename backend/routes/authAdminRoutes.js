const express = require("express");
const { login } = require("../controllers/adminAuthController.js");
const router = express.Router();

router.post("/admin/login", login);

module.exports = router;
