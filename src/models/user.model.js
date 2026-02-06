const pool = require('../config/db');

const User = {
  async create({ name, email, password }) {
    const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findAll() {
    const { rows } = await pool.query('SELECT id, name, email, created_at FROM users ORDER BY id ASC');
    return rows;
  },

  async findById(id) {
    const { rows } = await pool.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
    return rows[0];
  },

  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows[0];
  },

  async update(id, { name, email }) {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email, created_at';
    const values = [name, email, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async delete(id) {
    const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return rows[0];
  }
};

module.exports = User;
