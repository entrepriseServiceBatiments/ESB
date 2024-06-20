const clientService = require("../services/clientService");

const getClients = async (req, res) => {
  try {
    const clients = await clientService.getClients();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createClient = async (req, res) => {
  try {
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
    const client = await clientService.createClient({
      userName,
      creditCard,
      address,
      cin,
      phoneNum,
      email,
      password,
      picture,
    });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the functions to be used in routes
module.exports = {
  getClients,
  createClient,
};
