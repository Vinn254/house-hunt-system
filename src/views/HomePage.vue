<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-primary-500 via-primary-600 to-lime-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Dream Home<br />
            <span class="text-lime-200">Verified. Trusted. Hassle-Free.</span>
          </h1>
          <p class="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            Kenya's most reliable house hunting platform connecting you with genuine vacant properties
          </p>
          <p class="text-lg text-lime-100 mb-8">
            ✓ 100% Verified Listings  ✓ No Fake Brokers  ✓ Transparent Pricing  ✓ Instant Booking
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-white text-primary-700 hover:bg-lime-50 font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
              Browse Houses Now
            </button>
            <button class="bg-primary-800 hover:bg-primary-900 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all border-2 border-white/30">
              How It Works
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="bg-white shadow-md -mt-8 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select v-model="filters.location" class="input-field">
              <option value="">All Locations</option>
              <option value="Saika">Saika</option>
              <option value="Ruaraka">Ruaraka</option>
              <option value="Nairobi CBD">Nairobi CBD</option>
              <option value="Kasarani">Kasarani</option>
              <option value="Thika Road">Thika Road</option>
              <option value="Eastleigh">Eastleigh</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">House Type</label>
            <select v-model="filters.houseType" class="input-field">
              <option value="">All Types</option>
              <option value="Single Room">Single Room</option>
              <option value="Bedsitter">Bedsitter</option>
              <option value="1 Bedroom">1 Bedroom</option>
              <option value="2 Bedroom">2 Bedroom</option>
              <option value="3 Bedroom">3 Bedroom</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Min Rent (KSh)</label>
            <input 
              v-model.number="filters.minRent" 
              type="number" 
              placeholder="e.g., 5000"
              class="input-field"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Max Rent (KSh)</label>
            <input 
              v-model.number="filters.maxRent" 
              type="number" 
              placeholder="e.g., 50000"
              class="input-field"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Houses Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          Available Houses
          <span class="text-primary-600">({{ filteredHouses.length }})</span>
        </h2>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="card animate-pulse">
          <div class="h-48 bg-gray-300"></div>
          <div class="p-4 space-y-3">
            <div class="h-4 bg-gray-300 rounded w-3/4"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
            <div class="h-4 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>

      <!-- Houses List -->
      <div v-else-if="filteredHouses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="house in filteredHouses" 
          :key="house.id"
          class="card hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          @click="viewHouse(house.id)"
        >
          <div class="relative h-48 overflow-hidden">
            <img 
              :src="house.images[0] || '/placeholder-house.jpg'" 
              :alt="house.title"
              class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
            <div class="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              KSh {{ house.rent.toLocaleString() }}/mo
            </div>
            <div class="absolute top-2 left-2 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
              {{ house.houseType }}
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ house.title }}</h3>
            <div class="flex items-center text-gray-600 mb-3">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span class="text-sm">{{ house.location }}</span>
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="amenity in house.amenities.slice(0, 3)" 
                :key="amenity"
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {{ amenity }}
              </span>
              <span 
                v-if="house.amenities.length > 3"
                class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                +{{ house.amenities.length - 3 }} more
              </span>
            </div>
            
            <button class="w-full btn-primary">
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <svg class="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No houses found</h3>
        <p class="mt-2 text-gray-500">Try adjusting your filters to see more results.</p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">Why Thousands Trust HouseHuntKE</h2>
        <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We've revolutionized house hunting in Kenya by eliminating the frustrations of fake listings, unreliable brokers, and endless physical searches.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">100% Verified Properties</h3>
            <p class="text-gray-600">Every single house is physically inspected and verified by our professional team before listing. Zero tolerance for fake listings.</p>
          </div>
          
          <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Instant Online Booking</h3>
            <p class="text-gray-600">Schedule house viewings in seconds. Pay securely via M-Pesa or on-site. Get confirmed appointments without endless phone calls.</p>
          </div>
          
          <div class="text-center p-6 hover:shadow-lg transition-shadow rounded-lg">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Seamless Relocation</h3>
            <p class="text-gray-600">Found your perfect home? We'll help you move! Professional movers, transparent pricing, and insured transport all in one platform.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const router = useRouter();

const houses = ref([]);
const loading = ref(true);
const filters = ref({
  location: '',
  houseType: '',
  minRent: null,
  maxRent: null
});

// Computed property for filtered houses
const filteredHouses = computed(() => {
  return houses.value.filter(house => {
    if (filters.value.location && house.location !== filters.value.location) {
      return false;
    }
    if (filters.value.houseType && house.houseType !== filters.value.houseType) {
      return false;
    }
    if (filters.value.minRent && house.rent < filters.value.minRent) {
      return false;
    }
    if (filters.value.maxRent && house.rent > filters.value.maxRent) {
      return false;
    }
    return true;
  });
});

// Fetch houses from Firebase
onMounted(() => {
  // For development, use mock data directly
  houses.value = getMockHouses();
  loading.value = false;

  /*
  const housesQuery = query(
    collection(db, 'houses'),
    where('status', '==', 'Available'),
    where('verified', '==', true)
  );

  onSnapshot(housesQuery, (snapshot) => {
    houses.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    loading.value = false;
  }, (error) => {
    console.error('Error fetching houses:', error);
    loading.value = false;
    // Use mock data for development
    houses.value = getMockHouses();
  });
  */
});

const viewHouse = (houseId) => {
  router.push(`/house/${houseId}`);
};

// Mock data for development
const getMockHouses = () => [
  {
    id: 'img1',
    title: 'Modern Bedsitter in Kilimani',
    location: 'Nairobi',
    houseType: 'Bedsitter',
    rent: 15000,
    images: ['/img1.PNG'],
    amenities: ['WiFi', 'Water 24/7', 'Parking', 'Security'],
    status: 'Available',
    verified: true
  },
  {
    id: 'img2',
    title: 'Spacious 2 Bedroom in Westlands',
    location: 'Nairobi',
    houseType: '2 Bedroom',
    rent: 45000,
    images: ['/img2.PNG'],
    amenities: ['WiFi', 'Gym', 'Swimming Pool', 'Parking'],
    status: 'Available',
    verified: true
  },
  {
    id: 'img3',
    title: 'Affordable Single Room in Kasarani',
    location: 'Nairobi',
    houseType: 'Single Room',
    rent: 8000,
    images: ['/img3.PNG'],
    amenities: ['Water 24/7', 'Security'],
    status: 'Available',
    verified: true
  },
  {
    id: 'img4',
    title: 'Luxury 3 Bedroom in Lavington',
    location: 'Nairobi',
    houseType: '3 Bedroom',
    rent: 85000,
    images: ['/img4.PNG'],
    amenities: ['WiFi', 'Gym', 'Swimming Pool', 'Parking', 'Garden'],
    status: 'Available',
    verified: true
  },
  {
    id: 'img5',
    title: 'Cozy 1 Bedroom in South B',
    location: 'Nairobi',
    houseType: '1 Bedroom',
    rent: 25000,
    images: ['/img5.PNG'],
    amenities: ['WiFi', 'Water 24/7', 'Parking'],
    status: 'Available',
    verified: true
  },
  {
    id: 'img6',
    title: 'Modern Bedsitter in Mombasa',
    location: 'Mombasa',
    houseType: 'Bedsitter',
    rent: 12000,
    images: ['/img6.PNG'],
    amenities: ['WiFi', 'Water 24/7', 'Security'],
    status: 'Available',
    verified: true
  }
];
</script>
