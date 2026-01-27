<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
    <WhatsAppButton />
    <LiveChat />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';
import LiveChat from './components/LiveChat.vue';
</script>
