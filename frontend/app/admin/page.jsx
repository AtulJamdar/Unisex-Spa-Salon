'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get local today's date in YYYY-MM-DD format
  const getTodayString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
    return localToday.toISOString().split('T')[0];
  };

  // Initialize date on mount
  useEffect(() => {
    setSelectedDate(getTodayString());
  }, []);

  // Fetch bookings for the selected date
  const fetchBookings = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/admin?date=${selectedDate}`);
      if (!response.ok) {
        throw new Error(`Server returned code ${response.status}`);
      }
      const data = await response.json();
      if (data && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Error fetching admin bookings:", err);
      setError("Could not connect to the booking server. Please ensure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when date changes
  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-salon-dark text-salon-cream pb-16 selection:bg-salon-gold selection:text-salon-dark">
      {/* NAVBAR */}
      <nav className="bg-salon-dark/95 border-b border-salon-gray/50 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-bold tracking-widest text-salon-gold">IMPRESSION</span>
            <span className="text-[9px] tracking-[0.25em] text-salon-cream/60 uppercase">Admin Dashboard</span>
          </Link>
          <Link
            href="/"
            className="px-4 py-2 border border-salon-cream/20 hover:bg-salon-cream/5 rounded-full text-xs font-bold transition duration-300"
          >
            Back to Website
          </Link>
        </div>
      </nav>

      {/* DASHBOARD BODY */}
      <main className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-salon-gray border border-salon-gray/70 p-6 rounded-3xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-salon-cream">
              Appointments Log
            </h1>
            <p className="text-xs text-salon-muted mt-1">
              Manage and view daily booking schedules for Impression Salon
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Date Picker */}
            <div className="flex items-center gap-2 bg-salon-dark p-1.5 rounded-xl border border-salon-dark">
              <span className="text-xs text-salon-muted font-bold uppercase pl-2 select-none">Date</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-salon-cream outline-none border-none text-xs font-bold p-1 w-32 font-sans"
              />
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchBookings}
              className="p-3 bg-salon-gold hover:bg-salon-gold-light text-salon-dark rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-salon-gold/5"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-8">
            ⚠️ {error}
          </div>
        )}

        {/* DATA TABLE CONTAINER */}
        <div className="bg-salon-gray border border-salon-gray/70 rounded-3xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="text-center py-20 text-salon-gold animate-pulse text-sm">
              Loading appointments schedule...
            </div>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-salon-dark text-[10px] uppercase tracking-wider text-salon-muted font-black border-b border-salon-gray/70">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Phone Number</th>
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Assigned Staff</th>
                    <th className="py-4 px-6">Time Slot</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-salon-gray/40 text-sm text-salon-cream/90">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-salon-dark/25 transition">
                      <td className="py-4 px-6 font-bold">{booking.customerName}</td>
                      <td className="py-4 px-6 text-xs text-salon-muted font-mono">{booking.phoneNumber}</td>
                      <td className="py-4 px-6 font-semibold text-salon-gold">{booking.service}</td>
                      <td className="py-4 px-6 text-xs text-salon-cream/80">
                        {booking.staffName || 'Our Team'}
                      </td>
                      <td className="py-4 px-6 font-bold text-salon-gold-light">{booking.timeSlot}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-20 text-salon-muted text-sm">
              No bookings recorded for this date.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
