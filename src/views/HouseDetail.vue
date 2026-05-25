<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Button -->
      <button 
        @click="$router.back()"
        class="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to listings
      </button>

      <div v-if="loading" class="animate-pulse">
        <div class="h-96 bg-gray-300 rounded-lg mb-6"></div>
        <div class="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div v-else-if="house" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
           <!-- Image Gallery -->
           <div class="card mb-6">
             <div class="relative h-96 overflow-hidden">
               <img 
                 :src="house.images[currentImageIndex]" 
                 :alt="house.title"
                 class="w-full h-full object-cover"
                 loading="lazy"
               />
               <button 
                 v-if="house.images.length > 1"
                 @click="previousImage"
                 class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
               >
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                 </svg>
               </button>
               <button 
                 v-if="house.images.length > 1"
                 @click="nextImage"
                 class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full"
               >
                 <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                 </svg>
               </button>
             </div>
             <div v-if="house.images.length > 1" class="flex gap-2 p-4 overflow-x-auto">
               <img 
                 v-for="(image, index) in house.images" 
                 :key="index"
                 :src="image"
                 @click="currentImageIndex = index"
                 class="w-20 h-20 object-cover rounded cursor-pointer border-2"
                 :class="currentImageIndex === index ? 'border-primary-600' : 'border-transparent'"
                 loading="lazy"
               />
             </div>
          </div>

          <!-- House Details -->
          <div class="card p-6 mb-6">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ house.title }}</h1>
            
            <div class="flex items-center text-gray-600 mb-6">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>{{ house.location }} (Approximate location)</span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Type</p>
                <p class="text-lg font-semibold text-gray-900">{{ house.houseType }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Monthly Rent</p>
                <p class="text-lg font-semibold text-primary-600">KSh {{ house.rent.toLocaleString() }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Deposit</p>
                <p class="text-lg font-semibold text-gray-900">KSh {{ (house.rent * 2).toLocaleString() }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-sm text-gray-600">Viewing Fee</p>
                <p class="text-lg font-semibold text-gray-900">KSh 1000</p>
              </div>
            </div>

            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-3">Description</h2>
              <p class="text-gray-600 leading-relaxed">
                {{ house.description || 'This is a beautiful and well-maintained property in a prime location. The house features modern amenities and is perfect for comfortable living.' }}
              </p>
            </div>

            <div class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-3">Amenities</h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div 
                  v-for="amenity in house.amenities" 
                  :key="amenity"
                  class="flex items-center text-gray-700"
                >
                  <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ amenity }}
                </div>
              </div>
            </div>

            <!-- Video Section -->
            <div v-if="house.videoUrl" class="mb-6">
              <h2 class="text-xl font-semibold text-gray-900 mb-3">Video Walkthrough</h2>
              <div class="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <video controls class="w-full h-full">
                  <source :src="house.videoUrl" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="card p-6 sticky top-20">
            <div class="mb-6">
              <p class="text-3xl font-bold text-primary-600 mb-2">
                KSh {{ house.rent.toLocaleString() }}
                <span class="text-lg text-gray-600 font-normal">/month</span>
              </p>
              <p class="text-sm text-gray-600">Viewing fee: KSh 1000</p>
            </div>

            <div v-if="!user" class="space-y-4">
              <p class="text-sm text-gray-600">Sign in to book a viewing</p>
              <button 
                @click="$router.push('/login')"
                class="w-full btn-primary"
              >
                Sign In to Book
              </button>
            </div>

            <div v-else-if="!showBookingForm" class="space-y-4">
              <button 
                @click="showBookingForm = true"
                class="w-full btn-primary"
              >
                Book a Viewing
              </button>
            </div>

            <form v-else @submit.prevent="submitBooking" class="space-y-4">
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                 <input
                   v-model="bookingData.name"
                   type="text"
                   placeholder="Enter your full name"
                   required
                   class="input-field"
                 />
               </div>

               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                 <input
                   v-model="bookingData.phoneNumber"
                   type="tel"
                   placeholder="0712345678"
                   required
                   class="input-field"
                 />
               </div>

               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                 <input
                   v-model="bookingData.date"
                   type="date"
                   :min="minDate"
                   required
                   class="input-field"
                 />
               </div>

               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                 <select v-model="bookingData.time" required class="input-field">
                   <option value="">Select time</option>
                   <option value="09:00">9:00 AM</option>
                   <option value="10:00">10:00 AM</option>
                   <option value="11:00">11:00 AM</option>
                   <option value="14:00">2:00 PM</option>
                   <option value="15:00">3:00 PM</option>
                   <option value="16:00">4:00 PM</option>
                 </select>
               </div>

               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                 <select v-model="bookingData.paymentMethod" required class="input-field">
                   <option value="">Select method</option>
                   <option value="mpesa">M-Pesa</option>
                   <option value="onsite">Pay on-site</option>
                 </select>
               </div>

              <div class="flex gap-2">
                <button 
                  type="button"
                  @click="showBookingForm = false"
                  class="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  :disabled="submitting"
                  class="flex-1 btn-primary disabled:opacity-50"
                >
                  {{ submitting ? 'Booking...' : 'Confirm Booking' }}
                </button>
              </div>
            </form>

            <div class="mt-6 pt-6 border-t border-gray-200">
              <h3 class="font-semibold text-gray-900 mb-3">Important Information</h3>
              <ul class="space-y-2 text-sm text-gray-600">
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Viewing fee is KSh 1000
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Exact address shared after booking
                </li>
                <li class="flex items-start">
                  <svg class="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Our team will contact you to confirm
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-600">House not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../composables/useAuth';

const route = useRoute();
const router = useRouter();
const { user } = useAuth();

const house = ref(null);
const loading = ref(true);
const currentImageIndex = ref(0);
const showBookingForm = ref(false);
const submitting = ref(false);

const bookingData = ref({
  name: '',
  phoneNumber: '',
  date: '',
  time: '',
  paymentMethod: ''
});

const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
});

