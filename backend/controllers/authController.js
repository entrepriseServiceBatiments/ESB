const clientService = require('../services/clientService');
const workerService = require('../services/workerService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await clientService.getClientByEmail(email);
    let userType = 'client';

    if (!user) {
      user = await workerService.getWorkerByEmail(email);
      userType = 'worker';
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid  password' });
    }

    const token = jwt.sign(
      { userId: user.id, userType },
      'your_jwt_secret_key',
      { expiresIn: '1h' }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
};
