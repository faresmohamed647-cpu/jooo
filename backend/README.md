# Charity Donation Management System

## 🎯 Full-Stack Laravel 11 + HTML/JS Solution

### Backend (Laravel 11 API)

**Location:** `website_final/backend/`

#### Features

- **Auth**: Sanctum token auth (`/api/auth/login`)
- **Public APIs** (Website): `/api/campaigns`, `/api/donations`
- **Admin APIs** (Dashboard): CRUD Donors/Campaigns/Donations/Volunteers, `/api/dashboard/stats`, `/api/reports/*`
- **Security**: `auth:sanctum` + `role:admin` middleware + API throttling (60/min)
- **Notifications**: Auto emails on donations (donor + admin)
- **Reports**: JSON/CSV/PDF exports
- **Response Format**:

```json
{ "success": true, "message": "Success", "data": {} }
```

#### Setup & Run

```powershell
cd website_final/backend
copy .env.example .env
# Edit .env: APP_NAME, DB_*, MAIL_* (Gmail SMTP)
php artisan key:generate
php artisan migrate:fresh --seed  # admin@charity.com / password
php artisan serve                 # http://127.0.0.1:8000
Start-Job { php artisan queue:work }  # Emails
```

#### Test APIs (Postman/Frontend)

```
POST /api/auth/login
{
  "email": "admin@charity.com",
  "password": "password"
}
→ Copy "token" → Authorization: Bearer {token}

GET /api/campaigns           # Website
POST /api/donations          # Updates campaign progress
GET /api/dashboard/stats     # Dashboard totals/charts
GET /api/reports/donations   # Reports
```

---

### Frontend

**Website:** `website_final/*.html` + `styles.css` + `script.js`
**Admin Dashboard:** `website_final/admain/` (complete)
**Integration**: Uses above APIs (localStorage token)

#### Website Flow

1. View campaigns (`GET /api/campaigns`)
2. Donate (`POST /api/donations`) → Progress updates live

#### Dashboard Flow

1. Login → Store token
2. View stats/CRUD via admin APIs

---

### Production Deployment

```
Backend: Forge/Vapor + MySQL + Redis (queues)
Frontend: Static host (Netlify/Vercel) → Proxy API to backend
Mail: Resend/Mailgun/SendGrid
CDN: Cloudflare for assets
```

### File Structure

```
website_final/
├── backend/          # Laravel API (complete)
│   ├── app/Http/Controllers/Api/
│   ├── app/Services/
│   ├── app/Models/
│   ├── database/migrations/
│   ├── routes/api.php
│   └── ...
├── *.html            # Public website
├── admain/           # Admin dashboard
├── styles.css
└── script.js
```

**System 100% ready! 🚀**
