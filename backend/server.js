require("dotenv").config();

const cors=require("cors")
const express = require("express");
const app = express();

const clientRoutes = require("./routes/clientRoutes");
const workerRoutes = require("./routes/workerRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes")

app.use(cors())
app.use(express.json());

app.use(authRoutes)
app.use(clientRoutes);
app.use(workerRoutes);
app.use(productRoutes);
app.use(orderRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
