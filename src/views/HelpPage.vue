<template>
  <div class="min-h-screen bg-slate-950 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-slate-100 mb-4">Help Center</h1>
        <p class="text-xl text-slate-400">Find answers to common questions about using HouseHuntKE</p>
      </div>

      <!-- FAQ Section -->
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="section-surface rounded-3xl shadow-2xl overflow-hidden">
          <button 
            @click="toggleFaq(index)"
            class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-950 transition-colors"
          >
            <span class="font-semibold text-slate-100">{{ faq.question }}</span>
            <svg 
              :class="['w-5 h-5 text-primary-600 transition-transform', openFaq === index ? 'transform rotate-180' : '']"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="openFaq === index" class="px-6 pb-4 text-slate-400">
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>

      <!-- Contact Support -->
      <div class="mt-12 bg-gradient-to-r from-primary-700 to-accent-600 rounded-lg p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p class="mb-6">Our support team is available 24/7 to assist you</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/contact" class="bg-slate-950/90 text-white hover:bg-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors">
            Contact Us
          </router-link>
          <a href="https://wa.me/254792807900" target="_blank" class="bg-accent-600 hover:bg-accent-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            WhatsApp: 0792 807 900
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const openFaq = ref(null);

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index;
};

const faqs = [
  {
    question: "How do I book a house viewing?",
    answer: "Simply browse our verified listings, click on a house you're interested in, and click 'Book a Viewing'. You'll need to sign in, select your preferred date and time, and choose your payment method (M-Pesa or pay on-site). Our team will confirm your booking within minutes."
  },
  {
    question: "Are all houses verified?",
    answer: "Yes! Every single house on HouseHuntKE is physically inspected and verified by our professional team before being listed. We have zero tolerance for fake listings and ensure all properties are genuinely vacant and available."
  },
  {
    question: "What is the viewing fee?",
    answer: "The viewing fee is KSh 500 per house. This small fee ensures serious viewings and helps us maintain our high-quality verification service. The fee is clearly displayed before you book."
  },
  {
    question: "How does the relocation service work?",
    answer: "Once you've found your perfect home, you can request our relocation service directly from your dashboard. Enter your pickup and destination locations, select your house size, and get an instant cost estimate. Our professional movers will handle everything from packing to transportation."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa for instant online payments and also offer a pay-on-site option. All payments are secure and transparent with no hidden fees."
  },
  {
    question: "What areas do you cover?",
    answer: "We currently serve Saika, Ruaraka, Kasarani, Thika Road, Eastleigh, and Nairobi CBD. We're constantly expanding to new areas based on demand."
  },
  {
    question: "How quickly will I get a response after booking?",
    answer: "Our team typically responds within 15-30 minutes during business hours. You'll receive a confirmation via SMS and email with the exact address and viewing details."
  },
  {
    question: "Can I cancel or reschedule my viewing?",
    answer: "Yes, you can cancel pending bookings from your dashboard. For rescheduling, please contact our support team via WhatsApp or live chat, and we'll be happy to help."
  }
];
</script>
