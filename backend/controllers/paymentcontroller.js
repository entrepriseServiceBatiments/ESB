const paymentService = require('../services/paymentService');


 const createPayment = async (req, res) => {
    try {
      const payment = await paymentService.createPayment(req.body);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Error creating payment' });
    }
  };
  
   const getPayments = async (req, res) => {
    try {
      const payments = await paymentService.getPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching payments' });
    }
  };
  
   const getPaymentById = async (req, res) => {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: 'Payment not found' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching payment' });
    }
  };
  
   const deletePayment = async (req, res) => {
    try {
      await paymentService.deletePayment(req.params.id);
      res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting payment' });
    }
  };


  module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    deletePayment
  }