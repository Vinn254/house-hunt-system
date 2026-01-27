# HouseHuntKE - House Hunting Application

A modern, user-friendly house hunting platform for Kenya with verified listings, booking system, and integrated relocation services.

## Features

- **Verified House Listings** - Browse verified vacant houses with detailed information
-  **Secure Authentication** - Google Sign-in and Phone Number authentication via Firebase
-  **Booking System** - Schedule house viewings with M-Pesa or on-site payment
-  **Relocation Service** - Integrated moving services with cost estimation
- 📱 **Responsive Design** - Mobile-friendly interface with toggle navigation
-  **Professional UI** - Green primary color theme with consistent design
-  **Real-time Updates** - Firebase real-time database for instant notifications
-  **Admin Dashboard** - Manage houses, bookings, and relocation requests

## Tech Stack

- **Frontend**: Vue 3 with Composition API
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd house-hunting-app
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Google and Phone)
   - Create a Firestore database
   - Enable Storage
   - Copy your Firebase configuration

4. Update Firebase configuration in `src/firebase/config.js`:
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

5. Set up Firestore collections:
   - `houses` - Store house listings
   - `bookings` - Store viewing bookings
   - `relocationRequests` - Store relocation service requests

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
house-hunting-app/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable Vue components
│   │   └── Navbar.vue   # Navigation bar with toggle menu
│   ├── composables/     # Vue composables
│   │   └── useAuth.js   # Authentication logic
│   ├── firebase/        # Firebase configuration
│   │   └── config.js    # Firebase setup
│   ├── router/          # Vue Router configuration
│   │   └── index.js     # Route definitions
│   ├── views/           # Page components
│   │   ├── HomePage.vue           # Landing page with house listings
│   │   ├── HouseDetail.vue        # House detail and booking page
│   │   ├── LoginPage.vue          # Authentication page
│   │   ├── UserDashboard.vue      # User dashboard
│   │   ├── AdminDashboard.vue     # Admin management panel
│   │   └── RelocationService.vue  # Relocation service page
│   ├── App.vue          # Root component
│   ├── main.js          # Application entry point
│   └── style.css        # Global styles with Tailwind
├── public/              # Public assets
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite configuration
└── package.json         # Project dependencies
```

## Key Features Explained

### Landing Page
- Public access to browse all verified vacant houses
- Real-time filtering by location, house type, and rent range
- No login required for browsing

### House Detail Page
- High-quality images with gallery navigation
- Video walkthroughs
- Controlled information display (approximate location only)
- Viewing fee transparency
- Booking form for authenticated users

### Authentication
- Google Sign-in for quick access
- Phone number verification with OTP
- Automatic redirect to intended page after login

### User Dashboard
- View active and completed bookings
- Manage saved houses
- Access relocation services
- Personalized welcome message

### Admin Dashboard
- Manage house listings (add, edit, verify)
- Review and confirm bookings
- Handle relocation requests
- Track revenue and statistics

### Relocation Service
- Integrated moving service
- Cost estimation based on house size and distance
- Real-time status tracking
- Seamless transition from house selection to moving

## Color Scheme

The application uses a professional green color palette:
- Primary: Green (#22c55e and variations)
- Secondary: Gray tones for text and backgrounds
- Accent colors for status indicators

## Firebase Security Rules

Remember to set up proper security rules in Firebase:

### Firestore Rules Example:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Houses - Read public, Write admin only
    match /houses/{houseId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Bookings - Users can read/write their own
    match /bookings/{bookingId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
    }
    
    // Relocation Requests - Users can read/write their own
    match /relocationRequests/{requestId} {
      allow read: if request.auth != null && 
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@househuntke.com or open an issue in the repository.

## Acknowledgments

- Vue.js team for the amazing framework
- Firebase for backend services
- Tailwind CSS for the utility-first CSS framework
