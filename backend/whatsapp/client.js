const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

let lastQR = null;

// Initialize the WhatsApp client with LocalAuth to persist session credentials
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    ]
  }
});

// Track ready status dynamically on the client instance
client.isReady = false;

client.on('qr', async (qr) => {
  try {
    lastQR = await qrcode.toDataURL(qr);
    client.isReady = false;
    console.log('New QR generated — open /whatsapp-setup to scan');
  } catch (err) {
    console.error('Failed to generate QR data URL:', err);
  }
});

client.on('ready', () => {
  client.isReady = true;
  lastQR = null;
  console.log('✅ WhatsApp client is ready');
});

client.on('auth_failure', () => {
  client.isReady = false;
  console.log('❌ WhatsApp auth failed');
});

client.on('disconnected', (reason) => {
  client.isReady = false;
  console.log('❌ WhatsApp client disconnected:', reason);
});

client.initialize();

module.exports = { client, getQR: () => lastQR, isReady: () => client.isReady };
