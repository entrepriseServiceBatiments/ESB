const express = require('express');
const router = express.Router();
const PenOrder = require('../controllers/PenOrder');


router.get('/pen',PenOrder.getPenOrders) 
router.post('/pen', PenOrder.createPenOrders);
router.put('/pen/:clientId', PenOrder.updatePenOrders);








module.exports = router