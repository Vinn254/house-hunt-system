# Quick Start Guide

Get your HouseHuntKE application running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v16+) installed
- ✅ npm or yarn package manager
- ✅ A Firebase account (free tier works)
- ✅ A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Firebase Setup (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Authentication (Google + Phone)
4. Create Firestore Database (test mode)
5. Enable Storage
6. Copy your config from Project Settings

### 3. Configure Firebase (1 minute)

Open [`src/firebase/config.js`](src/firebase/config.js) and replace:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Run the Application (1 minute)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## What You'll See

### Landing Page
- Browse verified house listings
- Filter by location, type, and rent
- View house details without login

### Try These Actions

1. **Browse Houses**: Scroll through the listings
2. **Filter**: Use the filter dropdowns
3. **View Details**: Click any house card
4. **Sign In**: Click "Book a Viewing" to trigger login
5. **Dashboard**: Access your personal dashboard

## Add Sample Data (Optional)

To see houses on the landing page, add this to Firestore:

**Collection**: `houses`

**Sample Document**:
```json
{
  "title": "Modern Bedsitter in Kilimani",
  "location": "Nairobi",
  "houseType": "Bedsitter",
  "rent": 15000,
  "images": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"
  ],
  "amenities": ["WiFi", "Water 24/7", "Parking", "Security"],
  "description": "Beautiful modern bedsitter",
  "status": "Available",
  "verified": true
}
```

## Common Issues

### Port Already in Use
```bash
# Kill the process using port 5173
npx kill-port 5173
npm run dev
```

### Firebase Connection Error
- Check your Firebase config
- Ensure services are enabled
- Verify project ID is correct

### Tailwind Styles Not Loading
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

## Next Steps

1. ✅ Application is running
2. 📝 Read [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed setup
3. 📚 Check [FEATURES.md](FEATURES.md) for feature documentation
4. 🎨 Customize colors in [`tailwind.config.js`](tailwind.config.js)
5. 🚀 Deploy to production (see [README.md](README.md))

## Need Help?

- Check the [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions
- Review [FEATURES.md](FEATURES.md) for feature explanations
- Check Firebase Console for errors
- Review browser console for JavaScript errors

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name
```

## Project Structure Overview

```
house-hunting-app/
├── src/
│   ├── components/      # Reusable components (Navbar)
│   ├── views/          # Page components (6 pages)
│   ├── composables/    # Vue composables (useAuth)
│   ├── firebase/       # Firebase configuration
│   ├── router/         # Vue Router setup
│   └── style.css       # Global styles
├── public/             # Static assets
└── Configuration files (Tailwind, Vite, etc.)
```

## Key Features to Test

- ✅ Browse houses without login
- ✅ Filter houses by criteria
- ✅ View house details
- ✅ Sign in with Google
- ✅ Book house viewing
- ✅ Access user dashboard
- ✅ Request relocation service
- ✅ Admin dashboard (requires admin role)

## Color Customization

The app uses green as primary color. To change:

Edit [`tailwind.config.js`](tailwind.config.js):
```javascript
colors: {
  primary: {
    500: '#22c55e',  // Change this
    600: '#16a34a',  // And this
    // ... other shades
  }
}
```

## Ready to Deploy?

See deployment instructions in [README.md](README.md) for:
- Firebase Hosting
- Vercel
- Netlify

---

**Congratulations! Your house hunting application is ready! 🎉**

Start customizing and adding your own houses to make it yours!
