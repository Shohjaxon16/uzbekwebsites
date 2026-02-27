/* ============================================================
   TopUzbekSites — Backend Server (PostgreSQL)
   ============================================================
   Node.js + Express + PostgreSQL

   API Endpoints:
     POST /api/message   — Aloqa formasi (bog'lanish + sayt qo'shish)
     GET  /api/messages  — Barcha xabarlarni ko'rish
   ============================================================ */

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;


/* ==========  POSTGRESQL ULANISH  ========== */
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'topuzbeksites',
    password: '2010',
    port: 5432
});

// Ulanishni tekshirish
pool.query('SELECT NOW()')
    .then(() => console.log('  ✅ PostgreSQL ga muvaffaqiyatli ulandi'))
    .catch(err => {
        console.error('  ❌ PostgreSQL ulanish xatoligi:', err.message);
        process.exit(1);
    });


/* ==========  MIDDLEWARE  ========== */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statik fayllarni xizmat qilish
app.use(express.static(__dirname));


/* ==========  YORDAMCHI FUNKSIYALAR  ========== */

/**
 * Email formatini tekshirish
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * URL formatini tekshirish
 */
function isValidUrl(url) {
    return /^https?:\/\/.+\..+/.test(url);
}


/* ==========  API ENDPOINTS  ========== */

/**
 * POST /api/message
 * Birlashtirilgan forma — bog'lanish + sayt qo'shish
 * Body: { name, email, phone?, site_name?, site_url?, site_category?, message? }
 */
app.post('/api/message', async (req, res) => {
    try {
        const { name, email, phone, site_name, site_url, site_category, message } = req.body;

        // Validatsiya
        const errors = [];

        if (!name || !name.trim()) {
            errors.push('Ismingizni kiriting');
        }

        if (!email || !isValidEmail(email.trim())) {
            errors.push("To'g'ri email manzil kiriting");
        }

        // Agar sayt URL kiritilgan bo'lsa, tekshirish
        if (site_url && site_url.trim() && !isValidUrl(site_url.trim())) {
            errors.push("To'g'ri sayt URL kiriting (https://...)");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validatsiya xatoligi',
                errors
            });
        }

        // PostgreSQL ga saqlash
        const result = await pool.query(
            `INSERT INTO messages (name, email, phone, site_name, site_url, site_category, message)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING id, created_at`,
            [
                name.trim(),
                email.trim(),
                (phone || '').trim() || null,
                (site_name || '').trim() || null,
                (site_url || '').trim() || null,
                (site_category || '').trim() || null,
                (message || '').trim() || null
            ]
        );

        const saved = result.rows[0];
        console.log(`  📩 Yangi xabar #${saved.id}: ${name.trim()} (${email.trim()})`);

        return res.status(201).json({
            success: true,
            message: "Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.",
            data: { id: saved.id, created_at: saved.created_at }
        });

    } catch (err) {
        console.error('  ❌ Xatolik:', err.message);
        return res.status(500).json({
            success: false,
            message: "Serverda xatolik yuz berdi. Qaytadan urinib ko'ring."
        });
    }
});


/**
 * GET /api/messages
 * Barcha xabarlarni ko'rish (pgAdmin dan ham ko'rish mumkin)
 */
app.get('/api/messages', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM messages ORDER BY created_at DESC'
        );

        res.json({
            success: true,
            count: result.rowCount,
            data: result.rows
        });
    } catch (err) {
        console.error('  ❌ Xatolik:', err.message);
        res.status(500).json({
            success: false,
            message: "Ma'lumotlarni olishda xatolik"
        });
    }
});


/* ==========  SERVER ISHGA TUSHIRISH  ========== */
app.listen(PORT, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════════╗');
    console.log('  ║                                              ║');
    console.log(`  ║   🚀 TopUzbekSites Server (PostgreSQL)       ║`);
    console.log(`  ║   📡 http://localhost:${PORT}                   ║`);
    console.log('  ║                                              ║');
    console.log('  ╚══════════════════════════════════════════════╝');
    console.log('');
    console.log('  API:');
    console.log('  ├─ POST /api/message   — Xabar yuborish');
    console.log('  └─ GET  /api/messages  — Xabarlar ro\'yxati');
    console.log('');
    console.log('  💡 pgAdmin da "topuzbekdb" bazasini oching');
    console.log('     → Schemas → public → Tables → messages');
    console.log('');
});
