const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Comprobamos que la conexión funcione
pool.connect()
  .then(() => console.log('✅ Conexión exitosa a PostgreSQL'))
  .catch(err => console.error('❌ Error conectando a PostgreSQL:', err.stack));

module.exports = pool;