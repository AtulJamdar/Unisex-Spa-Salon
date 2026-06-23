const isWhatsAppEnabled = process.env.ENABLE_WHATSAPP === 'true';

let client = null;
let lastQR = null;
let isReady = false;

if (isWhatsAppEnabled) {
  const { Client, LocalAuth } = require('whatsapp-web.js');
  const qrcode = require('qrcode');

  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--no-zygote', '--disable-gpu']
    }
  });

  client.on('qr', async (qr) => {
    lastQR = await qrcode.toDataURL(qr);
    isReady = false;
  });

  client.on('ready', () => {
    isReady = true;
    lastQR = null;
    console.log('✅ WhatsApp ready');
  });

  client.initialize();
}

module.exports = { client, getQR: () => lastQR, isReady: () => isReady };