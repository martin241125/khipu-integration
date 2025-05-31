const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.disable("x-powered-by");

// rutas
const banksRoute = require("./routes/get_banks");
const paymentDetailRoute = require("./routes/payment_detail");
const createpayments = require("./routes/create_payments");
const deletepayment = require("./routes/delete_payment");

// Usar rutas
app.use("/", banksRoute);
app.use("/", paymentDetailRoute);
app.use("/", createpayments);
app.use("/", deletepayment);

//servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
