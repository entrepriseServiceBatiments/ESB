const clientService = require('../services/clientService');
const bcrypt = require('bcryptjs');

const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClient = async (req, res) => {
  const {
    userName,
    creditCard,
    address,
    cin,
    phoneNum,
    email,
    password,
    picture,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); 

    const client = await clientService.createClient({
      userName,
      creditCard,
      address,
      cin,
      phoneNum,
      email,
      password: hashedPassword, 
      picture,
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const {
      userName,
      creditCard,
      address,
      cin,
      phoneNum,
      email,
      password,
      picture,
    } = req.body;
const client=await clientService.updateClient(clientId)
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getoneClients = async (req, res) => {
  try {
    const { clientId } = req.params;
    console.log(clientId);
    const clients = await clientService.getClientById(clientId)
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getClients,
  createClient,
  updateClient,
  getoneClients,
  
};
