<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p class="text-gray-600">Manage houses, bookings, and relocation requests</p>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Total Houses</p>
              <p class="text-3xl font-bold text-gray-900">{{ houses.length }}</p>
            </div>
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Pending Bookings</p>
              <p class="text-3xl font-bold text-yellow-600">{{ pendingBookings.length }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Relocation Requests</p>
              <p class="text-3xl font-bold text-blue-600">{{ relocationRequests.length }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">Monthly Revenue</p>
              <p class="text-3xl font-bold text-green-600">KSh {{ monthlyRevenue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
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
              @click="activeTab = 'houses'"
              :class="[
                activeTab === 'houses'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Houses
            </button>
            <button
              @click="activeTab = 'bookings'"
              :class="[
                activeTab === 'bookings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Bookings
              <span v-if="pendingBookings.length > 0" class="ml-2 bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded-full text-xs font-semibold">
                {{ pendingBookings.length }}
              </span>
            </button>
            <button
              @click="activeTab = 'relocation'"
              :class="[
                activeTab === 'relocation'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Relocation
            </button>
            <button
              @click="activeTab = 'users'"
              :class="[
                activeTab === 'users'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Users
            </button>
            <button
              @click="activeTab = 'chat'"
              :class="[
                activeTab === 'chat'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              ]"
            >
              Live Chat
              <span v-if="unreadMessages > 0" class="ml-2 bg-red-100 text-red-800 py-0.5 px-2 rounded-full text-xs font-semibold">
                {{ unreadMessages }}
              </span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Houses Tab -->
      <div v-if="activeTab === 'houses'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Manage Houses</h2>
          <button @click="showAddHouseModal = true; editingHouse = null" class="btn-primary">
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add New House
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="house in houses" :key="house.id" class="card">
            <div class="relative h-48 overflow-hidden">
              <img :src="house.images[0]" :alt="house.title" class="w-full h-full object-cover" />
              <span
                :class="[
                  'absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold',
                  house.status === 'Available' ? 'bg-green-100 text-green-800' :
                  house.status === 'Booked' ? 'bg-yellow-100 text-yellow-800' :
                  house.status === 'Occupied' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                ]"
              >
                {{ house.status }}
              </span>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ house.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ house.location }}</p>
              <p class="text-lg font-bold text-primary-600 mb-4">KSh {{ house.rent.toLocaleString() }}/mo</p>
              <div class="mb-3">
                <label class="block text-xs text-gray-500 mb-1">Status</label>
                <select
                  @change="updateHouseStatus(house.id, $event.target.value)"
                  :value="house.status"
                  class="w-full text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </div>
              <div class="flex gap-2">
                <button @click="editHouse(house)" class="flex-1 btn-secondary text-sm">Edit</button>
                <button @click="deleteHouse(house.id)" class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bookings Tab -->
      <div v-if="activeTab === 'bookings'">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Manage Bookings</h2>
        
        <div class="space-y-4">
          <div v-for="booking in bookings" :key="booking.id" class="card p-6">
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
                  <p><strong>User:</strong> {{ booking.userName }} ({{ booking.userEmail }})</p>
                  <p><strong>Date:</strong> {{ booking.date }} at {{ booking.time }}</p>
                  <p><strong>Payment:</strong> {{ booking.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Pay on-site' }}</p>
                </div>
              </div>
              <div class="mt-4 md:mt-0 flex gap-2">
                <button 
                  v-if="booking.status === 'pending'"
                  @click="updateBookingStatus(booking.id, 'confirmed')"
                  class="btn-primary text-sm"
                >
                  Confirm
                </button>
                <button 
                  v-if="booking.status === 'confirmed'"
                  @click="updateBookingStatus(booking.id, 'completed')"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Complete
                </button>
                <button 
                  v-if="booking.status === 'pending'"
                  @click="updateBookingStatus(booking.id, 'cancelled')"
                  class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Relocation Tab -->
      <div v-if="activeTab === 'relocation'">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Relocation Requests</h2>
        
        <div class="space-y-4">
          <div v-for="request in relocationRequests" :key="request.id" class="card p-6">
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p class="text-gray-600">User:</p>
                <p class="font-medium text-gray-900">{{ request.userName }} ({{ request.userEmail }})</p>
              </div>
              <div>
                <p class="text-gray-600">Moving Date:</p>
                <p class="font-medium text-gray-900">{{ request.movingDate }}</p>
              </div>
              <div>
                <p class="text-gray-600">From:</p>
                <a
                  :href="getGoogleMapsUrl(request.pickupCoords, request.pickupLocation)"
                  target="_blank"
                  class="font-medium text-primary-600 hover:text-primary-800 underline"
                  title="View location in Google Maps"
                >
                  {{ getLocationDisplay(request.pickupCoords, request.pickupLocation) }}
                </a>
              </div>
              <div>
                <p class="text-gray-600">To:</p>
                <a
                  :href="getGoogleMapsUrl(request.destinationCoords, request.destinationLocation)"
                  target="_blank"
                  class="font-medium text-primary-600 hover:text-primary-800 underline"
                  title="View location in Google Maps"
                >
                  {{ getLocationDisplay(request.destinationCoords, request.destinationLocation) }}
                </a>
              </div>
            </div>

            <div class="flex gap-2">
              <button 
                v-if="request.status === 'pending'"
                @click="updateRelocationStatus(request.id, 'confirmed')"
                class="btn-primary text-sm"
              >
                Confirm
              </button>
              <button 
                v-if="request.status === 'confirmed'"
                @click="updateRelocationStatus(request.id, 'in-progress')"
                class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
              >
                Start Moving
              </button>
              <button 
                v-if="request.status === 'in-progress'"
                @click="updateRelocationStatus(request.id, 'completed')"
                class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-if="activeTab === 'users'">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Manage Users</h2>

        <div class="space-y-4">
          <div v-for="user in users" :key="user.id" class="card p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ user.displayName || user.email }}</h3>
                <p class="text-sm text-gray-600">{{ user.email }}</p>
                <p class="text-sm text-gray-600">Role: {{ user.role }}</p>
              </div>
              <div class="flex gap-2">
                <button
                  v-if="user.role !== 'admin'"
                  @click="promoteToAdmin(user.id)"
                  class="btn-primary text-sm"
                >
                  Make Admin
                </button>
                <button
                  v-if="user.role === 'admin' && user.id !== userProfile.uid"
                  @click="demoteFromAdmin(user.id)"
                  class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Remove Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Tab -->
      <div v-if="activeTab === 'chat'">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Live Chat Support</h2>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Status:</span>
              <button
                @click="toggleOnlineStatus"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                  adminOnline ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                ]"
              >
                {{ adminOnline ? 'Online' : 'Offline' }}
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Chat Sessions -->
          <div class="lg:col-span-1">
            <div class="card p-4">
              <h3 class="text-lg font-semibold mb-4">Active Sessions</h3>
              <div class="space-y-2">
                <div
                  v-for="session in chatSessions"
                  :key="session.id"
                  @click="selectSession(session)"
                  :class="[
                    'p-3 rounded-lg cursor-pointer transition-colors',
                    selectedSession?.id === session.id ? 'bg-primary-100 border border-primary-300' : 'bg-gray-50 hover:bg-gray-100'
                  ]"
                >
                  <p class="text-sm font-medium">{{ session.userName || 'Anonymous User' }}</p>
                  <p class="text-xs text-gray-500">{{ session.lastMessageTime }}</p>
                  <p class="text-xs text-gray-600 truncate">{{ session.lastMessage }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Messages -->
          <div class="lg:col-span-2">
            <div v-if="selectedSession" class="card p-4">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">{{ selectedSession.userName || 'Anonymous User' }}</h3>
                <span class="text-xs text-gray-500">{{ selectedSession.id }}</span>
              </div>

              <div ref="chatMessagesContainer" class="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-3">
                <div
                  v-for="message in selectedSession.messages"
                  :key="message.id"
                  :class="[
                    'flex',
                    message.isUser ? 'justify-end' : 'justify-start'
                  ]"
                >
                  <div
                    :class="[
                      'max-w-xs px-4 py-2 rounded-lg text-sm',
                      message.isUser ? 'bg-primary-600 text-white' : 'bg-white text-gray-800'
                    ]"
                  >
                    <p>{{ message.text }}</p>
                    <p :class="['text-xs mt-1', message.isUser ? 'text-primary-100' : 'text-gray-500']">
                      {{ message.time }}
                    </p>
                  </div>
                </div>
              </div>

              <form @submit.prevent="sendAdminMessage" class="flex gap-2">
                <input
                  v-model="adminMessage"
                  type="text"
                  placeholder="Type your response..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  :disabled="!adminMessage.trim()"
                  class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </div>
            <div v-else class="card p-8 text-center text-gray-500">
              <p>Select a chat session to start responding</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Add House Modal -->
      <div v-if="showAddHouseModal" class="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold">{{ editingHouse ? 'Edit House' : 'Add New House' }}</h3>
            <button @click="showAddHouseModal = false" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="addHouse" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  v-model="newHouse.title"
                  type="text"
                  required
                  class="input-field"
                  placeholder="e.g., Modern 2BR Apartment"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  v-model="newHouse.location"
                  type="text"
                  required
                  class="input-field"
                  placeholder="e.g., Nairobi, Kilimani"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                v-model="newHouse.description"
                rows="3"
                class="input-field"
                placeholder="Describe the house features, neighborhood, etc."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">House Type *</label>
                 <select v-model="newHouse.houseType" required class="input-field">
                   <option value="">Select Type</option>
                   <option value="Single Room">Single Room</option>
                   <option value="Bedsitter">Bedsitter</option>
                   <option value="1 Bedroom">1 Bedroom</option>
                   <option value="2 Bedroom">2 Bedroom</option>
                   <option value="3 Bedroom">3 Bedroom</option>
                 </select>
               </div>
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Rent (KSh) *</label>
                 <input
                   v-model="newHouse.rent"
                   type="number"
                   required
                   class="input-field"
                   placeholder="25000"
                 />
               </div>
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                 <input
                   v-model="newHouse.bedrooms"
                   type="number"
                   class="input-field"
                   placeholder="2"
                 />
               </div>
               <div>
                 <label class="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                 <input
                   v-model="newHouse.bathrooms"
                   type="number"
                   class="input-field"
                   placeholder="1"
                 />
               </div>
             </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
              <input
                v-model="newHouse.amenities"
                type="text"
                class="input-field"
                placeholder="WiFi, Parking, Security, etc. (comma separated)"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="newHouse.status" class="input-field">
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Images *</label>
              <input
                type="file"
                multiple
                accept="image/*"
                @change="handleImageSelection"
                class="input-field"
              />
              <p class="text-xs text-gray-600 mt-1">Select multiple images (max 10). Files will be uploaded to Cloudinary.</p>
              <div v-if="selectedImageFiles.length > 0" class="mt-2">
                <p class="text-sm text-green-600">{{ selectedImageFiles.length }} image(s) selected</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Video (Optional)</label>
              <input
                type="file"
                accept="video/*"
                @change="handleVideoSelection"
                class="input-field"
              />
              <p class="text-xs text-gray-600 mt-1">Upload a short video tour (max 50MB)</p>
              <div v-if="selectedVideoFile" class="mt-2">
                <p class="text-sm text-green-600">Video selected: {{ selectedVideoFile.name }}</p>
              </div>
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="showAddHouseModal = false"
                class="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="uploading"
                class="flex-1 btn-primary disabled:opacity-50"
              >
                {{ uploading ? (editingHouse ? 'Updating House...' : 'Adding House...') : (editingHouse ? 'Update House' : 'Add House') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { collection, onSnapshot, doc, updateDoc, addDoc, setDoc, deleteDoc, query, orderBy, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { userProfile } = useAuth();
const router = useRouter();

const activeTab = ref('houses');
const showAddHouseModal = ref(false);
const editingHouse = ref(null);

const houses = ref([]);
const bookings = ref([]);
const relocationRequests = ref([]);
const users = ref([]);

// Chat variables
const chatSessions = ref([]);
const selectedSession = ref(null);
const adminMessage = ref('');
const adminOnline = ref(false);
const unreadMessages = ref(0);
const chatMessagesContainer = ref(null);

// Add house form
const newHouse = ref({
  title: '',
  description: '',
  location: '',
  houseType: '',
  rent: '',
  bedrooms: '',
  bathrooms: '',
  amenities: '',
  status: 'Available'
});
const houseImages = ref([]);
const houseVideo = ref(null);
const selectedImageFiles = ref([]);
const selectedVideoFile = ref(null);
const uploading = ref(false);

const pendingBookings = computed(() =>
  bookings.value.filter(b => b.status === 'pending')
);

const monthlyRevenue = computed(() => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let revenue = 0;

  // Revenue from completed relocations
  relocationRequests.value.forEach(request => {
    if (request.status === 'completed' && request.createdAt) {
      const requestDate = request.createdAt.toDate ? request.createdAt.toDate() : new Date(request.createdAt);
      if (requestDate.getMonth() === currentMonth && requestDate.getFullYear() === currentYear) {
        revenue += request.estimatedCost || 0;
      }
    }
  });

  // Revenue from completed bookings (assuming 10% commission on rent)
  bookings.value.forEach(booking => {
    if (booking.status === 'completed' && booking.createdAt) {
      const bookingDate = booking.createdAt.toDate ? booking.createdAt.toDate() : new Date(booking.createdAt);
      if (bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear) {
        // Find the house rent from houses data
        const house = houses.value.find(h => h.title === booking.houseTitle);
        if (house) {
          revenue += Math.round(house.rent * 0.1); // 10% commission
        }
      }
    }
  });

  return revenue;
});

// Watch for admin role
watch(userProfile, (newProfile) => {
  if (newProfile && newProfile.role !== 'admin') {
    router.push('/dashboard');
  }
}, { immediate: true });

onMounted(() => {
  // Fetch houses
  onSnapshot(collection(db, 'houses'), (snapshot) => {
    houses.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }, (error) => {
    console.error('Error fetching houses:', error);
    // Use mock data
    houses.value = getMockHouses();
  });

  // Fetch bookings
  onSnapshot(collection(db, 'bookings'), (snapshot) => {
    bookings.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }, (error) => {
    console.error('Error fetching bookings:', error);
    bookings.value = getMockBookings();
  });

  // Fetch relocation requests
  onSnapshot(collection(db, 'relocationRequests'), (snapshot) => {
    relocationRequests.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }, (error) => {
    console.error('Error fetching relocation requests:', error);
    relocationRequests.value = [];
  });

  // Fetch users
  onSnapshot(collection(db, 'users'), (snapshot) => {
    users.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }, (error) => {
    console.error('Error fetching users:', error);
    users.value = [];
  });

  // Fetch chat sessions
  onSnapshot(collection(db, 'chatMessages'), (snapshot) => {
    const sessionsMap = new Map();

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const sessionId = data.sessionId;

      if (!sessionsMap.has(sessionId)) {
        sessionsMap.set(sessionId, {
          id: sessionId,
          userId: data.userId,
          userName: data.userId === 'anonymous' ? 'Anonymous' : 'User',
          messages: [],
          lastMessage: data.text,
          lastMessageTime: data.timestamp?.toDate()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || 'Now',
          unread: data.isUser && !data.readByAdmin
        });
      }

      const session = sessionsMap.get(sessionId);
      session.messages.push({
        id: doc.id,
        ...data,
        time: data.timestamp?.toDate()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || 'Now'
      });

      // Update last message info
      const msgTime = data.timestamp?.toDate()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || 'Now';
      if (new Date(data.timestamp?.toDate() || 0) > new Date(session.lastMessageTime)) {
        session.lastMessage = data.text;
        session.lastMessageTime = msgTime;
      }
    });

    chatSessions.value = Array.from(sessionsMap.values()).sort((a, b) =>
      new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    // Count unread messages
    unreadMessages.value = chatSessions.value.reduce((count, session) =>
      count + (session.unread ? 1 : 0), 0
    );
  });

  // Listen for admin online status
  const adminPresenceRef = doc(db, 'adminPresence', 'admin1');
  onSnapshot(adminPresenceRef, (doc) => {
    adminOnline.value = doc.exists() && doc.data().online;
  });
});

const updateBookingStatus = async (bookingId, status) => {
  try {
    await updateDoc(doc(db, 'bookings', bookingId), { status });
    alert(`Booking ${status} successfully`);
  } catch (error) {
    console.error('Error updating booking:', error);
    alert('Failed to update booking');
  }
};

const updateRelocationStatus = async (requestId, status) => {
  try {
    await updateDoc(doc(db, 'relocationRequests', requestId), { status });
    alert(`Relocation request ${status} successfully`);
  } catch (error) {
    console.error('Error updating relocation request:', error);
    alert('Failed to update relocation request');
  }
};

const promoteToAdmin = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), { role: 'admin' });
    alert('User promoted to admin');
  } catch (error) {
    console.error('Error promoting user:', error);
    alert('Failed to promote user');
  }
};

