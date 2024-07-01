const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.get('/clients', clientController.getClients);

router.get('/clients/:clientId',clientController.getoneClients);
router.post('/clients', clientController.createClient);
router.put('/clients/:clientId', clientController.updateClient); 






module.exports = router;

