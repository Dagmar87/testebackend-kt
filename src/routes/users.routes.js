const { Router } = require('express');
const pool = require('../config/db');
const router = Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.get('/health/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ db: 'ok' });
  } catch (err) {
    res.status(500).json({ db: 'error', message: err.message });
  }
});

module.exports = router;