const demoteFromAdmin = async (userId) => {
  try {
    await updateDoc(doc(db, 'users', userId), { role: 'user' });
    alert('Admin role removed');
  } catch (error) {
    console.error('Error demoting user:', error);
    alert('Failed to remove admin role');
  }
};

const toggleOnlineStatus = async () => {
  try {
    const adminPresenceRef = doc(db, 'adminPresence', 'admin1');
    await setDoc(adminPresenceRef, {
      online: !adminOnline.value,
      lastSeen: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating online status:', error);
  }
};

const selectSession = (session) => {
  selectedSession.value = session;
  // Mark messages as read
  session.messages.forEach(msg => {
    if (msg.isUser && !msg.readByAdmin) {
      updateDoc(doc(db, 'chatMessages', msg.id), { readByAdmin: true });
    }
  });
  nextTick(() => {
    if (chatMessagesContainer.value) {
      chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
    }
  });
};

const sendAdminMessage = async () => {
  if (!adminMessage.value.trim() || !selectedSession.value) return;

  try {
    await addDoc(collection(db, 'chatMessages'), {
      text: adminMessage.value,
      isUser: false,
      sessionId: selectedSession.value.id,
      userId: 'admin',
      timestamp: serverTimestamp(),
      readByAdmin: true
    });

    adminMessage.value = '';

    nextTick(() => {
      if (chatMessagesContainer.value) {
        chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
      }
    });
  } catch (error) {
    console.error('Error sending admin message:', error);
  }
};

const handleImageSelection = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 10) {
    alert('Maximum 10 images allowed');
    event.target.value = '';
    return;
  }
  selectedImageFiles.value = files;
  houseImages.value = files;
};

