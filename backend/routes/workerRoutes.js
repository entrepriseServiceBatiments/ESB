const express = require("express");
const router = express.Router();
const workerController = require("../controllers/workerController");

router.get("/workers", workerController.getWorkers);
router.post("/workers", workerController.createWorker);

module.exports = router;
