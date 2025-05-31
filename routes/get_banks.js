const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

//GET Trae bancos
router.get("/banks", async (req, res) => {
  try {
    const response = await axios.get("https://payment-api.khipu.com/v3/banks", {
      headers: {
        "x-api-key": process.env.KHIPU_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error al obtener bancos:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "No se pudo obtener la lista de bancos" });
  }
});

module.exports = router;
