
const bcrypt=require('bcryptjs')

const workerService = require("../services/workerService");
const prisma = require("../prisma");
const {sendStatusChangeEmail} = require("../services/emailService");

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
const updateWorker = async (req, res) => {
  const {
    cin,
    creditCard,
    userName,
    phoneNumber,
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
  try {
    const { workerId } = req.params;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updateData = {
      cin,
      creditCard,
      userName,
      phoneNumber,
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
    };
    if (hashedPassword) {
      updateData.password = hashedPassword;
    }
    const Worker = await workerService.updateworker(workerId, updateData);

    res.json(Worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateWorkerStatus = async (req, res) => {
  const { workerId } = req.params;
  const { status } = req.body;

  try {
    const worker = await prisma.worker.update({
      where: { idworker: parseInt(workerId) },
      data: { status },
    });
    await sendStatusChangeEmail(worker.email, status);
    res.json(worker);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update worker status" });
  }
};
module.exports = {
  getWorkers,
  createWorker,
  updateWorker,
  updateWorkerStatus,
};
