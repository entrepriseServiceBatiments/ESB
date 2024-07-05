const workerService = require('../services/workerService');
const bcrypt=require('bcryptjs')
const getWorkers = async (req, res) => {
  try {
    const workers = await workerService.getWorkers();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createWorker = async (req, res) => {
  try {
    const {
      cin,
      creditCard,
      userName,
      phoneNum,
      email,
      password,
      rentedProd,
      picture,
      resume,
      rating,
      jobTitle,
      hourlyRate,
      available,
      address,
      ordersId,
      latitude,
      longitude,
      status,
      comments,
    } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const worker = await workerService.createWorker({
      cin,
      creditCard,
      userName,
      phoneNum,
      email,
      password:hashedPassword,
      rentedProd,
      picture,
      resume,
      rating,
      jobTitle,
      hourlyRate,
      available,
      address,
      ordersId,
      latitude,
      longitude,
      status,
      comments,
    });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWorkers,
  createWorker,
};