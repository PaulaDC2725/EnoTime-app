const test = require('node:test');
const assert = require('node:assert/strict');
const pool = require('../config/db');
const { registerLocal } = require('./authController');

test('registerLocal defaults missing employee fields and creates the account', async () => {
  const originalQuery = pool.query;
  const calls = [];

  pool.query = async (query, params) => {
    calls.push({ query, params });

    if (query.includes('SELECT * FROM user_account')) {
      return { rows: [] };
    }

    if (query.includes('INSERT INTO employee')) {
      return { rows: [{ employee_id: 42 }] };
    }

    return { rows: [] };
  };

  const req = {
    body: {
      email: 'jane@example.com',
      password: 'secret123',
      role: 'Employee',
    },
  };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };

  await registerLocal(req, res);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.body, { message: 'User and employee created successfully' });
  assert.equal(calls[1].params[0], 'jane@example.com');
  assert.equal(calls[1].params[1], 'jane@example.com');
  assert.equal(calls[1].params[2], 'Employee');
  assert.equal(calls[1].params[3], null);

  pool.query = originalQuery;
});
