# Task Breakdown — Impression Salon Website
## Sprint Plan for Demo Build (Free Tier Only)

Each task has: a clear **Goal**, **Deliverable**, **Acceptance Criteria**, and **Tools Used**.

---

## PHASE 0 — Setup (Day 1, ~2 hours)

### Task 0.1 — Project Scaffolding
**Goal:** Create the monorepo with frontend and backend folders.
**Deliverable:** GitHub repo with working folder structure.
**Steps:**
```
impression-salon/
├── frontend/     ← Next.js app
├── backend/      ← Express API
└── README.md
```
**Commands:**
```bash
mkdir impression-salon && cd impression-salon
git init
npx create-next-app@latest frontend --tailwind --app --eslint
mkdir backend && cd backend && npm init -y
npm install express mongoose cors dotenv
```
**Acceptance Criteria:**
- [ ] `frontend/` runs on `localhost:3000`
- [ ] `backend/` starts with `node index.js` on `localhost:5000`
- [ ] Both pushed to GitHub

---

### Task 0.2 — MongoDB Atlas Free Cluster
**Goal:** Set up free cloud database.
**Steps:**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free M0 cluster (no credit card needed)
3. Create DB user + whitelist IP `0.0.0.0/0`
4. Copy connection string → paste in `backend/.env`

```env
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/impressionSalon
PORT=5000
```
**Acceptance Criteria:**
- [ ] Backend connects to Atlas without error on startup

---

## PHASE 1 — Backend API (Day 1–2, ~4 hours)

### Task 1.1 — Booking Schema & Model
**Goal:** Define the MongoDB schema for bookings.
**File:** `backend/models/Booking.js`
```javascript
const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phoneNumber:  { type: String, required: true },
  service:      { type: String, required: true },
  staffName:    { type: String },
  date:         { type: String, required: true },  // "YYYY-MM-DD"
  timeSlot:     { type: String, required: true },  // "11:00 AM"
  status:       { type: String, default: "Confirmed" },
  createdAt:    { type: Date, default: Date.now }
});
```
**Acceptance Criteria:**
- [ ] Model imports without error

---

### Task 1.2 — POST /api/bookings (Create Booking with Validation)
**Goal:** Accept a booking, validate no slot conflict, save to DB.
**File:** `backend/routes/bookings.js`

**Logic:**
1. Receive `{ customerName, phoneNumber, service, staffName, date, timeSlot }`
2. Query DB: does a booking exist with same `service + date + timeSlot + staffName`?
3. If YES → return `409 Conflict: "This slot is already taken"`
4. If NO → save booking → trigger WhatsApp → return `201 Created`

**Acceptance Criteria:**
- [ ] First booking for a slot → `201`
- [ ] Duplicate booking → `409`
- [ ] Postman test passes

---

### Task 1.3 — GET /api/bookings/slots?date=&service=
**Goal:** Return booked time slots for a given date + service so the frontend can grey them out.
**Response:**
```json
{ "bookedSlots": ["10:00 AM", "2:00 PM"] }
```
**Acceptance Criteria:**
- [ ] Returns correct booked slots from DB

---

### Task 1.4 — GET /api/bookings/admin?date=
**Goal:** Return all bookings for a given date (for admin view).
**Acceptance Criteria:**
- [ ] Returns list of today's bookings in JSON

---

## PHASE 2 — WhatsApp Automation (Day 2, ~3 hours)

### Task 2.1 — Install & Initialize whatsapp-web.js
**Goal:** Get WhatsApp client running on backend server.
```bash
cd backend
npm install whatsapp-web.js qrcode-terminal
```
**File:** `backend/whatsapp/client.js`
```javascript
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({ authStrategy: new LocalAuth() });

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  console.log('Scan this QR with the salon WhatsApp');
});

client.on('ready', () => console.log('WhatsApp client ready!'));

client.initialize();
module.exports = client;
```
**Acceptance Criteria:**
- [ ] QR appears in terminal on `node index.js`
- [ ] After scan, prints "WhatsApp client ready!"

---

### Task 2.2 — Send Confirmation Message on Booking
**Goal:** Fire WhatsApp message immediately after booking is saved.
**File:** `backend/whatsapp/sendConfirmation.js`
```javascript
async function sendConfirmation(client, booking) {
  const { customerName, phoneNumber, service, staffName, date, timeSlot } = booking;
  const phone = phoneNumber.replace(/\D/g, '') + '@c.us'; // format for whatsapp-web.js
  const message = `✨ IMPRESSION UNISEX SPA & SALON ✨\n\nHi ${customerName}, your appointment is confirmed! 🎉\n\n💇 Service: ${service}\n👤 Staff: ${staffName || 'Our Team'}\n📅 Date: ${date}\n⏰ Time: ${timeSlot}\n📍 Location: Sun City Rd, Anand Nagar, Pune 411051\n\nPlease show this message at the front desk on arrival.\nSee you soon! 🌟\n\n— Impression Salon Team\n📞 087679 74524`;
  await client.sendMessage(phone, message);
}
module.exports = sendConfirmation;
```
**Acceptance Criteria:**
- [ ] Customer receives WhatsApp message within 5 seconds of booking

---

## PHASE 3 — Frontend (Day 3–4, ~6 hours)

