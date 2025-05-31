const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// GET Obtener detalle de un pago
router.get("/payments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://payment-api.khipu.com/v3/payments/${id}`,
      {
        headers: {
          "x-api-key": process.env.KHIPU_API_KEY,
        },
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      "Error al obtener detalle del pago:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "No se pudo obtener el detalle del pago",
      details: error.response?.data || null,
    });
  }
});

module.exports = router;
