# Firebase Authentication Setup Guide

Follow these steps to enable Google Sign-in and Phone (SMS OTP) authentication in your HouseHuntKE application.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project" or select existing project
3. Enter project name: `househunt-ke` (or your preferred name)
4. Click "Continue"
5. Disable Google Analytics (optional) or configure it
6. Click "Create project"
7. Wait for project creation, then click "Continue"

## Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `HouseHuntKE Web`
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. **Copy the Firebase configuration** - you'll need this!

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

6. Click "Continue to console"

## Step 3: Update Firebase Configuration

1. Open `src/firebase/config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your actual API key
  authDomain: "househunt-ke.firebaseapp.com",
  projectId: "househunt-ke",
  storageBucket: "househunt-ke.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 4: Enable Google Sign-In

1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **Get started** (if first time)
3. Go to **Sign-in method** tab
4. Click on **Google** provider
5. Click the **Enable** toggle
6. Enter **Project support email**: your email address
7. Click **Save**

✅ Google Sign-in is now enabled!

## Step 5: Enable Phone Authentication

1. Still in **Authentication** → **Sign-in method**
2. Click on **Phone** provider
3. Click the **Enable** toggle
4. Click **Save**

### Important: Add Test Phone Numbers (for development)

1. Scroll down to **Phone numbers for testing**
2. Click **Add phone number**
3. Enter test number: `+254792807900` (or your number)
4. Enter test code: `123456` (any 6-digit code)
5. Click **Add**

This allows you to test without sending real SMS during development.

## Step 6: Configure Authorized Domains

1. In **Authentication** → **Settings** tab
2. Scroll to **Authorized domains**
3. By default, `localhost` is already authorized
4. When deploying, add your production domain:
   - Click **Add domain**
   - Enter: `yourdomain.com`
   - Click **Add**

## Step 7: Set Up Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Select **Start in test mode** (for development)
4. Choose location: `us-central` or closest to Kenya
5. Click **Enable**

### Create Collections

Create these collections for your app:

1. **houses** - For house listings
2. **bookings** - For viewing bookings
3. **relocationRequests** - For relocation services

## Step 8: Enable Storage

1. Go to **Storage** (left sidebar)
2. Click **Get started**
3. Start in **test mode**
4. Click **Next**
5. Choose same location as Firestore
6. Click **Done**

## Step 9: Test Authentication

### Test Google Sign-In

1. Run your app: `npm run dev`
2. Go to `http://localhost:5173/login`
3. Click "Continue with Google"
4. Select your Google account
5. You should be redirected to dashboard

### Test Phone Authentication

#### Using Test Number (Development)

1. Go to login page
2. Enter phone: `792807900` (without +254)
3. Click "Send OTP"
4. Enter test code: `123456` (the code you set in Firebase)
5. Click "Verify OTP"
6. You should be signed in

#### Using Real Number (Production)

1. Make sure you have credits in Firebase (free tier includes some SMS)
2. Enter real phone number
3. Click "Send OTP"
4. Check your phone for SMS
5. Enter the 6-digit code
6. Click "Verify OTP"

## Step 10: Troubleshooting

### reCAPTCHA Issues

If you see reCAPTCHA errors:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Go to **APIs & Services** → **Credentials**
4. Find your API key
5. Under **Application restrictions**, select **None**
6. Under **API restrictions**, select **Don't restrict key**
7. Click **Save**

### Phone Auth Not Working

1. Check Firebase Console → **Usage** tab
2. Ensure you have SMS quota available
3. For testing, use test phone numbers
4. Check browser console for errors

### Google Sign-In Not Working

1. Verify Google provider is enabled
2. Check authorized domains include `localhost`
3. Clear browser cache and cookies
4. Try incognito/private browsing mode

## Step 11: Production Deployment

### Before Deploying

1. **Update Security Rules** in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /houses/{houseId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /bookings/{bookingId} {
      allow read, write: if request.auth != null && 
        (resource.data.userId == request.auth.uid || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

2. **Update Storage Rules**:

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

3. **Add Production Domain** to authorized domains
4. **Remove test phone numbers** from Firebase Console
5. **Enable App Check** for additional security (optional)

## Quick Reference

### Firebase Console URLs
- Main Console: https://console.firebase.google.com
- Authentication: https://console.firebase.google.com/project/YOUR_PROJECT/authentication
- Firestore: https://console.firebase.google.com/project/YOUR_PROJECT/firestore
- Storage: https://console.firebase.google.com/project/YOUR_PROJECT/storage

### Test Credentials
- Test Phone: +254792807900
- Test OTP: 123456 (or whatever you set)

### Support
- Firebase Docs: https://firebase.google.com/docs
- Phone Auth Guide: https://firebase.google.com/docs/auth/web/phone-auth
- Google Sign-In Guide: https://firebase.google.com/docs/auth/web/google-signin

## Summary Checklist

- [ ] Created Firebase project
- [ ] Registered web app
- [ ] Updated `src/firebase/config.js` with real config
- [ ] Enabled Google Sign-in provider
- [ ] Enabled Phone authentication provider
- [ ] Added test phone number (for development)
- [ ] Authorized localhost domain
- [ ] Created Firestore database
- [ ] Enabled Storage
- [ ] Tested Google Sign-in
- [ ] Tested Phone authentication
- [ ] Ready to use the app!

---

**Need Help?** Contact support at 0792 807 900 or check the Firebase documentation.
