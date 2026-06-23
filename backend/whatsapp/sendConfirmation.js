async function sendConfirmation(client, booking) {
  if (!client) {
    console.log('WhatsApp disabled — skipping confirmation for:', booking.customerName);
    return;
  }
  try {
    const { customerName, phoneNumber, service, staffName, date, timeSlot } = booking;
    const phone = phoneNumber.replace(/\D/g, '') + '@c.us';
    const message = `✨ IMPRESSION UNISEX SPA & SALON ✨\n\nHi ${customerName}, your appointment is confirmed! 🎉\n\n💇 Service: ${service}\n👤 Staff: ${staffName || 'Our Team'}\n📅 Date: ${date}\n⏰ Time: ${timeSlot}\n📍 Sun City Rd, Anand Nagar, Pune 411051\n\nShow this message at the front desk.\nSee you soon! 🌟\n\n— Impression Salon Team\n📞 087679 74524`;
    await client.sendMessage(phone, message);
  } catch (err) {
    console.error('WhatsApp send failed:', err.message);
  }
}

module.exports = sendConfirmation;