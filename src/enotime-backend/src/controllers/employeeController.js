const pool = require('../config/db');

const getAllEmployees = async (req, res) => {
  try {
    const query = `
      SELECT 
        e.employee_id, e.full_name, e.email, e.position_title, e.hire_date, e.manager_id, e.created_at, u.role_name 
      FROM employee e
      LEFT JOIN user_account u ON e.employee_id = u.employee_id
      ORDER BY e.created_at DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { full_name, position_title, manager_id, hire_date, role } = req.body;

  try {
    await pool.query(
      `UPDATE employee SET full_name = $1, position_title = $2, manager_id = $3, hire_date = $4 WHERE employee_id = $5`,
      [full_name, position_title, manager_id || null, hire_date, id]
    );
    await pool.query(
      `UPDATE user_account SET role_name = $1 WHERE employee_id = $2`,
      [role, id]
    );
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating employee' });
  }
};

module.exports = { getAllEmployees, updateEmployee };