const handleVideoSelection = (event) => {
  const file = event.target.files[0];
  if (file && file.size > 50 * 1024 * 1024) { // 50MB limit
    alert('Video file size must be less than 50MB');
    event.target.value = '';
    return;
  }
  selectedVideoFile.value = file;
  houseVideo.value = file;
};

const uploadFile = async (file, folder = 'houses') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/${file.type.startsWith('video/') ? 'video' : 'image'}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result.secure_url;
  } catch (error) {
    console.error(`Error uploading file ${file.name}:`, error);
    throw error;
  }
};

const editHouse = (house) => {
  editingHouse.value = house;
  newHouse.value = {
    title: house.title,
    description: house.description || '',
    location: house.location,
    houseType: house.houseType || '',
    rent: house.rent.toString(),
    bedrooms: house.bedrooms ? house.bedrooms.toString() : '',
    bathrooms: house.bathrooms ? house.bathrooms.toString() : '',
    amenities: house.amenities ? house.amenities.join(', ') : '',
    status: house.status
  };
  houseImages.value = house.images || [];
  houseVideo.value = house.videoUrl || null;
  showAddHouseModal.value = true;
};

const deleteHouse = async (houseId) => {
  if (!confirm('Are you sure you want to delete this house? This action cannot be undone.')) {
    return;
  }

  try {
    await deleteDoc(doc(db, 'houses', houseId));
    alert('House deleted successfully!');
  } catch (error) {
    console.error('Error deleting house:', error);
    alert('Failed to delete house. Please try again.');
  }
};

