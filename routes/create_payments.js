const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

//POST Crear pago.
router.post("/create-payment", async (req, res) => {
  const { amount, currency, subject } = req.body;

  try {
    const response = await axios.post(
      "https://payment-api.khipu.com/v3/payments",
      { amount, currency, subject },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.KHIPU_API_KEY,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Error al crear pago:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "No se pudo crear el pago",
      details: error.response?.data || null,
    });
  }
});

module.exports = router;
