'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BookingConfirmedPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Check both 'lastBooking' and 'latestBooking' keys for safety and compatibility
      const storedBooking = sessionStorage.getItem('lastBooking') || sessionStorage.getItem('latestBooking');
      if (storedBooking) {
        setBooking(JSON.parse(storedBooking));
      }
    } catch (err) {
      console.error("Error parsing booking from session storage:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-salon-dark text-salon-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-salon-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-salon-muted">Loading your booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-salon-dark text-salon-cream flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-salon-gray border border-salon-gray/70 rounded-3xl p-8 md:p-10 shadow-2xl text-center">
        {booking ? (
          <div>
            {/* Large Checkmark Icon */}
            <div className="w-20 h-20 bg-salon-gold/10 border border-salon-gold/30 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              ✅
            </div>

            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-black text-salon-cream tracking-tight mb-2">
              Booking Confirmed!
            </h1>

            {/* Subtext */}
            <p className="text-xs text-salon-muted mb-8 leading-relaxed max-w-xs mx-auto">
              A WhatsApp confirmation has been sent to your number.
            </p>

            {/* Booking Details Summary Card */}
            <div className="bg-salon-dark/80 border border-salon-dark rounded-2xl p-6 text-left space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-lg">💇</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-salon-muted block font-semibold">Service</span>
                  <span className="text-sm font-bold text-salon-gold leading-tight">{booking.service}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">👤</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-salon-muted block font-semibold">Staff</span>
                  <span className="text-sm font-semibold text-salon-cream/90 leading-tight">
                    {booking.staffName || 'Our Team'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">📅</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-salon-muted block font-semibold">Date</span>
                  <span className="text-sm font-semibold text-salon-cream/90 leading-tight">{booking.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg">⏰</span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-salon-muted block font-semibold">Time Slot</span>
                  <span className="text-sm font-bold text-salon-gold leading-tight">{booking.timeSlot}</span>
                </div>
              </div>
            </div>

            {/* Home Link */}
            <Link
              href="/"
              className="block w-full py-3.5 bg-salon-gold hover:bg-salon-gold-light text-salon-dark font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300 shadow-md shadow-salon-gold/10"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div>
            {/* Warning / Empty Icon */}
            <div className="w-16 h-16 bg-red-950/20 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              ⚠️
            </div>

            {/* Heading */}
            <h1 className="text-xl font-bold text-salon-cream tracking-tight mb-3">
              No booking found.
            </h1>

            {/* Subtext */}
            <p className="text-xs text-salon-muted mb-8 leading-relaxed max-w-xs mx-auto">
              We couldn't retrieve any recent session booking details. Try making a new reservation.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/book"
                className="block w-full py-3.5 bg-salon-gold hover:bg-salon-gold-light text-salon-dark font-bold text-sm tracking-wider uppercase rounded-xl transition duration-300"
              >
                Book an Appointment
              </Link>
              <Link
                href="/"
                className="block w-full py-3.5 border border-salon-cream/20 hover:bg-salon-cream/5 text-salon-cream font-semibold text-sm tracking-wider uppercase rounded-xl transition duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
