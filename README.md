# ✨ MUVEZ - Luxury Footwear Brand Platform

<div align="center">

![MUVEZ Logo](https://img.shields.io/badge/MUVEZ-Luxury%20Footwear-black?style=for-the-badge&logo=❤️)

**Where Every Step Tells a Story**

A premium, interactive e-commerce and survey platform for luxury footwear enthusiasts

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Getting Started](#-getting-started) • [Survey Integration](#-survey-integration)

</div>

---

## 📖 About MUVEZ

**MUVEZ** is a sophisticated luxury footwear brand platform designed to showcase premium, hand-crafted footwear while engaging customers through an interactive survey system. The platform combines elegant design with cutting-edge technology to create an unforgettable user experience.

> "Crafted Perfection" - Every piece is meticulously curated for those who demand both elegance and exceptional comfort.

### 🎯 Mission

To provide discerning customers with:
- Exquisite luxury footwear collection
- Personalized recommendations through intelligent surveys
- Seamless shopping experience
- Data-driven insights into customer preferences

---

## ✨ Features

### 🛍️ Product Showcase
- **6 Curated Collections**
  - Milano Elegance (Premium Shoes)
  - Cloud Comfort (Luxury Slippers)
  - Heritage Clog (Designer Clogs)
  - Aegean Breeze (Luxury Sandals)
  - Celestial Slides (Fashion Sliders)
  - Obsidian Essence (Limited Edition)

### 📋 Interactive Survey System
- **5 Smart Questions** to understand customer preferences
- Real-time response tracking
- Personalized recommendation engine
- Beautiful survey interface with smooth scrolling

### 📊 Google Sheets Integration
- **Automatic Data Storage** - Survey responses saved to Google Sheets
- **Real-time Sync** - See responses instantly
- **Single Row Format** - Each submission creates one organized row
- **Timestamp Tracking** - Track submission times automatically

### 🎨 Premium UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Accessibility optimized
- Dark mode ready
- Light, elegant typography

### 🚀 Modern Technology Stack
- Next.js 14+ with App Router
- React 18 with TypeScript
- Tailwind CSS for styling
- Radix UI components
- Google Sheets API v4

---

## 🛠️ Tech Stack

```
Frontend:
├── React 18
├── Next.js 14+
├── TypeScript
├── Tailwind CSS
├── Radix UI Components
└── Vercel Analytics

Backend:
├── Next.js API Routes
├── Node.js Runtime
└── Google Sheets API v4

Infrastructure:
├── Google Cloud (JWT Authentication)
├── Google Sheets (Data Storage)
└── Vercel (Deployment Ready)
```

---

## 📁 Project Structure

```
luxury-footwear/
├── app/
│   ├── api/
│   │   └── survey-submit/
│   │       └── route.ts          # Google Sheets API integration
│   ├── survey/
│   │   └── page.tsx              # Survey page
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── navbar.tsx                # Navigation bar
│   ├── product-card.tsx          # Product display component
│   ├── survey-question.tsx       # Survey question component
│   ├── scroll-progress-bar.tsx   # Progress indicator
│   ├── theme-provider.tsx        # Theme management
│   └── ui/                       # 50+ Radix UI components
├── hooks/
│   ├── use-mobile.ts             # Mobile detection hook
│   └── use-toast.ts              # Toast notifications
├── lib/
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── styles/                       # Global CSS
├── .env.local                    # Environment variables (local)
├── .env.local.example            # Environment template
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── README.md                     # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- npm or pnpm
- Google Cloud Account
- Access to a Google Sheet

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/luxury-footwear.git
cd luxury-footwear
```

### Step 2: Install Dependencies

```bash
pnpm install
# or
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Then add your Google Cloud credentials:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

📖 **Full Setup Guide**: See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

### Step 4: Start Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🎯 Getting Started

### Home Page
1. Visit `http://localhost:3000`
2. Browse the hero section with tagline "Where Every Step Tells a Story"
3. Explore the 6 curated product collections
4. Learn about MUVEZ's commitment to quality

### Survey Page
1. Click "Take the Survey" button
2. Answer 5 detailed questions about preferences:
   - Footwear style preference
   - Comfort importance
   - Material preference
   - Usage frequency
   - Lifestyle type
3. Review your selections
4. Click "Submit Survey"
5. Data automatically saved to Google Sheet!

### Viewing Survey Responses
1. Go to your Google Sheet
2. New row appears with timestamp
3. Each column contains the user's selection
4. Labels are human-readable (not values)

---

## 📊 Survey Integration Guide

### How It Works

```
User Submits Form
      ↓
API validates data
      ↓
JWT authentication
      ↓
Google Sheets API
      ↓
Data added to spreadsheet
      ↓
Success response
```

### Survey Questions Structure

```javascript
{
  id: 1,
  question: "What's your preferred footwear style?",
  description: "Choose the style that best matches your personality",
  options: [
    { id: "formal", label: "Formal & Elegant", value: "formal" },
    { id: "casual", label: "Casual & Comfortable", value: "casual" },
    // ... more options
  ]
}
```

### Google Sheet Output Example

| Timestamp | What's your preferred footwear style? | How important is comfort to you? | Which material appeals to you most? | How often do you wear footwear? | What's your lifestyle type? |
|-----------|-------|-------|-------|-------|-------|
| 01/11/2026, 10:30:45 AM | Formal & Elegant | Critical - I need maximum comfort | Premium Leather | Daily - For work & events | Luxury Enthusiast |
| 01/11/2026, 10:35:20 AM | Casual & Comfortable | Very Important - It matters a lot | Silk & Velvet | Frequent - Several times a week | Trendy & Fashion-forward |

---

## 🔑 Environment Variables

### Required Variables

```bash
# Google Cloud Service Account Email
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@your-project.iam.gserviceaccount.com

# Google Cloud Private Key (with \n for newlines)
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Getting These Variables

1. **Create Google Cloud Project** → [Google Cloud Console](https://console.cloud.google.com/)
2. **Enable Google Sheets API** → APIs & Services → Library
3. **Create Service Account** → APIs & Services → Credentials
4. **Download JSON Key** → Service Account → Keys → Add Key
5. **Copy Values** → `client_email` and `private_key`

📖 **Detailed Guide**: See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

---

## 🐛 Troubleshooting

### Survey Won't Submit?

**Error**: `500 Internal Server Error`
- Check `.env.local` has correct credentials
- Verify Google Sheet is shared with service account
- Check browser console for specific error message

**Error**: `Authentication failed`
- Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` are set
- Make sure private key has `\n` for newlines, not actual newlines
- Restart dev server after updating `.env.local`

**Error**: `Permission denied`
- Go to your Google Sheet
- Click Share → Add service account email as Editor
- Make sure you're using the correct sheet ID

📖 **Full Troubleshooting**: See [SURVEY_TROUBLESHOOTING.md](./SURVEY_TROUBLESHOOTING.md)

---

## 📱 Features Breakdown

### 🏠 Home Page Components

```
┌─────────────────────────────────────┐
│      NAVIGATION BAR (MUVEZ)        │
├─────────────────────────────────────┤
│                                     │
│    HERO SECTION                     │
│  "Where Every Step Tells a Story"  │
│                                     │
│  [Take the Survey Button]          │
│                                     │
├─────────────────────────────────────┤
│  OUR COLLECTION                     │
│  ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │ Product │ │ Product │ │Product ││
│  │  Card 1 │ │  Card 2 │ │Card 3  ││
│  └─────────┘ └─────────┘ └────────┘│
│  ┌─────────┐ ┌─────────┐ ┌────────┐│
│  │ Product │ │ Product │ │Product ││
│  │  Card 4 │ │  Card 5 │ │Card 6  ││
│  └─────────┘ └─────────┘ └────────┘│
├─────────────────────────────────────┤
│  WHY CHOOSE MUVEZ                   │
│  ✓ Premium Materials                │
│  ✓ Artisan Craftsmanship            │
│  ✓ Timeless Design                  │
├─────────────────────────────────────┤
│  CTA: Ready to Discover?            │
│  [Start Survey]                     │
├─────────────────────────────────────┤
│  FOOTER                             │
│  © 2026 MUVEZ                       │
└─────────────────────────────────────┘
```

### 📋 Survey Page Components

```
┌─────────────────────────────────────┐
│      NAVIGATION BAR                 │
│      SCROLL PROGRESS BAR            │
├─────────────────────────────────────┤
│                                     │
│  INTRO SECTION                      │
│  "Find Your Perfect Muvez"          │
│                                     │
├─────────────────────────────────────┤
│  QUESTION 1 of 5                    │
│  "What's your preferred style?"     │
│  ☐ Formal & Elegant                │
│  ☐ Casual & Comfortable            │
│  ☐ Sporty & Dynamic                │
│  ☐ Eclectic & Unique               │
│                                     │
├─────────────────────────────────────┤
│  QUESTION 2 of 5                    │
│  "How important is comfort?"        │
│  (Similar options)                  │
│                                     │
│  ... [Questions 3, 4, 5] ...       │
│                                     │
├─────────────────────────────────────┤
│  COMPLETION SECTION                 │
│  "Ready to Continue?"               │
│  [Submit Survey] [Back to Home]     │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Design Highlights

### Color Scheme
- **Primary**: Rich Black (#205) - Luxury & Elegance
- **Background**: Pure White (#985) - Cleanliness
- **Accent**: Gold/Primary tone - Premium feel
- **Text**: Dark Foreground (#145) - Excellent contrast

### Typography
- **Primary Font**: Geist (Modern, Clean)
- **Sizes**: Responsive scaling
- **Letter Spacing**: Wide tracking for luxury feel
- **Weights**: Light (hero) to Semibold (headings)

### Components Used
- **50+ Pre-built UI Components** from Radix UI
- **Smooth Animations** with Tailwind
- **Responsive Grid Layouts**
- **Hover Effects & Transitions**

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect your repository to Vercel
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

### Deploy to Other Platforms

The app is compatible with:
- ✅ Vercel (recommended)
- ✅ Netlify
- ✅ AWS Amplify
- ✅ Self-hosted Node.js servers

**Required**: Node.js 18+ runtime

---

## 📈 Future Enhancements

- [ ] Product checkout system
- [ ] Email notifications for survey submissions
- [ ] Admin dashboard for viewing analytics
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Advanced filtering & search

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/yourusername/luxury-footwear.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes** and commit
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**

### Code Standards
- Use TypeScript
- Follow existing code style
- Add comments for complex logic
- Test before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 📞 Support & Contact

Need help? Here are your options:

| Channel | Details |
|---------|---------|
| 📧 Email | contact@muvez.luxury |
| 💬 Discord | [Join Community](https://discord.gg/muvez) |
| 🐛 Issues | [GitHub Issues](https://github.com/muvez/luxury-footwear/issues) |
| 📚 Docs | [Full Documentation](./GOOGLE_SHEETS_SETUP.md) |

---

## 🙏 Acknowledgments

- **Radix UI** - For beautiful, accessible components
- **Vercel** - For Next.js and deployment
- **Google Cloud** - For Sheets API
- **Tailwind CSS** - For utility-first styling
- **The Community** - For amazing feedback and support

---

<div align="center">

### Made with ❤️ for luxury footwear enthusiasts

**MUVEZ** © 2026 | Crafted with luxury in mind

[⬆ Back to Top](#-muvez---luxury-footwear-brand-platform)

</div>
