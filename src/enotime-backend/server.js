require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db'); 

const authRoutes = require('./src/routes/authRoutes'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('API de EnoTime funcionando correctamente');
});

const employeeRoutes = require('./src/routes/employeeRoutes'); 

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server run on http://localhost:${PORT}`);
});
app.use('/api/employees', employeeRoutes);