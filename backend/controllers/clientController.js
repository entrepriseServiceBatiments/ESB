const clientService = require("../services/clientService");
const bcrypt = require("bcryptjs");

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
    cin,
    phoneNum,
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientService.createClient({
      userName,
      cin,
      phoneNum,
      email,
      password: hashedPassword,
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateClient = async (req, res) => {
  const {
    userName,
    creditCard,
    address,
    cin,
    phoneNum,
    email,
    password,
    picture,
    latitude,
      longitude,
  } = req.body; 
  try {
    const { clientId } = req.params;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updateData = {
      userName,
      creditCard,
      address,
      cin,
      phoneNum,
      email,
      picture,
      latitude,
      longitude,
    };

    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    const client = await clientService.updateClient(clientId, updateData);

    res.json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

const getoneClients = async (req, res) => {
  try {
    const { clientId } = req.params;
    console.log(clientId);
    const client = await clientService.getClientById(clientId);
    res.json(client);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updatePassword = async (req, res) => {
  const { clientId } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    const client = await clientService.getClientById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, client.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    await clientService.updatePassword(clientId, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  getClients,
  createClient,
  updateClient,
  getoneClients,
  updatePassword,
};