const updateHouseStatus = async (houseId, newStatus) => {
  try {
    await updateDoc(doc(db, 'houses', houseId), {
      status: newStatus,
      updatedAt: new Date()
    });
    // Status updated successfully - no alert needed for UX
  } catch (error) {
    console.error('Error updating house status:', error);
    alert('Failed to update house status. Please try again.');
  }
};

const addHouse = async () => {
  if (!newHouse.value.title || !newHouse.value.location || !newHouse.value.houseType || !newHouse.value.rent) {
    alert('Please fill in all required fields (title, location, house type, rent)');
    return;
  }

  if (!editingHouse.value && selectedImageFiles.value.length === 0) {
    alert('Please select at least one image for the house');
    return;
  }

  uploading.value = true;
  try {
    console.log('Starting house upload...');

    // Upload images
    let imageUrls = [];
    if (houseImages.value.length > 0) {
      for (let i = 0; i < houseImages.value.length; i++) {
        const image = houseImages.value[i];
        console.log(`Uploading image ${i + 1}/${houseImages.value.length}: ${image.name}`);
        try {
          const url = await uploadFile(image, 'houses');
          imageUrls.push(url);
          console.log(`✓ Image ${i + 1} uploaded successfully`);
        } catch (error) {
          console.error(`✗ Upload failed for ${image.name}:`, error);
          alert(`Failed to upload image: ${image.name}. Please check your internet connection and Cloudinary configuration.`);
          uploading.value = false;
          return;
        }
      }
      console.log('All images uploaded successfully');
    }

    // Upload video if provided
    let videoUrl = null;
    if (houseVideo.value) {
      console.log('Uploading video:', houseVideo.value.name);
      try {
        videoUrl = await uploadFile(houseVideo.value, 'houses');
        console.log('✓ Video uploaded successfully');
      } catch (error) {
        console.error('✗ Video upload failed:', error);
        alert(`Failed to upload video: ${houseVideo.value.name}. Please check your internet connection and Cloudinary configuration.`);
        uploading.value = false;
        return;
      }
    }

    // Prepare house data
    const houseData = {
      ...newHouse.value,
      rent: parseInt(newHouse.value.rent),
      bedrooms: newHouse.value.bedrooms ? parseInt(newHouse.value.bedrooms) : null,
      bathrooms: newHouse.value.bathrooms ? parseInt(newHouse.value.bathrooms) : null,
      amenities: newHouse.value.amenities ? newHouse.value.amenities.split(',').map(a => a.trim()) : [],
      images: imageUrls.length > 0 ? imageUrls : houseImages.value, // Use existing images if no new ones uploaded
      videoUrl: videoUrl || houseVideo.value,
      updatedAt: new Date()
    };

    if (editingHouse.value) {
      // Update existing house
      houseData.createdAt = editingHouse.value.createdAt; // Preserve original creation date
      console.log('Updating house in Firestore...');
      await updateDoc(doc(db, 'houses', editingHouse.value.id), houseData);
      console.log('House updated successfully');
    } else {
      // Add new house
      houseData.createdAt = new Date();
      console.log('Saving house to Firestore...');
      await addDoc(collection(db, 'houses'), houseData);
      console.log('House saved successfully');
    }

    // Reset form
    newHouse.value = {
      title: '',
      description: '',
      location: '',
      houseType: '',
      rent: '',
      bedrooms: '',
      bathrooms: '',
      amenities: '',
      status: 'Available'
    };
    houseImages.value = [];
    houseVideo.value = null;
    selectedImageFiles.value = [];
    selectedVideoFile.value = null;
    editingHouse.value = null;
    showAddHouseModal.value = false;

    alert(editingHouse.value ? 'House updated successfully!' : 'House added successfully!');
  } catch (error) {
    console.error('Error adding house:', error);
    alert(`Failed to add house: ${error.message}`);
  } finally {
    uploading.value = false;
  }
};

