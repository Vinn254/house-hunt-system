<template>
  <nav class="bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-accent-500 rounded-lg flex items-center justify-center shadow-lg shadow-accent-500/20">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <span class="text-xl font-bold text-slate-100">HouseHunt<span class="text-accent-300">KE</span></span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="text-slate-200 hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-accent-300 font-semibold': $route.path === '/' }"
          >
            Browse Houses
          </router-link>
          
          <router-link
            to="/about"
            class="text-slate-200 hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-accent-300 font-semibold': $route.path === '/about' }"
          >
            About Us
          </router-link>
          
          <router-link
            v-if="user"
            to="/relocation"
            class="text-slate-200 hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-accent-300 font-semibold': $route.path === '/relocation' }"
          >
            Relocation
          </router-link>
          
          <router-link
            to="/help"
            class="text-slate-200 hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-accent-300 font-semibold': $route.path === '/help' }"
          >
            Help Centre
          </router-link>
          
          <router-link
            to="/contact"
            class="text-slate-200 hover:text-accent-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="{ 'text-accent-300 font-semibold': $route.path === '/contact' }"
          >
            Contact Us
          </router-link>
          
          <template v-if="user">
            <div class="relative" ref="userMenuRef">
              <button 
                @click="toggleUserMenu"
                class="flex items-center space-x-2 text-slate-200 hover:text-accent-300 focus:outline-none"
              >
                <div class="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                  <span class="text-accent-300 font-semibold text-sm">
                    {{ user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U' }}
                  </span>
                </div>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- User Dropdown -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="showUserMenu"
                  class="absolute right-0 mt-2 w-48 bg-slate-900 rounded-2xl shadow-xl py-1 border border-slate-800"
                >
                  <div class="px-4 py-2 border-b border-slate-800">
                    <p class="text-sm font-medium text-slate-100">{{ user.displayName || 'User' }}</p>
                    <p class="text-xs text-slate-400 truncate">{{ user.email || user.phoneNumber }}</p>
                  </div>
                  <router-link
                    to="/dashboard"
                    class="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:text-accent-300"
                    @click="showUserMenu = false"
                  >
                    Dashboard
                  </router-link>
                  <router-link
                    v-if="userProfile?.role === 'admin'"
                    to="/admin"
                    class="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-900 hover:text-accent-300"
                    @click="showUserMenu = false"
                  >
                    Admin Dashboard
                  </router-link>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-orange-400 hover:bg-slate-900"
                  >
                    Sign Out
                  </button>
                </div>
              </transition>
            </div>
          </template>
          
          <template v-else>
            <router-link 
              to="/login" 
              class="btn-primary"
            >
              Sign In
            </router-link>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button 
            @click="toggleMobileMenu"
            class="text-slate-200 hover:text-accent-300 focus:outline-none focus:text-accent-300"
          >
            <svg v-if="!showMobileMenu" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg v-else class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-if="showMobileMenu" class="md:hidden bg-slate-950 border-t border-slate-800">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
            :class="{ 'text-accent-300 bg-slate-900': $route.path === '/' }"
            @click="showMobileMenu = false"
          >
            Browse Houses
          </router-link>
          
          <router-link
            to="/about"
            class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
            :class="{ 'text-accent-300 bg-slate-900': $route.path === '/about' }"
            @click="showMobileMenu = false"
          >
            About Us
          </router-link>
          
          <router-link
            v-if="user"
            to="/relocation"
            class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
            :class="{ 'text-accent-300 bg-slate-900': $route.path === '/relocation' }"
            @click="showMobileMenu = false"
          >
            Relocation Service
          </router-link>
          
          <router-link
            to="/help"
            class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
            :class="{ 'text-accent-300 bg-slate-900': $route.path === '/help' }"
            @click="showMobileMenu = false"
          >
            Help Centre
          </router-link>
          
          <router-link
            to="/contact"
            class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
            :class="{ 'text-accent-300 bg-slate-900': $route.path === '/contact' }"
            @click="showMobileMenu = false"
          >
            Contact Us
          </router-link>
          
          <template v-if="user">
            <div class="border-t border-slate-800 pt-2 mt-2">
              <router-link
                to="/dashboard"
                class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
                :class="{ 'text-accent-300 bg-slate-900': $route.path === '/dashboard' }"
                @click="showMobileMenu = false"
              >
                My Dashboard
              </router-link>
              <router-link
                v-if="userProfile?.role === 'admin'"
                to="/admin"
                class="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-accent-300 hover:bg-slate-900"
                :class="{ 'text-accent-300 bg-slate-900': $route.path === '/admin' }"
                @click="showMobileMenu = false"
              >
                Admin Dashboard
              </router-link>
              <div class="px-3 py-2">
                <p class="text-sm font-medium text-slate-100">{{ user.displayName || 'User' }}</p>
                <p class="text-xs text-slate-400">{{ user.email || user.phoneNumber }}</p>
              </div>
              <button 
                @click="handleLogout"
                class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-orange-400 hover:bg-slate-900"
              >
                Sign Out
              </button>
            </div>
          </template>
          
          <template v-else>
            <router-link 
              to="/login" 
              class="block px-3 py-2 rounded-md text-white bg-accent-500 hover:bg-accent-600"
              @click="showMobileMenu = false"
            >
              Sign In
            </router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { user, userProfile, logout } = useAuth();

const showMobileMenu = ref(false);
const showUserMenu = ref(false);
const userMenuRef = ref(null);

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleLogout = async () => {
  const result = await logout();
  if (result.success) {
    showUserMenu.value = false;
    showMobileMenu.value = false;
    router.push('/');
  }
};

// Close user menu when clicking outside
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
