const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// DELETE 
router.delete("/delete-payment/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Falta el ID del pago" });
  }

  try {
    const response = await axios.delete(
      `https://payment-api.khipu.com/v3/payments/${id}`,
      {
        headers: {
          "x-api-key": process.env.KHIPU_API_KEY,
        },
      }
    );

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("❌ Error al eliminar el pago:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    res.status(error.response?.status || 500).json({
      error: "No se pudo eliminar el pago",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
