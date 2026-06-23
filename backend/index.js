const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookingsRouter = require('./routes/bookings');
const { getQR, isReady } = require('./whatsapp/client');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Mount the bookings router
app.use('/api/bookings', bookingsRouter);

app.get('/whatsapp-setup', (req, res) => {
  if (isReady()) {
    return res.send(`
      <html>
        <body style="background:#1A1A1A; color:#C9A84C; font-family:sans-serif; text-align:center; padding:60px">
          <h1>✅ WhatsApp is Connected!</h1>
          <p style="color:#F5F0E8">Impression Salon's WhatsApp is linked and ready to send confirmations.</p>
          <p style="color:#888">You can close this page.</p>
        </body>
      </html>
    `);
  }

  const qr = getQR();
  if (!qr) {
    return res.send(`
      <html>
        <body style="background:#1A1A1A; color:#C9A84C; font-family:sans-serif; text-align:center; padding:60px">
          <h1>⏳ Generating QR Code...</h1>
          <p style="color:#F5F0E8">Please wait and refresh this page in 10 seconds.</p>
          <script>setTimeout(() => location.reload(), 5000)</script>
        </body>
      </html>
    `);
  }

  res.send(`
    <html>
      <body style="background:#1A1A1A; color:#C9A84C; font-family:sans-serif; text-align:center; padding:60px">
        <h1>📱 Link Impression Salon WhatsApp</h1>
        <p style="color:#F5F0E8; margin-bottom:30px">
          Open WhatsApp on your phone → Settings → Linked Devices → Link a Device → Scan this code
        </p>
        <img src="${qr}" style="border-radius:12px; border: 3px solid #C9A84C" />
        <p style="color:#888; margin-top:20px; font-size:14px">This page auto-refreshes every 30 seconds</p>
        <script>setTimeout(() => location.reload(), 30000)</script>
      </body>
    </html>
  `);
});

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
