const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentcontroller');

router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.getPayments);
router.get('/payments/:clientId', paymentController.getPaymentById);
router.delete('/payments/:id', paymentController.deletePayment);

module.exports = router;
