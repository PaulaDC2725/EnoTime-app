const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.user_id,
      role: user.role_name,
      employeeId: user.employee_id,
      email: user.email,
      fullName: user.full_name || user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

const loginLocal = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT u.*, e.full_name
       FROM user_account u
       LEFT JOIN employee e ON e.employee_id = u.employee_id
       WHERE u.email = $1`,
      [email]
    );
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const user = result.rows[0];
    let validPassword = false;

    if (user.password_hash.startsWith('$2b$')) {
      validPassword = await bcrypt.compare(password, user.password_hash);
    } else {
      validPassword = (password === user.password_hash);
    }

    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken(user);
    res.json({
      token,
      user: {
        email: user.email,
        role: user.role_name,
        fullName: user.full_name || user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginSSO = async (req, res) => { res.json({ message: 'SSO endpoint configured' }); };

const registerLocal = async (req, res) => {
  const { email, password, role, full_name, position_title, manager_id, hire_date } = req.body;

  try {
    const existingUser = await pool.query('SELECT * FROM user_account WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) return res.status(400).json({ error: 'User already exists' });

    const empResult = await pool.query(
      `INSERT INTO employee (full_name, email, position_title, manager_id, hire_date) 
       VALUES ($1, $2, $3, $4, $5) RETURNING employee_id`,
      [full_name, email, position_title, manager_id || null, hire_date || new Date()]
    );

    const newEmployeeId = empResult.rows[0].employee_id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      `INSERT INTO user_account (employee_id, email, password_hash, role_name) VALUES ($1, $2, $3, $4)`,
      [newEmployeeId, email, hashedPassword, role]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

module.exports = { loginLocal, loginSSO, registerLocal };