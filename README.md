# Impression Unisex Spa & Salon — Booking Website
## Developer README

### Quick Start (Local Dev)

**Prerequisites:** Node.js 18+, Git, a smartphone with the salon's WhatsApp number

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/impression-salon
cd impression-salon

# 2. Backend setup
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI from MongoDB Atlas
node index.js
# → Scan the QR code with the salon's WhatsApp phone

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm run dev
# → Open http://localhost:3000
```

### Environment Variables

**backend/.env**
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/impressionSalon
PORT=5000
```

### Folder Structure
```
impression-salon/
├── backend/
│   ├── models/
│   │   └── Booking.js
│   ├── routes/
│   │   └── bookings.js
│   ├── whatsapp/
│   │   ├── client.js
│   │   └── sendConfirmation.js
│   ├── index.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── app/
    │   ├── page.jsx              ← Home
    │   ├── book/page.jsx         ← Booking wizard
    │   ├── booking-confirmed/page.jsx
    │   └── admin/page.jsx
    ├── tailwind.config.js
    └── package.json
```

### API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/bookings | Create a new booking |
| GET | /api/bookings/slots | Get booked slots for a date+service |
| GET | /api/bookings/admin | Get all bookings for a date |

### Free Services Used
| Service | Purpose | Free Limit |
|---|---|---|
| MongoDB Atlas M0 | Database | 512MB free forever |
| Vercel | Frontend hosting | Free for personal projects |
| Railway | Backend hosting | $5 free credit/month |
| whatsapp-web.js | WhatsApp automation | Free (open source) |
| Unsplash | Hero images | Free |

### Demo Limitations
- WhatsApp requires QR scan every ~2 weeks (or use LocalAuth to persist)
- Admin page has no password (demo only)
- No payment processing