const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta: POST /api/auth/login/local
// Uso: Login con formulario propio (correo y contraseña)
router.post('/login/local', authController.loginLocal);

// Ruta: POST /api/auth/login/sso
// Uso: Login silencioso cuando Google/Microsoft valida al usuario
router.post('/login/sso', authController.loginSSO);

// Ruta: POST /api/auth/register
// Uso: Crear una nueva cuenta localmente
router.post('/register', authController.registerLocal);

module.exports = router;