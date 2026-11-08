# Dharashiv Matrimony (धाराशिव मॅट्रिमोनी)

A modern, full-featured matrimonial web application built specifically for the Dharashiv & Maharashtrian community, matching the complete feature-set of MarathiMatrimony.

---

## 🌟 Key Features

### 1. Public & Guest Experience
- **Responsive Hero Landing Page** with community branding, live counter metrics, and call-to-actions.
- **How It Works**: 3-step registration and matchmaking guide.
- **Featured Profiles Grid**: Showcasing verified community profiles with live badges.
- **Success Stories / Testimonials**: Real wedding stories from Dharashiv, Latur, and Pune.
- **Multi-Step Free Registration**:
  1. *Basic Info*: Name, gender, DOB, email, password, mobile.
  2. *Religion & Community*: Religion, caste, sub-caste, mother tongue, height, complexion, diet.
  3. *Education & Career*: Qualification, university, occupation, company, annual income, work location.
  4. *Partner Preferences*: Preferred age range, religion, marital status, and states.

### 2. Member Dashboard & Matches
- **Personalized Dashboard**: Profile completion progress bar, live statistics (Matches, Interests, Visitors, Unread Alerts).
- **Match Recommendations**: Filter by All, New Profiles, Premium, Verified, and Online Now.
- **Advanced Search Engine**:
  - Filter by age range, marital status, religion, caste, diet, state, city, education, and annual income.
- **Detailed Profile View**:
  - Photo gallery with verification and online status indicators.
  - Tabbed breakdown: *About Me*, *Education & Career*, *Family Background*, and *Partner Preferences*.
  - Profile completeness score indicator.

### 3. Interactivity & Matchmaking Workflows
- **Send & Manage Interests**: Express interest with one click, manage incoming requests with Accept/Decline options.
- **Shortlist System**: Bookmark profiles with heart icon to review anytime.
- **Live 1-on-1 Chat / Inbox**: Direct conversation messaging interface with time stamps and partner profile preview.
- **Notification Hub**: Instant alerts when someone sends an interest, views your profile, or accepts a request.
- **Profile Visitor Tracking**: See which members visited your profile.

### 4. Monetization & Security
- **Premium Subscription Plans**:
  - **Silver** (₹1,499 / 3 Months)
  - **Gold** (₹2,999 / 6 Months - Most Popular)
  - **Diamond** (₹4,999 / 12 Months)
- Contact number reveal protection (gated for premium / verified members).
- **Settings & Privacy**:
  - Password change.
  - Toggle contact and photo visibility.
  - Delete account option.

---

## 🚀 Technology Stack
- **Frontend**: React 18, Vite, React Router v6, TailwindCSS v4, Lucide React, React Hot Toast, Axios.
- **Backend**: Node.js, Custom JSON Server with lowdb, CORS, and simulated JWT authentication.

---

## 💻 Running the Application

### Option A: Double-Click (Windows)
Double-click `run-all.bat` in the root folder. It starts both the JSON Server backend and the Vite frontend.

### Option B: Command Line

**1. Start Backend (Port 3001)**
```bash
cd backend
node server.js
```

**2. Start Frontend (Port 3000)**
```bash
cd frontend
npm run dev
```

---

## 🔑 Demo Login Credentials
- **Email**: `demo@dharashiv.com`
- **Password**: `demo123`
*(Or use "Fill Demo Credentials" on the login page, or register a new user!)*

---

## 📍 URLs
- **Web App**: [http://localhost:3000](http://localhost:3000)
- **JSON API**: [http://localhost:3001](http://localhost:3001)

