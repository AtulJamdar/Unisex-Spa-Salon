'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const services = [
  { id: 1, category: "Hair", name: "Haircut (Men)", staff: "Rahul", price: 299, duration: "30 min" },
  { id: 2, category: "Hair", name: "Haircut (Women)", staff: "Ms. Anjali", price: 499, duration: "45 min" },
  { id: 3, category: "Hair", name: "Hair Highlights", staff: "Ms. Anjali", price: 1499, duration: "90 min" },
  { id: 4, category: "Hair", name: "Hair Botox", staff: "Ms. Anjali", price: 2499, duration: "120 min" },
  { id: 5, category: "Hair", name: "Head Massage", staff: "Rahul", price: 399, duration: "30 min" },
  { id: 6, category: "Skin", name: "Facial", staff: "Our Team", price: 799, duration: "60 min" },
  { id: 7, category: "Skin", name: "Gel Nails", staff: "Our Team", price: 899, duration: "60 min" },
  { id: 8, category: "Bridal", name: "Bridal Makeup", staff: "Ms. Anjali", price: 8999, duration: "180 min" },
  { id: 9, category: "Bridal", name: "Bridal Package", staff: "Ms. Anjali", price: 14999, duration: "Full Day" },
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
  "7:00 PM", "8:00 PM", "9:00 PM"
];

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Selection states
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  
  // Slots fetched from backend
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotFetchError, setSlotFetchError] = useState("");

  // Customer states
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Error / Submit states
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get local today's date in YYYY-MM-DD format
  const getTodayString = () => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
    return localToday.toISOString().split('T')[0];
  };

  const todayStr = getTodayString();

  // Fetch booked slots when date or service changes
  useEffect(() => {
    if (selectedDate && selectedService) {
      setSlotsLoading(true);
      setSlotFetchError("");
      setBookedSlots([]);
      setSelectedSlot("");
      
      const serviceName = encodeURIComponent(selectedService.name);
      fetch(`http://localhost:5000/api/bookings/slots?date=${selectedDate}&service=${serviceName}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Server returned code ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.bookedSlots) {
            setBookedSlots(data.bookedSlots);
          }
        })
        .catch((err) => {
          console.error("Error fetching booked slots:", err);
          setSlotFetchError("Could not connect to the booking server. Please ensure the backend server is running on port 5000.");
        })
        .finally(() => {
          setSlotsLoading(false);
        });
    }
  }, [selectedDate, selectedService]);

  // Filters services by category
  const filteredServices = categoryFilter === "All"
    ? services
    : services.filter(s => s.category.toLowerCase() === categoryFilter.toLowerCase());

  // Handle service selection
  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  // Handle form submission (Confirm Booking)
  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || phoneNumber.length !== 10) {
      setSubmitError("Please provide a valid name and 10-digit phone number.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    const bookingPayload = {
      customerName: customerName.trim(),
      phoneNumber: "+91" + phoneNumber.trim(),
      service: selectedService.name,
      staffName: selectedService.staff,
      date: selectedDate,
      timeSlot: selectedSlot
    };

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingPayload)
      });

      const data = await response.json();

      if (response.status === 201) {
        // Save to sessionStorage for confirmation summary page
        sessionStorage.setItem("latestBooking", JSON.stringify(data.booking));
        sessionStorage.setItem("lastBooking", JSON.stringify(data.booking));
        router.push("/booking-confirmed");
      } else if (response.status === 409) {
        setSubmitError("This slot is already booked. Please choose another time.");
      } else {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting booking:", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-salon-dark text-salon-cream selection:bg-salon-gold selection:text-salon-dark pb-16">
      {/* HEADER NAVBAR */}
      <header className="w-full bg-salon-dark/95 border-b border-salon-gray/50 px-6 py-4 md:px-12">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="text-lg font-bold tracking-widest text-salon-gold">IMPRESSION</span>
            <span className="text-[9px] tracking-widest text-salon-cream/60 uppercase">Spa & Salon</span>
          </Link>
          <Link href="/" className="text-xs text-salon-gold hover:text-salon-gold-light transition">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-8">
        {/* PROGRESS INDICATOR */}
        <div className="mb-10 bg-salon-gray/40 border border-salon-gray/60 rounded-2xl p-6">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-salon-gray -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-salon-gold -translate-y-1/2 z-0 transition-all duration-500" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {/* Step 1 indicator */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= 1 ? 'bg-salon-gold text-salon-dark ring-4 ring-salon-gold/20' : 'bg-salon-gray text-salon-muted'
              }`}>
                1
              </div>
              <span className={`text-[10px] mt-2 font-semibold tracking-wider uppercase ${step >= 1 ? 'text-salon-gold' : 'text-salon-muted'}`}>
                Services
              </span>
            </div>

            {/* Step 2 indicator */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= 2 ? 'bg-salon-gold text-salon-dark ring-4 ring-salon-gold/20' : 'bg-salon-gray text-salon-muted'
              }`}>
                2
              </div>
              <span className={`text-[10px] mt-2 font-semibold tracking-wider uppercase ${step >= 2 ? 'text-salon-gold' : 'text-salon-muted'}`}>
                Date & Time
              </span>
            </div>

            {/* Step 3 indicator */}
            <div className="z-10 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step >= 3 ? 'bg-salon-gold text-salon-dark ring-4 ring-salon-gold/20' : 'bg-salon-gray text-salon-muted'
              }`}>
                3
              </div>
              <span className={`text-[10px] mt-2 font-semibold tracking-wider uppercase ${step >= 3 ? 'text-salon-gold' : 'text-salon-muted'}`}>
                Details
              </span>
            </div>
          </div>
        </div>

        {/* CONTAINER FOR ACTIVE WIZARD STEP */}
        <div className="bg-salon-gray border border-salon-gray/70 rounded-3xl p-6 md:p-10 shadow-2xl relative">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 1 && (
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-6">Select a Service</h2>
              
              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-salon-dark pb-4">
                {["All", "Hair", "Skin", "Bridal", "Academy"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                      categoryFilter === cat
                        ? 'bg-salon-gold text-salon-dark shadow-md'
                        : 'bg-salon-dark hover:bg-salon-dark/70 text-salon-cream/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Service Cards Grid */}
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {filteredServices.map((service) => {
                    const isSelected = selectedService?.id === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => handleSelectService(service)}
                        className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                          isSelected
                            ? 'bg-salon-gold/10 border-salon-gold shadow-lg shadow-salon-gold/5'
                            : 'bg-salon-dark border-salon-dark hover:border-salon-cream/20'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-base text-salon-cream">{service.name}</h3>
                          <span className="text-salon-gold font-extrabold text-sm">₹{service.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-salon-muted">
                          <span>Staff: <strong className="text-salon-cream/85">{service.staff}</strong></span>
                          <span>⏳ {service.duration}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-salon-muted">
                  No services available in this category for the demo.
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DATE & TIME SELECTION */}
          {step === 2 && (
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-2">Choose Date & Time</h2>
              <p className="text-xs text-salon-gold mb-6 font-semibold">
                Service: {selectedService?.name} (₹{selectedService?.price})
              </p>

              {/* Date Input Selector */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider text-salon-muted mb-2 font-bold">
                  Select Appointment Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-salon-dark text-salon-cream border border-salon-dark hover:border-salon-gold/40 focus:border-salon-gold rounded-xl p-3 outline-none transition font-sans text-sm"
                />
              </div>

              {/* Time Slots Selector */}
              {selectedDate ? (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-salon-muted mb-3 font-bold">
                    Select Available Time Slot
                  </label>

                  {slotsLoading ? (
                    <div className="text-center py-8 text-salon-gold text-sm animate-pulse">
                      Checking slot availability...
                    </div>
                  ) : slotFetchError ? (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/35 text-red-400 text-xs font-semibold mb-4">
                      ⚠️ {slotFetchError}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {TIME_SLOTS.map((slot) => {
                        const isBooked = bookedSlots.includes(slot);
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            disabled={isBooked}
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-3 px-2 rounded-xl text-xs font-bold transition duration-200 border ${
                              isBooked
                                ? 'bg-salon-dark/30 border-salon-dark text-salon-muted cursor-not-allowed line-through'
                                : isSelected
                                  ? 'bg-salon-gold text-salon-dark border-salon-gold shadow-md'
                                  : 'bg-salon-dark border-salon-dark hover:border-salon-gold/45 text-salon-cream'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-10 bg-salon-dark/40 border border-dashed border-salon-dark rounded-2xl text-salon-muted text-sm">
                  Please select a date first to view available time slots.
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CUSTOMER DETAILS */}
          {step === 3 && (
            <div>
              <h2 className="text-xl md:text-2xl font-black mb-2">Your Information</h2>
              <div className="bg-salon-dark/70 rounded-2xl p-4 border border-salon-dark mb-6 text-xs text-salon-cream/80 space-y-2">
                <div className="flex justify-between">
                  <span className="text-salon-muted">Service:</span>
                  <span className="font-bold text-salon-gold">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-salon-muted">Price:</span>
                  <span className="font-bold">₹{selectedService?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-salon-muted">Staff:</span>
                  <span>{selectedService?.staff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-salon-muted">Date:</span>
                  <span className="font-bold">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-salon-muted">Time:</span>
                  <span className="font-bold text-salon-gold">{selectedSlot}</span>
                </div>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-salon-muted mb-2 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-salon-dark text-salon-cream border border-salon-dark focus:border-salon-gold rounded-xl p-3 outline-none transition text-sm"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-salon-muted mb-2 font-bold">
                    Phone Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-bold text-salon-gold select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      placeholder="10-digit number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-salon-dark text-salon-cream border border-salon-dark focus:border-salon-gold rounded-xl py-3 pl-14 pr-4 outline-none transition text-sm font-sans"
                    />
                  </div>
                  <span className="text-[10px] text-salon-muted mt-1.5 block">
                    We will send an instant confirmation message to this WhatsApp number.
                  </span>
                </div>

                {/* Submit Error Warning */}
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/35 text-red-400 text-xs font-semibold">
                    ⚠️ {submitError}
                  </div>
                )}

                {/* Confirmation Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-salon-gold text-salon-dark font-black tracking-wider uppercase rounded-xl hover:bg-salon-gold-light disabled:bg-salon-gray disabled:text-salon-muted disabled:cursor-not-allowed transition duration-300 shadow-lg shadow-salon-gold/15"
                >
                  {isSubmitting ? "Processing booking..." : "Confirm Booking"}
                </button>
              </form>
            </div>
          )}

          {/* BACK AND NEXT BUTTON NAVIGATION ROW */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-salon-dark">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-2.5 rounded-full border border-salon-cream/20 hover:bg-salon-cream/5 text-xs font-bold tracking-wider uppercase transition"
              >
                &larr; Back
              </button>
            ) : (
              <div />
            )}

            {step === 1 && (
              <button
                disabled={!selectedService}
                onClick={() => setStep(2)}
                className="px-8 py-2.5 rounded-full bg-salon-gold text-salon-dark font-bold text-xs tracking-wider uppercase hover:bg-salon-gold-light disabled:bg-salon-dark disabled:text-salon-muted disabled:cursor-not-allowed transition duration-200"
              >
                Next &rarr;
              </button>
            )}

            {step === 2 && (
              <button
                disabled={!selectedDate || !selectedSlot}
                onClick={() => setStep(3)}
                className="px-8 py-2.5 rounded-full bg-salon-gold text-salon-dark font-bold text-xs tracking-wider uppercase hover:bg-salon-gold-light disabled:bg-salon-dark disabled:text-salon-muted disabled:cursor-not-allowed transition duration-200"
              >
                Next &rarr;
              </button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