### Task 3.1 — Global Styles & Design Tokens
**Goal:** Set up Tailwind config with salon brand colors.
**Design Direction:** Dark charcoal + warm gold — luxury spa feel.
```javascript
// tailwind.config.js
colors: {
  'salon-dark':  '#1A1A1A',
  'salon-gold':  '#C9A84C',
  'salon-cream': '#F5F0E8',
  'salon-gray':  '#3A3A3A',
}
```
**Acceptance Criteria:**
- [ ] Custom colors apply across pages

---

### Task 3.2 — Home Page (`/`) — Hero + Services Preview
**Goal:** Build the landing page.
**Sections:**
1. **Navbar** — Logo, "Book Now" CTA button
2. **Hero** — Full-viewport headline, subtext, and CTA. Use a free Unsplash image (hair/salon) via `next/image`.
3. **Services Grid** — 4 category cards: Hair, Skin, Bridal, Academy
4. **Testimonials** — 3 cards from real Google reviews (SHANTU SWAMY, Ankita Gokhale, Bhumika Chuniyana)
5. **Footer** — Address, phone, hours

**Acceptance Criteria:**
- [ ] Page renders on mobile and desktop
- [ ] "Book Now" links to `/book`

---

### Task 3.3 — Booking Page (`/book`) — 3-Step Wizard
**Goal:** Build the full booking flow as a step-by-step React component.

**Step 1: Service Selection**
- Category tabs: Hair | Skin | Bridal | Academy
- Service cards with name, price, staff name

**Step 2: Date & Time Picker**
- Calendar: use `react-calendar` (free)
- On date select → call `GET /api/bookings/slots?date=&service=` → grey out returned slots
- Available time slots grid (9:00 AM, 10:00 AM, ... 9:00 PM in 1hr blocks)

**Step 3: Customer Details**
- Name input
- Phone number input (Indian format: +91)
- Submit button → calls `POST /api/bookings`

**Acceptance Criteria:**
- [ ] Booked slots are greyed out and unclickable
- [ ] Successful booking redirects to `/booking-confirmed`
- [ ] Error state shows if slot is taken

---

### Task 3.4 — Booking Confirmed Page (`/booking-confirmed`)
**Goal:** Show success message with booking summary.
**Content:**
- "✅ Your appointment is confirmed!"
- Display: service, date, time, staff
- "A WhatsApp confirmation has been sent to your number."
- "Back to Home" button

**Acceptance Criteria:**
- [ ] Page shows correct booking details
- [ ] No broken state if user refreshes (use URL params or session storage)

---

### Task 3.5 — Admin Page (`/admin`)
**Goal:** Simple table of today's bookings.
- Fetches `GET /api/bookings/admin?date=today`
- Table: Name | Phone | Service | Staff | Time | Status
- Manual refresh button

**Acceptance Criteria:**
- [ ] All today's bookings visible

---

## PHASE 4 — Integration & Testing (Day 5, ~2 hours)

### Task 4.1 — End-to-End Test
**Checklist:**
- [ ] Book appointment via UI → saved in MongoDB Atlas
- [ ] WhatsApp message received on customer phone
- [ ] Trying to book same slot → shows error
- [ ] Admin page shows the booking

### Task 4.2 — Mobile Responsiveness Check
- Test at 375px (iPhone SE), 768px (iPad), 1280px (Desktop)

### Task 4.3 — Deploy for Demo (Optional)
- Frontend → Push to Vercel (free): `vercel --prod`
- Backend → Deploy to Railway (free tier): connect GitHub repo

---

## Services Data (Hardcoded for Demo)

```javascript
// frontend/data/services.js
export const services = [
  // Hair
  { id: 1, category: "Hair", name: "Haircut (Men)", staff: "Rahul", price: 299, duration: "30 min" },
  { id: 2, category: "Hair", name: "Haircut (Women)", staff: "Ms. Anjali", price: 499, duration: "45 min" },
  { id: 3, category: "Hair", name: "Hair Highlights", staff: "Ms. Anjali", price: 1499, duration: "90 min" },
  { id: 4, category: "Hair", name: "Hair Botox", staff: "Ms. Anjali", price: 2499, duration: "120 min" },
  { id: 5, category: "Hair", name: "Head Massage", staff: "Rahul", price: 399, duration: "30 min" },
  // Skin
  { id: 6, category: "Skin", name: "Facial", staff: "Our Team", price: 799, duration: "60 min" },
  { id: 7, category: "Skin", name: "Gel Nails", staff: "Our Team", price: 899, duration: "60 min" },
  // Bridal
  { id: 8, category: "Bridal", name: "Bridal Makeup", staff: "Ms. Anjali", price: 8999, duration: "180 min" },
  { id: 9, category: "Bridal", name: "Bridal Package", staff: "Ms. Anjali", price: 14999, duration: "Full Day" },
];
```

---

## Estimated Timeline

| Phase | Days | Hours |
|---|---|---|
| Phase 0: Setup | Day 1 | 2h |
| Phase 1: Backend | Day 1–2 | 4h |
| Phase 2: WhatsApp | Day 2 | 3h |
| Phase 3: Frontend | Day 3–4 | 6h |
| Phase 4: Testing | Day 5 | 2h |
| **Total** | **5 days** | **~17h** |