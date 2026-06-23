# Product Requirements Document (PRD)
## Impression Unisex Spa & Salon — Booking Website

**Version:** 1.0 (Demo / Free Tier)
**Date:** June 2026
**Owner:** [Your Agency Name]
**Client:** Impression Unisex Spa & Salon, Anand Nagar, Pune

---

## 1. Executive Summary

Impression Unisex Spa & Salon is a 4.8-rated salon in Pune with 324+ Google reviews. Currently, bookings are managed manually via phone and WhatsApp. This project delivers a full-stack web application that automates appointment booking, eliminates double-booking, and sends instant WhatsApp confirmations — reducing owner workload and improving customer experience.

**Demo Constraint:** Zero paid services. All infrastructure uses free-tier tools only.

---

## 2. Problem Statement

| Pain Point | Current State | Desired State |
|---|---|---|
| Booking | Manual calls/WhatsApp | Self-serve online booking |
| Confirmations | Owner types messages manually | Auto WhatsApp confirmation |
| Double-booking | No slot validation | Real-time slot locking |
| Discoverability | Only Google Maps | Professional website |

---

## 3. Goals & Success Metrics

### Primary Goals
- Client can receive bookings 24/7 without picking up the phone
- Zero double-bookings via slot validation
- Instant WhatsApp confirmation sent to customer automatically

### Demo Success Criteria
- [ ] Booking flow works end-to-end on localhost
- [ ] WhatsApp message fires on booking confirmation
- [ ] Mobile-responsive UI
- [ ] Calendar shows booked/available slots dynamically

---

## 4. Scope

### In Scope (Demo v1.0)
- Landing page with hero, services, and testimonials
- Booking widget (service → date/time → customer details)
- Backend API with slot validation
- MongoDB Atlas Free Tier for data storage
- WhatsApp confirmation via `whatsapp-web.js` (free, QR scan)
- Admin view: list of today's bookings (simple page)

### Out of Scope (Post-Demo / Paid)
- Payment gateway (Razorpay/Stripe)
- SMS fallback
- Staff login dashboard
- Analytics
- Twilio/official WhatsApp API (paid)

---

## 5. Users

| User | Goal |
|---|---|
| Customer | Book an appointment in < 2 minutes |
| Salon Owner | See today's bookings; receive no manual confirmation calls |

---

## 6. Functional Requirements

### FR-1: Service Menu
- Display services grouped by category: Hair, Skin, Bridal, Academy
- Each service card shows: name, price, duration, assigned staff

### FR-2: Booking Widget (3-step flow)
- **Step 1:** Select category → select specific service → select staff (optional)
- **Step 2:** Pick date from calendar → pick available time slot (booked slots greyed out)
- **Step 3:** Enter Name + Phone number → Submit

### FR-3: Slot Validation
- API checks MongoDB before confirming — if slot taken, return error
- No two bookings for same service+staff+date+time

### FR-4: WhatsApp Confirmation
- On successful booking, auto-send WhatsApp message to customer phone
- Message template (see Section 9)

### FR-5: Admin Bookings View
- Protected route `/admin` showing today's bookings as a table
- Columns: Name, Phone, Service, Time Slot, Status

---

## 7. Non-Functional Requirements

| NFR | Requirement |
|---|---|
| Performance | Page load < 3s on mobile (4G) |
| Responsiveness | Works on 375px–1440px screens |
| Availability | Demo runs on localhost / free Vercel deploy |
| Data | No customer data stored beyond booking fields |

---

## 8. Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind CSS | SSR, fast, free to deploy |
| Backend | Node.js + Express.js | REST API for bookings |
| Database | MongoDB Atlas (Free M0 tier) | 512MB free, no credit card |
| WhatsApp | `whatsapp-web.js` | Free, no API fees |
| Hosting | Vercel (frontend) + Railway free tier (backend) | Both free |
| Version Control | GitHub | Free |

---

## 9. WhatsApp Message Template

```
✨ IMPRESSION UNISEX SPA & SALON ✨

Hi [Customer Name], your appointment is confirmed! 🎉

💇 Service: [Service Name]
👤 Staff: [Staff Name]
📅 Date: [Date]
⏰ Time: [Time Slot]
📍 Location: Sun City Rd, Anand Nagar, Pune 411051

Please show this message at the front desk on arrival.
See you soon! 🌟

— Impression Salon Team
📞 087679 74524
```

---

## 10. Pages & Routes

| Route | Description |
|---|---|
| `/` | Home — hero, services preview, testimonials, CTA |
| `/book` | Full booking widget (3-step) |
| `/booking-confirmed` | Success page after booking |
| `/admin` | Today's bookings table (no auth for demo) |

---

## 11. Out-of-Scope Assumptions (Demo)
- No real payment processing
- WhatsApp bot requires QR code scan on server start (one-time)
- No email confirmation
- Admin page has no password protection in demo