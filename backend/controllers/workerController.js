
const bcrypt=require('bcryptjs')

const workerService = require("../services/workerService");
const prisma = require("../prisma");
const { sendStatusChangeEmail } = require("../services/emailService");

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
  try {
    const { workerId } = req.params;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updateData = {
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
    console.log(worker.email);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update worker status" });
  }
};
const updatePassword = async (req, res) => {
  const { workerId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const client = await workerService.getClientById(workerId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, client.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    await workerService.updatePassword(workerId, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getWorkersByJobTitle = async (req, res) => {
  try {
    const workers = await workerService.getWorkersByJobTitle(req.params.jobTitle);
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getWorkers,
  createWorker,
  updateWorker,
  updateWorkerStatus,
  getWorkersByJobTitle,
  updatePassword
};
