import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-salon-dark text-salon-cream selection:bg-salon-gold selection:text-salon-dark">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-salon-dark/95 backdrop-blur-md border-b border-salon-gray/50 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex flex-col">
            <span className="text-xl font-bold tracking-widest text-salon-gold group-hover:text-salon-gold-light transition duration-300">
              IMPRESSION
            </span>
            <span className="text-[10px] tracking-[0.25em] text-salon-cream/70 uppercase">
              Spa & Salon
            </span>
          </Link>
          
          <Link
            href="/book"
            className="px-6 py-2.5 rounded-full bg-salon-gold text-salon-dark font-semibold text-sm hover:bg-salon-gold-light active:scale-95 transition-all duration-300 shadow-md shadow-salon-gold/10 hover:shadow-salon-gold/30 hover:-translate-y-0.5"
          >
            Book Appointment
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Dark Premium Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-[linear-gradient(rgba(26,26,26,0.7),rgba(26,26,26,0.95)),url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600')] bg-cover bg-center scale-105 transform animate-[pulse_10s_infinite_alternate]"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-salon-gray/80 border border-salon-gold/35 mb-6 backdrop-blur-sm animate-fade-in">
            <span className="text-salon-gold text-sm font-semibold">★ 4.8 Rating</span>
            <span className="w-1.5 h-1.5 rounded-full bg-salon-gold/50" />
            <span className="text-salon-cream/80 text-xs">324+ Google Reviews</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-salon-cream to-salon-cream/75 bg-clip-text text-transparent leading-tight">
            Where Beauty <br className="md:hidden" /> Meets Precision
          </h1>

          <p className="text-lg md:text-2xl text-salon-cream/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Pune's trusted unisex salon — 4.8 ⭐ rated by 324+ happy clients
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-salon-gold text-salon-dark font-bold text-base hover:bg-salon-gold-light shadow-lg shadow-salon-gold/25 hover:shadow-salon-gold/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Book Now
            </Link>
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-salon-cream/20 bg-transparent hover:bg-salon-cream/5 font-semibold text-base hover:border-salon-cream/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>

        {/* Ambient Bottom Glow */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-salon-dark to-transparent z-10" />
      </header>

      {/* WHY CHOOSE US SECTION */}
      <section className="py-24 px-6 md:px-12 bg-salon-dark relative z-20 border-b border-salon-gray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-2 block">
              WHY US
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight">
              Why Choose Impression
            </h2>
            <div className="w-16 h-1 bg-salon-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {/* Card 1 */}
            <div className="group p-6 md:p-8 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition duration-300 inline-block">
                  ⭐
                </div>
                <h3 className="text-base md:text-lg font-bold text-salon-cream mb-2 group-hover:text-salon-gold transition duration-300">
                  4.8 Google Rating
                </h3>
              </div>
              <p className="text-salon-cream/80 text-xs md:text-sm leading-relaxed mt-2">
                Trusted by 324+ happy clients in Pune
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-6 md:p-8 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition duration-300 inline-block">
                  💅
                </div>
                <h3 className="text-base md:text-lg font-bold text-salon-cream mb-2 group-hover:text-salon-gold transition duration-300">
                  Expert Artists
                </h3>
              </div>
              <p className="text-salon-cream/80 text-xs md:text-sm leading-relaxed mt-2">
                Rahul & Ms. Anjali with years of precision experience
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-6 md:p-8 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition duration-300 inline-block">
                  🏳️🌈
                </div>
                <h3 className="text-base md:text-lg font-bold text-salon-cream mb-2 group-hover:text-salon-gold transition duration-300">
                  Inclusive & Welcoming
                </h3>
              </div>
              <p className="text-salon-cream/80 text-xs md:text-sm leading-relaxed mt-2">
                LGBTQ+ friendly, women-owned business
              </p>
            </div>

            {/* Card 4 */}
            <div className="group p-6 md:p-8 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1 flex flex-col justify-between">
              <div>
                <div className="text-3xl md:text-4xl mb-4 group-hover:scale-110 transition duration-300 inline-block">
                  ✂️
                </div>
                <h3 className="text-base md:text-lg font-bold text-salon-cream mb-2 group-hover:text-salon-gold transition duration-300">
                  All Under One Roof
                </h3>
              </div>
              <p className="text-salon-cream/80 text-xs md:text-sm leading-relaxed mt-2">
                Hair, skin, bridal, nails & academy — one salon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET OUR ARTISTS SECTION */}
      <section className="py-24 px-6 md:px-12 bg-salon-dark relative z-20 border-b border-salon-gray/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-2 block">
              OUR TEAM
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight">
              Meet Our Artists
            </h2>
            <div className="w-16 h-1 bg-salon-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Rahul Card */}
            <div className="group p-8 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              {/* Circular Avatar Placeholder */}
              <div className="w-20 h-20 rounded-full bg-salon-gold flex items-center justify-center text-salon-dark text-3xl font-bold flex-shrink-0 select-none shadow-lg shadow-salon-gold/20 group-hover:scale-105 transition-transform duration-300">
                R
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-salon-cream mb-1 group-hover:text-salon-gold transition duration-300">
                  Rahul
                </h3>
                <span className="text-xs font-semibold text-salon-gold uppercase tracking-wider block mb-4">
                  Hair Specialist
                </span>
                <p className="text-salon-cream/80 text-sm leading-relaxed mb-6">
                  Known for precision haircuts and clean styling. Clients love his patience and attention to detail.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {["Haircut", "Head Massage", "Hair Spa"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-salon-dark border border-salon-gray text-xs font-medium text-salon-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Ms. Anjali Card */}
            <div className="group p-8 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              {/* Circular Avatar Placeholder */}
              <div className="w-20 h-20 rounded-full bg-salon-gold flex items-center justify-center text-salon-dark text-3xl font-bold flex-shrink-0 select-none shadow-lg shadow-salon-gold/20 group-hover:scale-105 transition-transform duration-300">
                A
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-salon-cream mb-1 group-hover:text-salon-gold transition duration-300">
                  Ms. Anjali
                </h3>
                <span className="text-xs font-semibold text-salon-gold uppercase tracking-wider block mb-4">
                  Senior Stylist & Bridal Expert
                </span>
                <p className="text-salon-cream/80 text-sm leading-relaxed mb-6">
                  Expert in bridal makeup, highlights, and hair botox. Professional, patient, and detail-oriented.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {["Bridal Makeup", "Hair Highlights", "Hair Botox"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-salon-dark border border-salon-gray text-xs font-medium text-salon-gold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <div className="text-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-salon-gold text-salon-dark font-bold text-base hover:bg-salon-gold-light shadow-lg shadow-salon-gold/25 hover:shadow-salon-gold/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Book with Our Artists &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY / OUR WORK SECTION */}
      <section className="py-24 px-6 md:px-12 bg-salon-dark relative z-20 border-b border-salon-gray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-2 block">
              GALLERY
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight">
              Our Work
            </h2>
            <p className="text-salon-cream/80 text-sm md:text-base mt-2 max-w-md mx-auto">
              Every cut, colour, and look — crafted with precision
            </p>
            <div className="w-16 h-1 bg-salon-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600",
              "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600",
              "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600",
              "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600",
              "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=600",
              "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600"
            ].map((url, idx) => (
              <div 
                key={idx} 
                className="relative overflow-hidden rounded-3xl h-[280px] group border border-salon-gray/30"
              >
                <img 
                  src={url} 
                  alt={`Impression Salon Work - ${idx + 1}`} 
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <span className="text-salon-cream hover:text-salon-gold font-medium tracking-wide text-sm transition-colors duration-300 cursor-pointer">
              Follow us for more →
            </span>
          </div>
        </div>
      </section>

      {/* OFFERS BANNER SECTION */}
      <section 
        className="py-20 px-6 md:px-12 relative z-20 border-b border-salon-gray/50 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2A1F00 50%, #1A1A1A 100%)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side Content */}
          <div className="flex flex-col items-start text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-3 block">
              LIMITED OFFER
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-salon-cream tracking-tight mb-4 leading-tight">
              Bridal Package — Starting ₹14,999
            </h2>
            <p className="text-salon-cream/80 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
              Full bridal experience by Ms. Anjali — makeup, hair styling & more. Limited slots available.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-salon-gold text-salon-dark font-bold text-base hover:bg-salon-gold-light shadow-lg shadow-salon-gold/25 hover:shadow-salon-gold/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Book Ms. Anjali &rarr;
            </Link>
          </div>

          {/* Right Side Content */}
          <div className="p-8 rounded-3xl bg-salon-dark/40 border border-salon-gold/20 backdrop-blur-sm">
            <ul className="space-y-4 text-salon-cream/90 text-base md:text-lg">
              <li className="flex items-center gap-3">
                <span className="text-salon-gold text-xl font-bold">✓</span>
                <span>Professional Bridal Makeup</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-salon-gold text-xl font-bold">✓</span>
                <span>Hair Styling & Setting</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-salon-gold text-xl font-bold">✓</span>
                <span>Pre-Bridal Skin Consultation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="py-24 px-6 md:px-12 bg-salon-gray relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-2 block">
              GUEST EXPERIENCES
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight">
              What Our Clients Say
            </h2>
            <div className="w-16 h-1 bg-salon-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-salon-dark border border-salon-gray/70 shadow-lg relative">
              <span className="absolute top-6 right-8 text-5xl text-salon-gold/10 font-serif leading-none select-none">
                “
              </span>
              <div className="mb-6">
                <div className="flex gap-1 text-salon-gold mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="text-salon-cream/90 text-sm leading-relaxed italic">
                  "My wife had a really good experience. Ms. Anjali did an amazing job with her haircut — exactly the look she wanted!"
                </p>
              </div>
              <div>
                <hr className="border-salon-gray mb-4" />
                <h4 className="font-bold text-salon-gold text-sm tracking-wide">
                  SHANTU SWAMY
                </h4>
                <p className="text-xs text-salon-muted mt-0.5">Verified Client</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-salon-dark border border-salon-gray/70 shadow-lg relative">
              <span className="absolute top-6 right-8 text-5xl text-salon-gold/10 font-serif leading-none select-none">
                “
              </span>
              <div className="mb-6">
                <div className="flex gap-1 text-salon-gold mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="text-salon-cream/90 text-sm leading-relaxed italic">
                  "I had an amazing experience with Rahul for my haircut. He was so professional without any issues."
                </p>
              </div>
              <div>
                <hr className="border-salon-gray mb-4" />
                <h4 className="font-bold text-salon-gold text-sm tracking-wide">
                  Ankita Gokhale
                </h4>
                <p className="text-xs text-salon-muted mt-0.5">Verified Client</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between p-8 rounded-3xl bg-salon-dark border border-salon-gray/70 shadow-lg relative">
              <span className="absolute top-6 right-8 text-5xl text-salon-gold/10 font-serif leading-none select-none">
                “
              </span>
              <div className="mb-6">
                <div className="flex gap-1 text-salon-gold mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="text-salon-cream/90 text-sm leading-relaxed italic">
                  "Great service, price and ambiance! Rs 899 for gel nails done beautifully in less than an hour."
                </p>
              </div>
              <div>
                <hr className="border-salon-gray mb-4" />
                <h4 className="font-bold text-salon-gold text-sm tracking-wide">
                  Bhumika Chuniyana
                </h4>
                <p className="text-xs text-salon-muted mt-0.5">Verified Client</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS SECTION */}
      <section className="py-24 px-6 md:px-12 bg-salon-dark relative z-20 border-b border-salon-gray/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-2 block">
              VISIT US
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight">
              Find Us
            </h2>
            <div className="w-16 h-1 bg-salon-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Map */}
            <div className="w-full">
              <div className="overflow-hidden rounded-2xl shadow-lg border border-salon-gray/30">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.8180%2C18.4700%2C73.8280%2C18.4780&layer=mapnik&marker=18.4740%2C73.8230"
                  width="100%"
                  height="320"
                  style={{ border: 0, borderRadius: '12px' }}
                  loading="lazy"
                  title="Impression Salon Location"
                />
              </div>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=Impression+Unisex+Spa+Salon+Anand+Nagar+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-salon-gold hover:text-salon-gold-light transition duration-300"
                >
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="flex flex-col gap-6 w-full">
              {/* Card 1: Address */}
              <div className="p-6 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/25 transition-all duration-300 flex gap-4 items-start">
                <span className="text-2xl text-salon-gold flex-shrink-0">📍</span>
                <div>
                  <h3 className="font-bold text-salon-cream mb-1 text-sm tracking-wide uppercase">
                    Address
                  </h3>
                  <p className="text-salon-cream/80 text-sm leading-relaxed">
                    Sun City Rd, Anand Nagar, Pune, Maharashtra 411051
                  </p>
                </div>
              </div>

              {/* Card 2: Phone */}
              <div className="p-6 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/25 transition-all duration-300 flex gap-4 items-start">
                <span className="text-2xl text-salon-gold flex-shrink-0">📞</span>
                <div>
                  <h3 className="font-bold text-salon-cream mb-1 text-sm tracking-wide uppercase">
                    Phone
                  </h3>
                  <a
                    href="tel:08767974524"
                    className="text-salon-cream/80 text-sm hover:text-salon-gold transition duration-300 block"
                  >
                    087679 74524
                  </a>
                </div>
              </div>

              {/* Card 3: Hours */}
              <div className="p-6 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/25 transition-all duration-300 flex gap-4 items-start">
                <span className="text-2xl text-salon-gold flex-shrink-0">🕐</span>
                <div className="w-full">
                  <h3 className="font-bold text-salon-cream mb-2 text-sm tracking-wide uppercase">
                    Hours
                  </h3>
                  <table className="w-full text-sm text-salon-cream/80 border-collapse">
                    <tbody>
                      <tr className="border-b border-salon-dark/45">
                        <td className="py-2 font-medium text-left">Mon–Sat</td>
                        <td className="py-2 text-right">9:00 AM – 10:00 PM</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-left">Sunday</td>
                        <td className="py-2 text-right">10:00 AM – 9:00 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 4: Rating */}
              <div className="p-6 rounded-3xl bg-salon-gray border border-transparent hover:border-salon-gold/25 transition-all duration-300 flex gap-4 items-start">
                <span className="text-2xl text-salon-gold flex-shrink-0">⭐</span>
                <div>
                  <h3 className="font-bold text-salon-cream mb-1 text-sm tracking-wide uppercase">
                    Google Rating
                  </h3>
                  <p className="text-salon-cream/80 text-sm mb-2">
                    4.8 / 5 — 324 Reviews on Google
                  </p>
                  <a
                    href="https://maps.app.goo.gl/impressionsalon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-salon-gold hover:text-salon-gold-light transition duration-300"
                  >
                    Read our reviews &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-24 px-6 md:px-12 bg-salon-dark relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-salon-gold font-bold mb-2 block">
              INDULGE YOURSELF
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-salon-gold mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category 1: Hair */}
            <div className="group relative p-8 rounded-3xl bg-salon-gray border border-salon-gray hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1">
              <div className="text-4xl mb-6 text-salon-gold group-hover:scale-110 transition duration-300 inline-block">
                ✂️
              </div>
              <h3 className="text-xl font-bold text-salon-cream mb-3 group-hover:text-salon-gold transition duration-300">
                Hair
              </h3>
              <p className="text-salon-muted text-sm leading-relaxed mb-6">
                Expert hair services including premium cuts, custom highlights, botox, and nourishing treatments.
              </p>
              <Link
                href="/book"
                className="text-sm font-semibold text-salon-gold group-hover:text-salon-gold-light inline-flex items-center gap-1.5 transition duration-300"
              >
                Explore &rarr;
              </Link>
            </div>

            {/* Category 2: Skin */}
            <div className="group relative p-8 rounded-3xl bg-salon-gray border border-salon-gray hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1">
              <div className="text-4xl mb-6 text-salon-gold group-hover:scale-110 transition duration-300 inline-block">
                ✨
              </div>
              <h3 className="text-xl font-bold text-salon-cream mb-3 group-hover:text-salon-gold transition duration-300">
                Skin
              </h3>
              <p className="text-salon-muted text-sm leading-relaxed mb-6">
                Revitalizing facials, elegant gel nail artistry, and gentle waxing to reveal your natural glow.
              </p>
              <Link
                href="/book"
                className="text-sm font-semibold text-salon-gold group-hover:text-salon-gold-light inline-flex items-center gap-1.5 transition duration-300"
              >
                Explore &rarr;
              </Link>
            </div>

            {/* Category 3: Bridal */}
            <div className="group relative p-8 rounded-3xl bg-salon-gray border border-salon-gray hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1">
              <div className="text-4xl mb-6 text-salon-gold group-hover:scale-110 transition duration-300 inline-block">
                💍
              </div>
              <h3 className="text-xl font-bold text-salon-cream mb-3 group-hover:text-salon-gold transition duration-300">
                Bridal
              </h3>
              <p className="text-salon-muted text-sm leading-relaxed mb-6">
                Stunning bridal makeovers and full-day luxury packages curated by specialist Ms. Anjali.
              </p>
              <Link
                href="/book"
                className="text-sm font-semibold text-salon-gold group-hover:text-salon-gold-light inline-flex items-center gap-1.5 transition duration-300"
              >
                Explore &rarr;
              </Link>
            </div>

            {/* Category 4: Academy */}
            <div className="group relative p-8 rounded-3xl bg-salon-gray border border-salon-gray hover:border-salon-gold/40 transition-all duration-500 hover:shadow-2xl hover:shadow-salon-gold/5 hover:-translate-y-1">
              <div className="text-4xl mb-6 text-salon-gold group-hover:scale-110 transition duration-300 inline-block">
                🎓
              </div>
              <h3 className="text-xl font-bold text-salon-cream mb-3 group-hover:text-salon-gold transition duration-300">
                Academy
              </h3>
              <p className="text-salon-muted text-sm leading-relaxed mb-6">
                Professional makeup and styling courses taught by industry veterans to kickstart your career.
              </p>
              <Link
                href="/book"
                className="text-sm font-semibold text-salon-gold group-hover:text-salon-gold-light inline-flex items-center gap-1.5 transition duration-300"
              >
                Explore &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 px-6 md:px-12 bg-salon-dark border-t-2 border-salon-gold relative z-20 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-black text-salon-cream tracking-tight mb-6 leading-tight">
            Ready for Your Transformation?
          </h2>
          <p className="text-salon-cream/80 text-base md:text-lg mb-10 max-w-2xl leading-relaxed">
            Join 324+ happy clients who trust Impression Salon. Book your appointment in under 2 minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full sm:w-auto">
            <Link
              href="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-salon-gold text-salon-dark font-bold text-base hover:bg-salon-gold-light shadow-lg shadow-salon-gold/25 hover:shadow-salon-gold/45 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-center"
            >
              Book Appointment
            </Link>
            <a
              href="tel:+918796774524"
              className="w-full sm:w-auto px-8 py-4 rounded-full border-2 border-salon-gold bg-transparent text-salon-gold font-bold text-base hover:bg-salon-gold hover:text-salon-dark hover:-translate-y-0.5 active:scale-95 transition-all duration-300 text-center"
            >
              Call Us Now
            </a>
          </div>

          <p className="text-salon-muted text-xs md:text-sm tracking-wide">
            Open Mon–Sat 9AM–10PM · Sun City Rd, Anand Nagar, Pune
          </p>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-16 px-6 md:px-12 bg-salon-dark border-t border-salon-gray/50 relative z-20 text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-xl font-bold tracking-widest text-salon-gold">
                IMPRESSION
              </span>
              <span className="text-[10px] tracking-[0.25em] text-salon-cream/70 uppercase">
                Spa & Salon
              </span>
            </div>
            <p className="text-salon-muted text-xs leading-relaxed max-w-sm">
              Providing luxury unisex grooming, skin revitalization, and professional beauty styling since 2026. Certified professionals dedicated to your satisfaction.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-salon-gold font-bold text-sm tracking-wider uppercase mb-4">
              VISIT US
            </h4>
            <ul className="space-y-2 text-xs text-salon-cream/80">
              <li className="flex items-start justify-center md:justify-start gap-2">
                <span>📍</span>
                <span>Sun City Rd, Anand Nagar, Pune 411051</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>📞</span>
                <a href="tel:08767974524" className="hover:text-salon-gold transition">
                  087679 74524
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2">
                <span>⏰</span>
                <span>Open daily until 10:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Booking CTA */}
          <div className="flex flex-col items-center md:items-start justify-center">
            <h4 className="text-salon-gold font-bold text-sm tracking-wider uppercase mb-4">
              READY FOR A MAKEOVER?
            </h4>
            <Link
              href="/book"
              className="px-6 py-3 rounded-full bg-salon-gold text-salon-dark font-bold text-xs tracking-wider uppercase hover:bg-salon-gold-light hover:shadow-lg hover:shadow-salon-gold/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Book Your Appointment
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-salon-gray/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-salon-muted text-[11px]">
            &copy; 2026 Impression Unisex Spa & Salon. All rights reserved.
          </p>
          <div className="flex gap-4 text-[11px] text-salon-muted">
            <a href="#" className="hover:text-salon-gold transition">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-salon-gold transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