// Mock data
const getMockHouses = () => [
  {
    id: '1',
    title: 'Modern Bedsitter in Kilimani',
    location: 'Nairobi',
    rent: 15000,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500'],
    status: 'Available'
  }
];

const getMockBookings = () => [
  {
    id: '1',
    houseTitle: 'Modern Bedsitter in Kilimani',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    date: '2026-02-01',
    time: '10:00',
    paymentMethod: 'mpesa',
    status: 'pending'
  }
];

// Helper functions for Google Maps integration
const getGoogleMapsUrl = (coords, locationText) => {
  if (coords && coords.lat && coords.lng) {
    // Use coordinates for precise location
    return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
  } else if (locationText && !locationText.includes('📍 Pinned Location')) {
    // Use text address for search
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`;
  } else {
    // Fallback to Nairobi if no valid location
    return 'https://www.google.com/maps/place/Nairobi,+Kenya';
  }
};

const getLocationDisplay = (coords, locationText) => {
  if (locationText && !locationText.includes('📍 Pinned Location')) {
    // Show the actual address/place name
    return locationText.length > 30 ? locationText.substring(0, 30) + '...' : locationText;
  } else if (coords && coords.lat && coords.lng) {
    // Show coordinates if no address available
    return `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`;
  } else {
    // Fallback
    return 'Location not available';
  }
};
</script>
