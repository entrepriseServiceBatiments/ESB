require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();

const clientRoutes = require("./routes/clientRoutes");
const workerRoutes = require("./routes/workerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const authAdminRoutes = require("./routes/authAdminRoutes");
const authenticateToken = require("./middleware/authMiddleware");


app.use(cors());

const authRoutes = require("./routes/authRoutes");

app.use(authRoutes);
app.use(clientRoutes);
app.use(workerRoutes);
app.use(productRoutes);
app.use(orderRoutes);

app.use(authAdminRoutes);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
