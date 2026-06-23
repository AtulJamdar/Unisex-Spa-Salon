const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { client: whatsappClient } = require('../whatsapp/client');
const sendConfirmation = require('../whatsapp/sendConfirmation');

// 1. POST / - Create a new booking with slot conflict validation
router.post('/', async (req, res) => {
  try {
    const { customerName, phoneNumber, service, staffName, date, timeSlot } = req.body;

    // Validate required fields
    if (!customerName || !phoneNumber || !service || !date || !timeSlot) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Query MongoDB for conflict: same service + date + timeSlot + staffName
    const conflict = await Booking.findOne({ service, date, timeSlot, staffName });
    if (conflict) {
      return res.status(409).json({ error: "This slot is already booked. Please choose another time." });
    }

    // Create and save new booking
    const newBooking = new Booking({
      customerName,
      phoneNumber,
      service,
      staffName,
      date,
      timeSlot
    });
    const savedBooking = await newBooking.save();

    // Call WhatsApp sendConfirmation
    try {
      await sendConfirmation(whatsappClient, savedBooking);
    } catch (whatsappErr) {
      console.error("WhatsApp notification failed:", whatsappErr);
    }

    return res.status(201).json({
      message: "Booking confirmed",
      booking: savedBooking
    });
  } catch (error) {
    console.error("Error in POST /api/bookings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 2. GET /slots - Get all booked slots for a given date and service
router.get('/slots', async (req, res) => {
  try {
    const { date, service } = req.query;

    const bookings = await Booking.find({ date, service });
    const bookedSlots = bookings.map(b => b.timeSlot);

    return res.status(200).json({ bookedSlots });
  } catch (error) {
    console.error("Error in GET /api/bookings/slots:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 3. GET /admin - List all bookings for a date, sorted by time slot ascending
router.get('/admin', async (req, res) => {
  try {
    let targetDate = req.query.date;

    // Default to today's date in YYYY-MM-DD local format if not provided
    if (!targetDate) {
      const today = new Date();
      const offset = today.getTimezoneOffset();
      const localToday = new Date(today.getTime() - (offset * 60 * 1000));
      targetDate = localToday.toISOString().split('T')[0];
    }

    const bookings = await Booking.find({ date: targetDate }).sort({ timeSlot: 1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error in GET /api/bookings/admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
