//== SERVER.js (เวอร์ชันแก้แล้ว – รันได้ 100% บน Node.js v24) ==
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

// วิธีที่ 1 (แนะนำที่สุด): ใช้แบบนี้แทน app.options('*', cors())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  // ใส่ OPTIONS ตรงนี้เลย
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ลบบรรทัดนี้ออกไปเลย (ตัวการที่ทำให้ error ใน Node.js ใหม่)
 // app.options('*', cors());   ← ลบอันนี้ออกไป!

let db;

(async () => {
  try {
    db = await mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'GrowGardenDB',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('เชื่อมต่อ MySQL สำเร็จ');

    // ==================== Users API ====================
    app.post('/api/users', async (req, res) => {
      try {
        const { firstName, lastName, gender, age, address, province, email, password } = req.body;

        const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) return res.status(400).json({ error: 'อีเมลนี้ถูกใช้แล้ว' });

        const [result] = await db.query(
          `INSERT INTO users (first_name, last_name, gender, age, address, province, email, password)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [firstName, lastName, gender, age, address, province, email, password]
        );

        res.json({ id: result.insertId });
      } catch (err) {
        console.error('Error POST /api/users:', err);
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/api/users', async (req, res) => {
      try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // ==================== Orders API ====================
    app.post('/api/orders', async (req, res) => {
      try {
        const { userId, total, items } = req.body;
        const [result] = await db.query(
          `INSERT INTO orders (user_id, total, items, created_at)
           VALUES (?, ?, ?, CONVERT_TZ(NOW(), '+00:00', '+07:00'))`,
          [userId, total, JSON.stringify(items)]
        );
        res.json({ id: result.insertId });
      } catch (err) {
        console.error('Error POST /api/orders:', err);
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/api/orders/:userId', async (req, res) => {
      try {
        const [rows] = await db.query(
          'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
          [req.params.userId]
        );
        const orders = rows.map(r => ({
          ...r,
          items: JSON.parse(r.items),
          total: parseFloat(r.total)
        }));
        res.json(orders);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/api/all-orders', async (req, res) => {
      try {
        const [rows] = await db.query(`
          SELECT o.*, u.first_name, u.last_name, u.email, u.address, u.province
          FROM orders o
          JOIN users u ON o.user_id = u.id
          ORDER BY o.created_at DESC
        `);

        const orders = rows.map(r => ({
          ...r,
          items: JSON.parse(r.items),
          total: parseFloat(r.total)
        }));

        res.json(orders);
      } catch (err) {
        console.error('Error GET /api/all-orders:', err);
        res.status(500).json({ error: err.message });
      }
    });

    app.get('/', (req, res) => {
      res.send('<h1>GrowGarden Backend พร้อมแล้ว!</h1>');
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server รันที่ http://localhost:${PORT}`);
      console.log('ต่อไปรัน: ngrok http 3001');
    });

  } catch (err) {
    console.error('เชื่อมต่อ MySQL ไม่สำเร็จ:', err);
  }
})();