onMounted(async () => {
  const houseId = route.params.id;

  try {
    const houseDoc = await getDoc(doc(db, 'houses', houseId));
    if (houseDoc.exists()) {
      house.value = { id: houseDoc.id, ...houseDoc.data() };
    }
  } catch (error) {
    console.error('Error fetching house:', error);
    // Use mock data as fallback
    house.value = getMockHouse(houseId);
  } finally {
    loading.value = false;
  }
});

const nextImage = () => {
  if (currentImageIndex.value < house.value.images.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
};

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = house.value.images.length - 1;
  }
};

// Mock data for development
const getMockHouse = (houseId) => {
  const houses = [
    {
      id: 'img1',
      title: 'Modern Bedsitter in Milimani',
      location: 'Milimani',
      houseType: 'Bedsitter',
      rent: 15000,
      images: ['/img1.PNG'],
      amenities: ['WiFi', 'Water 24/7', 'Parking', 'Security'],
      status: 'Available',
      verified: true
    },
    {
      id: 'img2',
      title: 'Spacious 2 Bedroom in Nyalenda B',
      location: 'Nyalenda B',
      houseType: '2 Bedroom',
      rent: 45000,
      images: ['/img2.PNG'],
      amenities: ['WiFi', 'Gym', 'Swimming Pool', 'Parking'],
      status: 'Available',
      verified: true
    },
    {
      id: 'img3',
      title: 'Affordable Single Room in Kondele',
      location: 'Kondele',
      houseType: 'Single Room',
      rent: 8000,
      images: ['/img3.PNG'],
      amenities: ['Water 24/7', 'Security'],
      status: 'Available',
      verified: true
    },
    {
      id: 'img4',
      title: 'Luxury 3 Bedroom in Lolwe Estate',
      location: 'Lolwe Estate',
      houseType: '3 Bedroom',
      rent: 85000,
      images: ['/img4.PNG'],
      amenities: ['WiFi', 'Gym', 'Swimming Pool', 'Parking', 'Garden'],
      status: 'Available',
      verified: true
    },
    {
      id: 'img5',
      title: 'Cozy 1 Bedroom in Migosi',
      location: 'Migosi',
      houseType: '1 Bedroom',
      rent: 25000,
      images: ['/img5.PNG'],
      amenities: ['WiFi', 'Water 24/7', 'Parking'],
      status: 'Available',
      verified: true
    },
    {
      id: 'img6',
      title: 'Modern Bedsitter in Tom Mboya Estate',
      location: 'Tom Mboya Estate (TM)',
      houseType: 'Bedsitter',
      rent: 12000,
      images: ['/img6.PNG'],
      amenities: ['WiFi', 'Water 24/7', 'Security'],
      status: 'Available',
      verified: true
    }
  ];

  return houses.find(h => h.id === houseId);
};

const submitBooking = async () => {
  submitting.value = true;

  try {
    await addDoc(collection(db, 'bookings'), {
      houseId: house.value.id,
      userId: user.value?.uid || null,
      userEmail: user.value?.email || null,
      userName: bookingData.value.name,
      houseTitle: house.value.title,
      date: bookingData.value.date,
      time: bookingData.value.time,
      paymentMethod: 'onsite', // Changed to onsite payment only
      phoneNumber: bookingData.value.phoneNumber,
      status: 'booked', // Changed from 'pending' to 'booked'
      createdAt: new Date().toISOString()
    });

    alert('Booking submitted successfully! You will be redirected to WhatsApp to chat with our agent.');
    
    // Redirect to WhatsApp after booking
    const whatsappNumber = '+254705723811'; // Replace with actual agent number
    const message = `Hello, I've booked a viewing for ${house.value.title} on ${bookingData.value.date} at ${bookingData.value.time}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodedMessage}`;
    
    window.location.href = whatsappUrl;
  } catch (error) {
    console.error('Error submitting booking:', error);
    alert('Failed to submit booking. Please try again.');
  } finally {
    submitting.value = false;
  }
};

</script>
