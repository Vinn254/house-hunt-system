# HouseHuntKE Setup Guide

## Quick Start Guide

Follow these steps to get your house hunting application up and running.

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Vue 3
- Vue Router 4
- Firebase
- Tailwind CSS
- Vite

## Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `househunt-ke` (or your preferred name)
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2.2 Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** sign-in provider
3. Enable **Phone** sign-in provider
4. Add your app domain to authorized domains

### 2.3 Create Firestore Database

1. Go to **Firestore Database** → **Create database**
2. Start in **test mode** (we'll add security rules later)
3. Choose your preferred location (e.g., `us-central`)
4. Click "Enable"

### 2.4 Enable Storage

1. Go to **Storage** → **Get started**
2. Start in **test mode**
3. Click "Done"

### 2.5 Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

### 2.6 Update Configuration File

Open `src/firebase/config.js` and replace the placeholder values:

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

## Step 3: Set Up Firestore Collections

### 3.1 Create Collections

In Firestore, create these collections:

1. **houses** - For storing house listings
2. **bookings** - For storing viewing bookings
3. **relocationRequests** - For storing relocation service requests

### 3.2 Add Sample House Data

Add a sample document to the `houses` collection:

```json
{
  "title": "Modern Bedsitter in Kilimani",
  "location": "Nairobi",
  "houseType": "Bedsitter",
  "rent": 15000,
  "deposit": 30000,
  "images": [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
  ],
  "amenities": ["WiFi", "Water 24/7", "Parking", "Security"],
  "description": "A beautiful modern bedsitter in the heart of Kilimani",
  "status": "Available",
  "verified": true,
  "createdAt": "2026-01-26T00:00:00.000Z"
}
```

## Step 4: Configure Security Rules

### 4.1 Firestore Security Rules

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Houses - Public read, Admin write
    match /houses/{houseId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Bookings - Users can manage their own
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Relocation Requests - Users can manage their own
    match /relocationRequests/{requestId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

### 4.2 Storage Security Rules

Go to **Storage** → **Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /houses/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 5: Run the Application

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Step 6: Test the Application

### Test User Flow

1. **Browse Houses** - Visit homepage without logging in
2. **Filter Houses** - Use location and house type filters
3. **View House Details** - Click on any house card
4. **Sign In** - Click "Book a Viewing" to trigger login
5. **Book Viewing** - Complete the booking form
6. **Access Dashboard** - View your bookings in the dashboard
7. **Request Relocation** - Navigate to relocation service

### Test Admin Flow

To access admin features, you need to set up admin users:

1. Create a user account through the app
2. In Firestore, create a `users` collection
3. Add a document with the user's UID:

```json
{
  "email": "admin@househuntke.com",
  "role": "admin",
  "displayName": "Admin User"
}
```

4. Access admin dashboard at `/admin`

## Step 7: Customize the Application

### Update Branding

1. **Logo** - Replace logo in [`Navbar.vue`](src/components/Navbar.vue:10)
2. **Colors** - Modify [`tailwind.config.js`](tailwind.config.js:7) primary colors
3. **App Name** - Update "HouseHuntKE" throughout the app

### Add More Features

- **Payment Integration** - Integrate M-Pesa STK Push
- **Email Notifications** - Set up Firebase Cloud Functions
- **SMS Notifications** - Integrate Africa's Talking API
- **Maps Integration** - Add Google Maps for location display
- **Image Upload** - Allow admins to upload house images

## Troubleshooting

### Firebase Connection Issues

- Verify your Firebase config is correct
- Check if Firebase services are enabled
- Ensure your domain is in authorized domains

### Authentication Issues

- For phone auth, ensure you've enabled it in Firebase
- Add test phone numbers in Firebase Console for development
- Check reCAPTCHA settings

### Build Issues

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Update dependencies: `npm update`

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check if PostCSS is processing correctly
- Verify `@tailwind` directives in [`style.css`](src/style.css:1)

## Production Deployment

### Deploy to Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init
```

Select:
- Hosting
- Use existing project
- Public directory: `dist`
- Single-page app: Yes
- GitHub integration: Optional

4. Build and deploy:
```bash
npm run build
firebase deploy
```

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Drag and drop the `dist` folder to Netlify

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Environment Variables

For production, use environment variables for sensitive data:

Create `.env` file:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Update [`config.js`](src/firebase/config.js:6):
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Support

If you encounter any issues:

1. Check the [README.md](README.md) for general information
2. Review Firebase Console for errors
3. Check browser console for JavaScript errors
4. Verify all dependencies are installed correctly

## Next Steps

- Add more house listings
- Customize the design to match your brand
- Set up payment integration
- Configure email/SMS notifications
- Add analytics tracking
- Implement admin user management
- Add house search functionality
- Create mobile app version

Happy coding! 🚀
