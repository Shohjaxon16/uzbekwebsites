const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Faqat kerakli static fayllarni ko'rsatish
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/image', express.static(path.join(__dirname, 'image')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/saytlar.html', (req, res) => res.sendFile(path.join(__dirname, 'saytlar.html')));
app.get('/aloqa.html', (req, res) => res.sendFile(path.join(__dirname, 'aloqa.html')));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// Supabase ulanishi
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Supabase URL yoki Key topilmadi! .env faylni tekshiring.');
} else {
    console.log('🔗 Supabase-ga ulanishga urinish:', SUPABASE_URL);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Database test endpoint
app.get('/api/test-db', async (req, res) => {
    try {
        const { data, error } = await supabase.from('contacts').select('*').limit(1);
        if (error) throw error;
        res.json({ success: true, message: 'Supabase bilan aloqa yaxshi!', data });
    } catch (err) {
        console.error('Test DB Error:', err);
        res.status(500).json({ success: false, message: 'Supabase bilan aloqada xatolik', debug: err.message });
    }
});

// POST /api/message – xabarni Supabase-ga saqlash
app.post('/api/message', async (req, res) => {
    const { name, email, phone, site_name, site_url, site_category, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Ism va email kiritilishi shart' });
    }

    try {
        console.log('📝 Saving message to Supabase...', { name, email });

        const { data, error } = await supabase
            .from('contacts')
            .insert([
                {
                    name,
                    email,
                    phone: phone || '',
                    site_name: site_name || '',
                    site_url: site_url || '',
                    site_category: site_category || '',
                    message: message || ''
                }
            ]);

        if (error) {
            console.error('Supabase Insert Error:', error);
            return res.status(500).json({
                success: false,
                message: 'Bazaga yozishda xatolik',
                debug: error.message,
                details: error.details,
                hint: error.hint
            });
        }

        res.status(201).json({ success: true, message: 'Xabar muvaffaqiyatli saqlandi' });
    } catch (err) {
        console.error('Server Catch Error:', err);
        res.status(500).json({ success: false, message: 'Serverda kutilmagan xatolik', debug: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server http://localhost:${PORT}`));
