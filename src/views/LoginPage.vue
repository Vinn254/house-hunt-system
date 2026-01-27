<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <!-- Logo and Title -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-gray-900">{{ isLogin ? 'Welcome Back' : 'Create Account' }}</h2>
          <p class="mt-2 text-gray-600">{{ isLogin ? 'Sign in to continue your house hunting journey' : 'Join us to start your house hunting journey' }}</p>
        </div>

        <!-- Google Sign In -->
        <button 
          @click="handleGoogleLogin"
          :disabled="loading"
          class="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-primary-600 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-all duration-200 mb-4"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {{ loading ? 'Signing in...' : 'Continue with Google' }}
        </button>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <!-- Email Auth Form -->
        <form @submit.prevent="isLogin ? handleEmailLogin() : handleEmailRegister()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              required
              class="input-field"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
              minlength="6"
              class="input-field"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50"
          >
            {{ loading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create Account') }}
          </button>
        </form>

        <!-- Toggle between login and register -->
        <div class="mt-4 text-center">
          <button
            @click="isLogin = !isLogin"
            class="text-sm text-primary-600 hover:text-primary-700"
          >
            {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in" }}
          </button>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm text-green-600">{{ success }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <router-link to="/" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
            ← Back to home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const { loginWithGoogle, registerWithEmail, loginWithEmail } = useAuth();

const email = ref('');
const password = ref('');
const isLogin = ref(true);
const loading = ref(false);
const error = ref('');
const success = ref('');

const handleGoogleLogin = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  const result = await loginWithGoogle();

  if (result.success) {
    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
    sessionStorage.removeItem('redirectAfterLogin');
    router.push(redirectPath);
  } else {
    error.value = result.error;
  }

  loading.value = false;
};

const handleEmailLogin = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  const result = await loginWithEmail(email.value, password.value);

  if (result.success) {
    const redirectPath = sessionStorage.getItem('redirectAfterLogin') || '/dashboard';
    sessionStorage.removeItem('redirectAfterLogin');
    router.push(redirectPath);
  } else {
    error.value = result.error;
  }

  loading.value = false;
};

const handleEmailRegister = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  const result = await registerWithEmail(email.value, password.value);

  if (result.success) {
    success.value = result.message;
    // Don't redirect, let them check email
  } else {
    error.value = result.error;
  }

  loading.value = false;
};
</script>
