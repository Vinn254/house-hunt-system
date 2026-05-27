<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20">
      <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 opacity-95"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-2 rounded-full border border-accent-300/20 bg-accent-500/10 px-4 py-2 text-sm text-accent-100">
              <span class="font-semibold">Kisumu House Hunt</span>
              <span class="text-accent-200">Best in Kisumu</span>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold leading-tight text-white">
              Discover Your Dream Home
              <span class="block text-accent-300 mt-2">Verified. Trusted. Hassle-Free.</span>
            </h1>
            <p class="text-lg md:text-xl text-slate-200 max-w-xl">
              Kisumu's most reliable house hunting platform connecting you with genuine vacant properties.
            </p>
            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
                <p class="text-slate-100 font-semibold">✓ 100% Verified Listings</p>
              </div>
              <div class="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
                <p class="text-slate-100 font-semibold">✓ No Fake Brokers</p>
              </div>
              <div class="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
                <p class="text-slate-100 font-semibold">✓ Transparent Pricing</p>
              </div>
              <div class="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/20">
                <p class="text-slate-100 font-semibold">✓ Instant Booking</p>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="btn-primary w-full sm:w-auto py-4 px-8 text-lg">
                Browse Houses Now
              </button>
              <button class="w-full sm:w-auto rounded-3xl border border-slate-700 bg-slate-900/80 py-4 px-8 text-lg font-semibold text-slate-100 transition hover:bg-slate-900">
                How It Works
              </button>
            </div>
          </div>

          <div class="relative">
            <div class="rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-950/40 ring-1 ring-white/10">
              <img src="/placeholder-house.jpg" alt="Dream home in Kisumu" class="w-full h-full min-h-[420px] object-cover" />
            </div>

            <div class="absolute top-6 right-6 w-[18rem] space-y-4">
              <div class="rounded-3xl border border-white/10 bg-slate-900/90 p-4 shadow-2xl shadow-slate-950/30 backdrop-blur">
                <div class="flex items-center gap-3">
                  <img src="/img5.PNG" alt="Featured house" class="h-16 w-16 rounded-3xl object-cover border border-slate-700" />
                  <div>
                    <p class="text-sm text-slate-400 uppercase tracking-[0.2em]">Mini Tour</p>
                    <p class="font-semibold text-white">Private preview homes</p>
                  </div>
                </div>
                <div class="mt-4 grid gap-2 text-sm text-slate-200">
                  <div class="inline-flex items-center gap-2 rounded-2xl bg-slate-800/90 px-3 py-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-sky-400"></span>
                    Verified listings
                  </div>
                  <div class="inline-flex items-center gap-2 rounded-2xl bg-slate-800/90 px-3 py-2">
                    <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                    Trusted brokers
                  </div>
                </div>
              </div>
              <div class="rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
                <p class="text-sm uppercase tracking-[0.2em] text-accent-300">Why clients love us</p>
                <div class="mt-4 grid gap-3">
                  <div class="rounded-3xl bg-slate-950/90 px-4 py-3">
                    <p class="text-slate-200">Fast booking</p>
                    <p class="font-semibold text-white">30+ homes booked daily</p>
                  </div>
                  <div class="rounded-3xl bg-slate-950/90 px-4 py-3">
                    <p class="text-slate-200">Local guidance</p>
                    <p class="font-semibold text-white">Kisumu area experts</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-8 left-6 right-6 rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
              <div class="flex items-center gap-4">
                <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-500/15 text-accent-100">KSM</span>
                <div>
                  <p class="text-sm uppercase tracking-[0.2em] text-slate-400">Featured</p>
                  <p class="text-lg font-semibold text-white">Kisumu-ready houses with easy viewing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

       <!-- Filters Section -->
       <section class="bg-slate-950/95 shadow-2xl border border-slate-800 -mt-8 relative z-10">
         <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
           <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
             <div>
               <label class="block text-sm font-medium text-slate-300 mb-2">Location</label>
               <select v-model="filters.location" class="input-field">
                 <option value="">All Locations</option>
                 <!-- Areas & Estates in Kisumu City -->
                 <option value="Milimani">Milimani</option>
                 <option value="Migosi">Migosi</option>
                 <option value="Kondele">Kondele</option>
                 <option value="Nyalenda A">Nyalenda A</option>
                 <option value="Nyalenda B">Nyalenda B</option>
                 <option value="Manyatta">Manyatta</option>
                 <option value="Manyatta B">Manyatta B</option>
                 <option value="Obunga">Obunga</option>
                 <option value="Mamboleo">Mamboleo</option>
                 <option value="Riat Hills">Riat Hills</option>
                 <option value="Nyamasaria">Nyamasaria</option>
                 <option value="Tom Mboya Estate (TM)">Tom Mboya Estate (TM)</option>
                 <option value="Lolwe Estate">Lolwe Estate</option>
                 <option value="Polyview">Polyview</option>
                 <option value="Kenya Re">Kenya Re</option>
                 <option value="Airport Estate">Airport Estate</option>
                 <option value="Mountain View">Mountain View</option>
                 <option value="Kibuye">Kibuye</option>
                 <option value="Shauri Moyo">Shauri Moyo</option>
                 <option value="Kaloleni">Kaloleni</option>
                 <option value="Railways">Railways</option>
                 <option value="Market Milimani">Market Milimani</option>
                 <option value="CBD (Central Business District)">CBD (Central Business District)</option>
                 <option value="Makasembo">Makasembo</option>
                 <option value="Otonglo">Otonglo</option>
                 <option value="Kibos">Kibos</option>
                 <option value="Kiboswa">Kiboswa</option>
               <option value="Dunga">Dunga</option>
               <option value="Kanyakwar">Kanyakwar</option>
               <option value="Kajulu">Kajulu</option>
               <option value="Rabuor">Rabuor</option>
               <option value="Carwash">Carwash</option>
               <option value="Mosque Area">Mosque Area</option>
               <option value="Bandani">Bandani</option>
               <option value="Nyawita">Nyawita</option>
               <option value="Ojola">Ojola</option>
               <option value="Korando">Korando</option>
               <option value="Nyahera">Nyahera</option>
               <option value="Daraja Mbili">Daraja Mbili</option>
               <option value="Swan">Swan</option>
               <option value="Gudka">Gudka</option>
               <option value="Kogony">Kogony</option>
               <option value="Koru">Koru</option>
               <option value="Chemelil">Chemelil</option>
               <option value="Awasi">Awasi</option>
               <option value="Ahero">Ahero</option>
               <option value="Katito">Katito</option>
               <option value="Maseno">Maseno</option>
               <option value="Kombewa">Kombewa</option>
               <!-- Kisumu Sub-Counties -->
               <option value="Kisumu Central">Kisumu Central</option>
               <option value="Kisumu East">Kisumu East</option>
               <option value="Kisumu West">Kisumu West</option>
               <option value="Seme">Seme</option>
               <option value="Nyando">Nyando</option>
               <option value="Muhoroni">Muhoroni</option>
               <option value="Nyakach">Nyakach</option>
               <!-- Wards in Kisumu County -->
               <option value="Kisumu Central">Kisumu Central</option>
               <option value="Railways">Railways</option>
               <option value="Migosi">Migosi</option>
               <option value="Shauri Moyo/Kaloleni">Shauri Moyo/Kaloleni</option>
               <option value="Market Milimani">Market Milimani</option>
               <option value="Kondele">Kondele</option>
               <option value="Nyalenda B">Nyalenda B</option>
               <option value="Kisumu East">Kisumu East</option>
               <option value="Kajulu">Kajulu</option>
               <option value="Kolwa East">Kolwa East</option>
               <option value="Manyatta B">Manyatta B</option>
               <option value="Nyalenda A">Nyalenda A</option>
             </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">House Type</label>
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
            <label class="block text-sm font-medium text-slate-300 mb-2">Min Rent (KSh)</label>
            <input 
              v-model.number="filters.minRent" 
              type="number" 
              placeholder="e.g., 5000"
              class="input-field"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Max Rent (KSh)</label>
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
         <h2 class="text-2xl font-bold text-slate-100">
           Available Houses
           <span class="text-accent-300">({{ filteredHouses.length }})</span>
         </h2>
       </div>

       <!-- Loading State -->
       <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         <div v-for="n in 6" :key="n" class="card animate-pulse">
           <div class="h-48 bg-slate-700"></div>
           <div class="p-4 space-y-3">
             <div class="h-4 bg-slate-700 rounded w-3/4"></div>
             <div class="h-4 bg-slate-700 rounded w-1/2"></div>
             <div class="h-4 bg-slate-700 rounded w-full"></div>
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
               loading="lazy"
             />
             <div class="absolute top-2 right-2 bg-accent-500 text-slate-950 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
               KSh {{ house.rent.toLocaleString() }}/mo
             </div>
           </div>
           <div class="p-4">
             <h3 class="text-lg font-semibold text-slate-100 mb-2">{{ house.title }}</h3>
             <div class="flex items-center text-slate-400 mb-3">
               <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
               </svg>
               <span class="text-sm text-slate-300">{{ house.location }}</span>
             </div>
             <div class="flex flex-wrap gap-2 mb-4">
               <span 
                 v-for="amenity in house.amenities.slice(0, 3)" 
                 :key="amenity"
                 class="text-xs bg-slate-800/90 text-slate-300 px-2 py-1 rounded"
               >
                 {{ amenity }}
               </span>
               <span 
                 v-if="house.amenities.length > 3"
                 class="text-xs bg-slate-800/90 text-slate-300 px-2 py-1 rounded"
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
         <svg class="mx-auto h-24 w-24 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 011-1h2a1 1 0 001 1m-6 0h6"></path>
         </svg>
         <h3 class="mt-4 text-lg font-medium text-slate-100">No houses found</h3>
         <p class="mt-2 text-slate-400">Try adjusting your filters to see more properties in Kisumu.</p>
       </div>
     </section>

     <!-- Features Section -->
     <section class="bg-slate-950/95 py-16 border-t border-slate-800">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <h2 class="text-3xl md:text-4xl font-bold text-center text-slate-100 mb-4">Why Thousands Trust Lakeside House Finders</h2>
         <p class="text-slate-400 mb-12 max-w-2xl mx-auto text-center">
           We've revolutionized house hunting in Kisumu by eliminating the frustrations of fake listings, unreliable brokers, and endless physical searches.
         </p>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div class="text-center p-6 hover:shadow-xl transition-shadow rounded-3xl border border-slate-800 bg-slate-900/90">
             <div class="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
               </svg>
             </div>
             <h3 class="text-xl font-semibold text-slate-100 mb-3">100% Verified Properties</h3>
             <p class="text-slate-400">Every single house is physically inspected and verified by our professional team before listing. Zero tolerance for fake listings.</p>
           </div>
           
           <div class="text-center p-6 hover:shadow-xl transition-shadow rounded-3xl border border-slate-800 bg-slate-900/90">
             <div class="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
               </svg>
             </div>
             <h3 class="text-xl font-semibold text-slate-100 mb-3">Instant Online Booking</h3>
             <p class="text-slate-400">Schedule house viewings in seconds. Pay securely via M-Pesa or on-site. Get confirmed appointments without endless phone calls.</p>
           </div>
           
           <div class="text-center p-6 hover:shadow-xl transition-shadow rounded-3xl border border-slate-800 bg-slate-900/90">
             <div class="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
               <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110-4 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
               </svg>
             </div>
             <h3 class="text-xl font-semibold text-slate-100 mb-3">Seamless Relocation</h3>
             <p class="text-slate-400">Found your perfect home? We'll help you move! Professional movers, transparent pricing, and insured transport all in one platform.</p>
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
    const housesQuery = query(
      collection(db, 'houses'),
      where('status', 'in', ['free', 'booked'])
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
    // Use mock data as fallback
    houses.value = getMockHouses();
  });
});

const viewHouse = (houseId) => {
  router.push(`/house/${houseId}`);
};

// Mock data for development
const getMockHouses = () => [
  {
    id: 'img1',
    title: 'Modern Bedsitter in Milimani',
    location: 'Milimani',
    houseType: 'Bedsitter',
    rent: 15000,
    images: ['/img1.PNG'],
    amenities: ['WiFi', 'Water 24/7', 'Parking', 'Security'],
    status: 'free',
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
    status: 'booked', // This house is booked
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
    status: 'free',
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
    status: 'taken', // This house is taken (paid for)
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
    status: 'free',
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
    status: 'free',
    verified: true
  }
];
</script>
