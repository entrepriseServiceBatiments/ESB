const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');


router.post('/clients/add', clientController.createClient);

router.get('/clients', clientController.getClients);

router.get('/clients/:clientId',clientController.getoneClients);
router.put('/clients/:clientId', clientController.updateClient); 






module.exports = router;

