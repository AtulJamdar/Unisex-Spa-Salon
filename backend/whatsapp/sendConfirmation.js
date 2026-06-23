async function sendConfirmation(client, booking) {
  try {
    // Check if the WhatsApp client is initialized and ready
    if (!client || !client.isReady) {
      console.warn("⚠️ WhatsApp client is not ready. Skipping confirmation message.");
      return;
    }

    const { customerName, phoneNumber, service, staffName, date, timeSlot } = booking;
    
    // Format phone number for whatsapp-web.js (removes non-digits and appends @c.us)
    const formattedPhone = phoneNumber.replace(/\D/g, '') + '@c.us';
    
    const message = `✨ IMPRESSION UNISEX SPA & SALON ✨

Hi ${customerName}, your appointment is confirmed! 🎉

💇 Service: ${service}
👤 Staff: ${staffName || 'Our Team'}
📅 Date: ${date}
⏰ Time: ${timeSlot}
📍 Location: Sun City Rd, Anand Nagar, Pune 411051

Please show this message at the front desk on arrival.
See you soon! 🌟

— Impression Salon Team
📞 087679 74524`;
    
    await client.sendMessage(formattedPhone, message);
  } catch (error) {
    console.error('Failed to send WhatsApp confirmation:', error);
  }
}

module.exports = sendConfirmation;
