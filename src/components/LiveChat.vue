<template>
  <div class="fixed bottom-24 right-6 z-50">
    <!-- Chat Toggle Button -->
    <button
      v-if="!showChat"
      @click="openChat"
      class="flex items-center justify-center w-14 h-14 bg-accent-500 hover:bg-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      title="Live Chat Support"
    >
      <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
      </svg>
      <span v-if="unreadCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {{ unreadCount }}
      </span>
    </button>

    <!-- Chat Window -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div v-if="showChat" class="bg-slate-950 rounded-[1.5rem] shadow-2xl border border-slate-800 w-72 sm:w-80 flex flex-col" style="height: 400px;">
        <!-- Chat Header -->
        <div class="bg-slate-900 text-white p-4 rounded-t-[1.5rem] flex items-center justify-between border-b border-slate-800">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <div>
              <h3 class="font-semibold">Support Team</h3>
              <p class="text-xs text-accent-100">{{ adminOnline ? 'Online • Typically replies instantly' : 'Offline • We\'ll respond when available' }}</p>
            </div>
          </div>
          <button @click="showChat = false" class="text-white hover:text-accent-100">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Chat Messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950">
          <!-- Messages -->
          <div v-for="message in messages" :key="message.id" :class="message.isUser ? 'flex justify-end' : 'flex items-start space-x-2'">
            <div v-if="!message.isUser" class="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <div :class="[
              'rounded-lg p-3 shadow-sm max-w-xs',
              message.isUser ? 'bg-accent-500 text-slate-950' : 'bg-slate-900/95 text-slate-100'
            ]">
              <p class="text-sm">{{ message.text }}</p>
              <p :class="['text-xs mt-1', message.isUser ? 'text-accent-100' : 'text-slate-400']">
                {{ message.time }}
              </p>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex items-start space-x-2">
            <div class="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <div class="bg-slate-900/95 rounded-lg p-3 shadow-sm">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-slate-600 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="p-4 border-t border-slate-800 bg-slate-950 rounded-b-[1.5rem]">
          <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input 
              v-model="newMessage"
              type="text"
              placeholder="Type your message..."
              class="input-field"
            />
            <button 
              type="submit"
              :disabled="!newMessage.trim()"
              class="bg-accent-500 hover:bg-accent-600 text-slate-950 p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted } from 'vue';
import { collection, addDoc, onSnapshot, query, orderBy, where, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const showChat = ref(false);
const newMessage = ref('');
const messages = ref([]);
const isTyping = ref(false);
const unreadCount = ref(0);
const messagesContainer = ref(null);
const chatSessionId = ref('');
const userId = ref('');
const adminOnline = ref(false);
const welcomeSent = ref(false);

onMounted(() => {
  // Generate or get session ID
  chatSessionId.value = localStorage.getItem('chatSessionId') || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('chatSessionId', chatSessionId.value);

  // Get user ID
  onAuthStateChanged(auth, (user) => {
    userId.value = user ? user.uid : 'anonymous';
  });

  // Listen for admin online status
  const adminPresenceRef = doc(db, 'adminPresence', 'admin1');
  onSnapshot(adminPresenceRef, (doc) => {
    adminOnline.value = doc.exists() && doc.data().online;
  });

  // Listen for messages
  onSnapshot(collection(db, 'chatMessages'), (snapshot) => {
    const allMessages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      time: doc.data().timestamp?.toDate()?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || 'Now'
    }));

    // Filter messages for current session
    messages.value = allMessages.filter(msg => msg.sessionId === chatSessionId.value);

    // Scroll to bottom
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });
  });
});

const sendMessage = async () => {
  console.log('sendMessage called');
  if (!newMessage.value.trim()) return;

  try {
    console.log('Sending message:', newMessage.value);
    await addDoc(collection(db, 'chatMessages'), {
      text: newMessage.value,
      isUser: true,
      sessionId: chatSessionId.value,
      userId: userId.value,
      timestamp: serverTimestamp()
    });
    console.log('Message sent successfully');

    newMessage.value = '';

    // Scroll to bottom
    await nextTick();
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

const openChat = () => {
  console.log('openChat called');
  showChat.value = true;
  unreadCount.value = 0;

  // Send welcome message if not sent
  if (!welcomeSent.value) {
    console.log('Sending welcome message');
    setTimeout(async () => {
      try {
        await addDoc(collection(db, 'chatMessages'), {
          text: "Hello! 👋 Welcome to HouseHuntKE. How can we help you find your perfect home today?",
          isUser: false,
          sessionId: chatSessionId.value,
          userId: 'admin',
          timestamp: serverTimestamp()
        });
        console.log('Welcome message sent');
        welcomeSent.value = true;

        // If admin online, suggest WhatsApp
        if (adminOnline.value) {
          console.log('Admin online, sending WhatsApp suggestion');
          setTimeout(async () => {
            await addDoc(collection(db, 'chatMessages'), {
              text: "Our admin is currently online! For faster assistance, you can also chat with us directly on WhatsApp. Click the WhatsApp button below.",
              isUser: false,
              sessionId: chatSessionId.value,
              userId: 'admin',
              timestamp: serverTimestamp()
            });
            console.log('WhatsApp suggestion sent');
          }, 1000);
        }
      } catch (error) {
        console.error('Error sending welcome message:', error);
      }
    }, 500);
  }
};
</script>
