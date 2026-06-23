const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  staffName: {
    type: String
  },
  date: {
    type: String,
    required: true // Format: "YYYY-MM-DD"
  },
  timeSlot: {
    type: String,
    required: true // Format: "10:00 AM"
  },
  status: {
    type: String,
    default: "Confirmed"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
