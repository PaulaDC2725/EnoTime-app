// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db'); // Importamos la conexión para que se ejecute

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON desde el frontend

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de EnoTime funcionando correctamente');
});

// Levantar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});