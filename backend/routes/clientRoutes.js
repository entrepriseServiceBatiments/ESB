const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/clients', clientController.getClients);
router.post('/clients', clientController.createClient);

// Export the router to be used in index.js
module.exports = router;