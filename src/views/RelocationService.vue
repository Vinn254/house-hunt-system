<template>
  <div class="min-h-screen bg-slate-950 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-100 mb-2">Relocation Service</h1>
        <p class="text-slate-400">Seamless moving services for your new home</p>
      </div>

      <!-- Service Info -->
      <div class="card p-6 mb-8">
        <div class="flex items-start gap-4 mb-6">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-semibold text-slate-100 mb-2">Professional Moving Services</h2>
            <p class="text-slate-400">
              We provide reliable and affordable relocation services to help you move into your new home. 
              Our experienced team handles everything from packing to transportation.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-sm text-slate-300">Professional Movers</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-sm text-slate-300">Insured Transport</span>
          </div>
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span class="text-sm text-slate-300">Affordable Rates</span>
          </div>
        </div>
      </div>

      <!-- Request Form -->
      <div class="card p-6">
        <h2 class="text-xl font-semibold text-slate-100 mb-6">Request Relocation Service</h2>

        <form @submit.prevent="submitRequest" class="space-y-6">
          <!-- Pickup Location -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Pickup Location
            </label>
            <div class="flex gap-2">
              <input
                v-model="formData.pickupLocation"
                type="text"
                placeholder="Enter your current address"
                required
                class="input-field flex-1"
              />
              <button
                type="button"
                @click="pinPickupLocation"
                :disabled="gettingLocation"
                class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                title="Use my current location"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ gettingLocation ? 'Getting...' : 'Pin' }}
              </button>
            </div>
            <p class="mt-1 text-xs text-slate-400">
              {{ formData.pickupCoords ? '📍 Location pinned successfully' : 'Click Pin to use your current location' }}
            </p>
          </div>

          <!-- Destination Location -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Destination Location
            </label>
            <input
              v-model="formData.destinationLocation"
              type="text"
              placeholder="Enter your new address"
              required
              class="input-field"
            />
          </div>


          <!-- House Size -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              House Size
            </label>
            <select v-model="formData.houseSize" required class="input-field" @change="calculateEstimate">
              <option value="">Select house size</option>
              <option value="single">Single Room</option>
              <option value="bedsitter">Bedsitter</option>
              <option value="1bedroom">1 Bedroom</option>
              <option value="2bedroom">2 Bedroom</option>
              <option value="3bedroom">3 Bedroom</option>
            </select>
          </div>

          <!-- Distance -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Distance (km)
            </label>
            <input
              v-model.number="formData.distance"
              type="number"
              min="1"
              step="0.1"
              placeholder="e.g., 15"
              required
              class="input-field"
              @input="calculateEstimate"
            />
            <p class="mt-1 text-xs text-slate-400">
              Enter the estimated distance between pickup and destination locations
            </p>
          </div>

          <!-- Moving Date -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Preferred Moving Date
            </label>
            <input 
              v-model="formData.movingDate" 
              type="date"
              :min="minDate"
              required
              class="input-field"
            />
          </div>

          <!-- Additional Items -->
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">
              Additional Items/Notes
            </label>
            <textarea 
              v-model="formData.notes" 
              rows="3"
              placeholder="Any special items or requirements? (e.g., fragile items, heavy furniture)"
              class="input-field"
            ></textarea>
          </div>

          <!-- Estimated Cost -->
          <div v-if="estimatedCost > 0" class="bg-primary-900/20 border border-primary-700 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-400 mb-1">Estimated Cost</p>
                <p class="text-2xl font-bold text-primary-600">KSh {{ estimatedCost.toLocaleString() }}</p>
              </div>
              <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <p class="text-xs text-slate-400 mt-2">
              * Final cost may vary based on actual items and conditions
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex gap-4">
            <button 
              type="button"
              @click="$router.back()"
              class="flex-1 btn-secondary"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="submitting || estimatedCost === 0"
              class="flex-1 btn-primary disabled:opacity-50"
            >
              {{ submitting ? 'Submitting...' : 'Request Service' }}
            </button>
          </div>
        </form>
      </div>

      <!-- My Relocation Requests -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold text-slate-100 mb-4">My Relocation Requests</h2>
        
        <div v-if="requests.length === 0" class="card p-8 text-center">
          <svg class="mx-auto h-16 w-16 text-slate-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
          </svg>
          <p class="text-slate-400">No relocation requests yet</p>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="request in requests" 
            :key="request.id"
            class="card p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-semibold',
                    request.status === 'completed' ? 'bg-green-100 text-green-800' :
                    request.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    request.status === 'confirmed' ? 'bg-primary-100 text-primary-800' :
                    'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('-', ' ') }}
                </span>
              </div>
              <p class="text-lg font-bold text-primary-600">
                KSh {{ request.estimatedCost.toLocaleString() }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-slate-400">From:</p>
                <p class="font-medium text-slate-100">{{ request.pickupLocation }}</p>
              </div>
              <div>
                <p class="text-slate-400">To:</p>
                <p class="font-medium text-slate-100">{{ request.destinationLocation }}</p>
              </div>
              <div>
                <p class="text-slate-400">Moving Date:</p>
                <p class="font-medium text-slate-100">{{ formatDate(request.movingDate) }}</p>
              </div>
              <div>
                <p class="text-slate-400">House Size:</p>
                <p class="font-medium text-slate-100">{{ formatHouseSize(request.houseSize) }}</p>
              </div>
            </div>

            <div v-if="request.notes" class="mt-4 pt-4 border-t border-slate-800">
              <p class="text-sm text-slate-400">Notes:</p>
              <p class="text-sm text-slate-100">{{ request.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user } = useAuth();

const formData = ref({
  pickupLocation: '',
  destinationLocation: '',
  pickupCoords: null,
  houseSize: '',
  distance: null,
  movingDate: '',
  notes: ''
});

const estimatedCost = ref(0);
const submitting = ref(false);
const requests = ref([]);
const gettingLocation = ref(false);

const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

// Pricing structure
const basePrices = {
  single: 3000,
  bedsitter: 5000,
  '1bedroom': 8000,
  '2bedroom': 12000,
  '3bedroom': 18000
};

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

const pinPickupLocation = async () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
    return;
  }

  gettingLocation.value = true;
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      formData.value.pickupCoords = { lat, lng };
      
      // Get place name using reverse geocoding
      try {
        // Try direct API first (works in production)
        let geocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
        let response = await fetch(geocodingUrl);

        // If CORS error, try with a CORS proxy (for development)
        if (!response.ok && response.type === 'opaque') {
          const corsProxy = 'https://cors-anywhere.herokuapp.com/';
          geocodingUrl = corsProxy + `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
          response = await fetch(geocodingUrl);
        }

        if (!response.ok) throw new Error('Geocoding API error');

        const data = await response.json();

        // Build a more readable address
        const address = data.address || {};
        const parts = [];

        if (address.house_number) parts.push(address.house_number);
        if (address.road) parts.push(address.road);
        if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
        if (address.city || address.town || address.village) parts.push(address.city || address.town || address.village);
        if (address.county && !parts.includes(address.county)) parts.push(address.county);

        const placeName = parts.length > 0 ? parts.join(', ') : (data.display_name ? data.display_name.split(', ').slice(0, 3).join(', ') : 'Unknown Location');
        formData.value.pickupLocation = placeName;
      } catch (error) {
        console.error('Reverse geocoding failed:', error);
        // Fallback: Show coordinates with note that address will be confirmed by team
        formData.value.pickupLocation = `📍 Pinned Location (${lat.toFixed(4)}, ${lng.toFixed(4)}) - Address will be confirmed by our team`;
      }
      
      // Note: Distance auto-calculation removed since destination pinning is disabled
      
      gettingLocation.value = false;
    },
    (error) => {
      alert('Unable to get your location. Please enable location services and try again.');
      console.error('Geolocation error:', error);
      gettingLocation.value = false;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
};


const calculateEstimate = () => {
  if (formData.value.houseSize && formData.value.distance) {
    const basePrice = basePrices[formData.value.houseSize] || 0;
    const distanceCost = formData.value.distance * 1000; // KSh 1,000 per km
    estimatedCost.value = basePrice + distanceCost;
  }
};

const submitRequest = async () => {
  submitting.value = true;

  try {
    await addDoc(collection(db, 'relocationRequests'), {
      userId: user.value.uid,
      userEmail: user.value.email,
      userName: user.value.displayName,
      ...formData.value,
      estimatedCost: estimatedCost.value,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    alert('Relocation request submitted successfully! Our team will contact you shortly.');
    
    // Reset form
    formData.value = {
      pickupLocation: '',
      destinationLocation: '',
      pickupCoords: null,
      houseSize: '',
      distance: null,
      movingDate: '',
      notes: ''
    };
    estimatedCost.value = 0;
  } catch (error) {
    console.error('Error submitting request:', error);
    alert('Failed to submit request. Please try again.');
  } finally {
    submitting.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatHouseSize = (size) => {
  const sizeMap = {
    single: 'Single Room',
    bedsitter: 'Bedsitter',
    '1bedroom': '1 Bedroom',
    '2bedroom': '2 Bedroom',
    '3bedroom': '3 Bedroom'
  };
  return sizeMap[size] || size;
};

onMounted(() => {
  if (user.value) {
    const requestsQuery = query(
      collection(db, 'relocationRequests'),
      where('userId', '==', user.value.uid)
    );

    onSnapshot(requestsQuery, (snapshot) => {
      requests.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }, (error) => {
      console.error('Error fetching requests:', error);
    });
  }
});
</script>
