const express = require('express');
const router = express.Router();
const { getAllEmployees, updateEmployee } = require('../controllers/employeeController');

router.get('/', getAllEmployees);
router.put('/:id', updateEmployee);

module.exports = router;