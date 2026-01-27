<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white">
        <h1 class="text-3xl font-bold mb-2">
          Welcome back, {{ user?.displayName || 'User' }}! 👋
        </h1>
        <p class="text-primary-100">
          Manage your bookings and find your perfect home
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Active Bookings</p>
              <p class="text-3xl font-bold text-gray-900">{{ activeBookings.length }}</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Saved Houses</p>
              <p class="text-3xl font-bold text-gray-900">{{ savedHouses.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Completed Views</p>
              <p class="text-3xl font-bold text-gray-900">{{ completedBookings.length }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              @click="activeTab = 'bookings'"
              :class="[
                activeTab === 'bookings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              My Bookings
            </button>
            <button
              @click="activeTab = 'saved'"
              :class="[
                activeTab === 'saved'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Saved Houses
            </button>
          </nav>
        </div>
      </div>

      <!-- Bookings Tab -->
      <div v-if="activeTab === 'bookings'">
        <div v-if="loading" class="space-y-4">
          <div v-for="n in 3" :key="n" class="card p-6 animate-pulse">
            <div class="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <div v-else-if="bookings.length === 0" class="card p-12 text-center">
          <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
          <p class="text-gray-500 mb-6">Start browsing houses and book your first viewing</p>
          <router-link to="/" class="btn-primary inline-block">
            Browse Houses
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div 
            v-for="booking in bookings" 
            :key="booking.id"
            class="card p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ booking.houseTitle }}</h3>
                  <span 
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                  </span>
                </div>
                <div class="space-y-1 text-sm text-gray-600">
                  <p class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {{ formatDate(booking.date) }} at {{ booking.time }}
                  </p>
                  <p class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    Payment: {{ booking.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Pay on-site' }}
                  </p>
                </div>
              </div>
              <div class="mt-4 md:mt-0 flex gap-2">
                <button 
                  v-if="booking.status === 'pending'"
                  @click="cancelBooking(booking.id)"
                  class="btn-secondary text-sm"
                >
                  Cancel
                </button>
                <router-link 
                  :to="`/house/${booking.houseId}`"
                  class="btn-primary text-sm"
                >
                  View House
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Saved Houses Tab -->
      <div v-if="activeTab === 'saved'">
        <div v-if="savedHouses.length === 0" class="card p-12 text-center">
          <svg class="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No saved houses</h3>
          <p class="text-gray-500 mb-6">Save houses you're interested in for quick access later</p>
          <router-link to="/" class="btn-primary inline-block">
            Browse Houses
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="house in savedHouses" 
            :key="house.id"
            class="card hover:shadow-xl transition-shadow cursor-pointer"
            @click="$router.push(`/house/${house.id}`)"
          >
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="house.images[0]" 
                :alt="house.title"
                class="w-full h-full object-cover"
              />
              <div class="absolute top-2 right-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                KSh {{ house.rent.toLocaleString() }}/mo
              </div>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ house.title }}</h3>
              <p class="text-sm text-gray-600">{{ house.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../composables/useAuth';

const { user } = useAuth();

const activeTab = ref('bookings');
const bookings = ref([]);
const savedHouses = ref([]);
const loading = ref(true);

const activeBookings = computed(() => 
  bookings.value.filter(b => b.status === 'pending' || b.status === 'confirmed')
);

const completedBookings = computed(() => 
  bookings.value.filter(b => b.status === 'completed')
);

onMounted(() => {
  if (user.value) {
    // Fetch bookings
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('userId', '==', user.value.uid)
    );

    onSnapshot(bookingsQuery, (snapshot) => {
      bookings.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      loading.value = false;
    }, (error) => {
      console.error('Error fetching bookings:', error);
      loading.value = false;
      // Use mock data for development
      bookings.value = getMockBookings();
    });
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const cancelBooking = async (bookingId) => {
  if (confirm('Are you sure you want to cancel this booking?')) {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking');
    }
  }
};

// Mock data for development
const getMockBookings = () => [
  {
    id: '1',
    houseId: '1',
    houseTitle: 'Modern Bedsitter in Kilimani',
    date: '2026-02-01',
    time: '10:00',
    paymentMethod: 'mpesa',
    status: 'confirmed'
  }
];
</script>
