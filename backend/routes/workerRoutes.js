const express = require('express');
const router = express.Router();
const workerController = require('../controllers/workerController');


router.get('/workers/:jobTitle', workerController.getWorkersByJobTitle);



router.get("/workers", workerController.getWorkers);
router.post("/workers/add", workerController.createWorker);
router.put("/workers/:workerId", workerController.updateWorker)
router.put("/workers/status/:workerId", workerController.updateWorkerStatus)
router.put('/workers/updatePassword/:workerId', workerController.updatePassword);

module.exports = router;
