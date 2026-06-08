const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Función auxiliar para generar el Token JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user.user_id, 
      role: user.role_name,
      employeeId: user.employee_id 
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' } // El token expira en 8 horas
  );
};

// ---------------------------------------------------------------------
// 1. LOGIN TRADICIONAL (Correo + Contraseña)
// ---------------------------------------------------------------------
const loginLocal = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const result = await pool.query('SELECT * FROM user_account WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];

    // Verificar si la cuenta solo tiene SSO y no contraseña local
    if (!user.password_hash) {
      return res.status(400).json({ 
        error: 'Esta cuenta utiliza autenticación externa. Por favor, usa el inicio de sesión con Google/Microsoft.' 
      });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Actualizar la fecha del último login
    await pool.query('UPDATE user_account SET last_login_at = CURRENT_TIMESTAMP WHERE user_id = $1', [user.user_id]);

    // Generar y enviar el token
    const token = generateToken(user);
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user.user_id, email: user.email, role: user.role_name }
    });

  } catch (error) {
    console.error('Error en loginLocal:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// ---------------------------------------------------------------------
// 2. LOGIN CON SSO (Google / Microsoft)
// ---------------------------------------------------------------------
const loginSSO = async (req, res) => {
  const { email, externalId } = req.body;

  if (!email || !externalId) {
    return res.status(400).json({ error: 'Faltan datos de autenticación externa' });
  }

  try {
    // Buscar por correo o por el ID externo
    const result = await pool.query(
      'SELECT * FROM user_account WHERE email = $1 OR external_id = $2', 
      [email, externalId]
    );

    let user;

    if (result.rows.length > 0) {
      user = result.rows[0];

      // Si el usuario existe pero no tenía el ID externo guardado, se lo vinculamos
      if (!user.external_id) {
        const updateResult = await pool.query(
          'UPDATE user_account SET external_id = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 RETURNING *',
          [externalId, user.user_id]
        );
        user = updateResult.rows[0];
      }
    } else {
      // Registrar al usuario automáticamente si entra por SSO por primera vez
      const newUserResult = await pool.query(
        `INSERT INTO user_account (email, external_id, role_name, profile_completed) 
         VALUES ($1, $2, 'Empleado', FALSE) RETURNING *`,
        [email, externalId]
      );
      user = newUserResult.rows[0];
    }

    await pool.query('UPDATE user_account SET last_login_at = CURRENT_TIMESTAMP WHERE user_id = $1', [user.user_id]);

    const token = generateToken(user);
    res.json({
      message: 'Inicio de sesión SSO exitoso',
      token,
      user: { id: user.user_id, email: user.email, role: user.role_name }
    });

  } catch (error) {
    console.error('Error en loginSSO:', error);
    res.status(500).json({ error: 'Error validando identidad externa' });
  }
};

// ---------------------------------------------------------------------
// 3. REGISTRO LOCAL (Para que puedas crear usuarios de prueba)
// ---------------------------------------------------------------------
const registerLocal = async (req, res) => {
  const { email, password, role, employeeId } = req.body;

  try {
    // Verificar si el correo ya existe
    const userExists = await pool.query('SELECT 1 FROM user_account WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userRole = role || 'Empleado';

    // Guardar en la base de datos
    const newUser = await pool.query(
      `INSERT INTO user_account (email, password_hash, role_name, employee_id) 
       VALUES ($1, $2, $3, $4) RETURNING user_id, email, role_name`,
      [email, hashedPassword, userRole, employeeId || null]
    );

    res.status(201).json({
      message: 'Usuario creado con éxito',
      user: newUser.rows[0]
    });
  } catch (error) {
    console.error('Error en registerLocal:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

module.exports = { loginLocal, loginSSO, registerLocal };