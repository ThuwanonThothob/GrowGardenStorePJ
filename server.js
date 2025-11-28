//==SERVER.js==
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

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
    console.log('เชื่อมต่อ MySQL สำเร็จ ✅');

    // =========================
    // Users API
    // =========================
    // POST สมัครสมาชิก
app.post('/api/users', async (req, res) => {
  console.log('ข้อมูลที่ server รับ:', req.body);
  try {
    const { firstName, lastName, gender, age, address, province, email, password } = req.body;

    // ตรวจสอบ email ซ้ำ
    const [existing] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'อีเมลนี้ถูกใช้แล้ว' });
    }

    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, gender, age, address, province, email, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, gender, age, address, province, email, password]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
});


    // GET users ทั้งหมด (สำหรับ debug/admin)
    app.get('/api/users', async (req, res) => {
      try {
        const [rows] = await db.query(`SELECT * FROM users`);
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // =========================
    // Orders API
    // =========================
    // POST สั่งซื้อ
    app.post('/api/orders', async (req, res) => {
      try {
        const { userId, total, items } = req.body;
        const [result] = await db.query(
          `INSERT INTO orders (user_id, total, items, created_at) VALUES (?, ?, ?, CONVERT_TZ(NOW(), '+00:00', '+07:00'))`,
          [userId, total, JSON.stringify(items)]
        );
        res.json({ id: result.insertId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });


    // GET orders ของ user
    app.get('/api/orders/:userId', async (req, res) => {
      try {
        const userId = req.params.userId;
        const [rows] = await db.query(
          `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
          [userId]
        );
        const orders = rows.map(r => ({ ...r, items: JSON.parse(r.items) }));
        res.json(orders);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // GET orders ทั้งหมด (Admin)
    app.get('/api/all-orders', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.id, o.user_id, o.total, o.items, o.created_at,
            u.first_name, u.last_name, u.email, u.address, u.province
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    //console.log(rows); // <-- เช็คว่ามี email มาด้วยไหม

    const orders = rows.map(r => ({
      id: r.id,
      user_id: r.user_id,
      last_name: r.last_name,
      first_name: r.first_name,
      email: r.email,  // <-- ต้องมี
      address: r.address,
      province: r.province,
      total: r.total,
      created_at: r.created_at,
      items: JSON.parse(r.items)
    }));

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



    // =========================
    // Start server
    // =========================
    app.listen(PORT, () => console.log(`Server รันที่ http://localhost:${PORT}`));

  } catch (err) {
    console.error("เชื่อมต่อ MySQL ไม่สำเร็จ:", err);
  }
})();