import { ref, onMounted, onUnmounted } from 'vue';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const user = ref(null);
const userProfile = ref(null);
const loading = ref(true);

export function useAuth() {
  let unsubscribe = null;

  onMounted(() => {
    unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      user.value = firebaseUser;
      if (firebaseUser) {
        await fetchProfile(firebaseUser.uid);
      } else {
        userProfile.value = null;
      }
      loading.value = false;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) unsubscribe();
  });

   const loginWithGoogle = async () => {
     try {
       const provider = new GoogleAuthProvider();
       const result = await signInWithPopup(auth, provider);
       await createProfileIfNeeded(result.user);
       return { success: true, user: result.user };
     } catch (error) {
       // Map common Firebase auth errors to user-friendly messages
       let friendlyError = error.message;
       if (error.code === 'auth/popup-closed-by-user') {
         friendlyError = 'Sign-in window was closed. Please try again.';
       } else if (error.code === 'auth/cancelled-popup-request') {
         friendlyError = 'Sign-in request was cancelled. Please try again.';
       } else if (error.code === 'auth/operation-not-allowed') {
         friendlyError = 'Google sign-in is not enabled. Please contact support.';
       } else if (error.code === 'auth/unauthorized-domain') {
         friendlyError = 'This domain is not authorized for Google sign-in. Please contact support.';
       } else if (error.code === 'auth/invalid-credential') {
         friendlyError = 'Invalid Google credentials. Please try again.';
       }
       return { success: false, error: friendlyError };
     }
   };


  const fetchProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        userProfile.value = userDoc.data();
      } else {
        userProfile.value = null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const createProfileIfNeeded = async (firebaseUser) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      const role = firebaseUser.email === 'vin.oumaotieno@gmail.com' ? 'admin' : 'user';
      await setDoc(userDocRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email || null,
        phoneNumber: firebaseUser.phoneNumber || null,
        displayName: firebaseUser.displayName || null,
        role: role,
        createdAt: new Date()
      });
      userProfile.value = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || null,
        phoneNumber: firebaseUser.phoneNumber || null,
        displayName: firebaseUser.displayName || null,
        role: role,
        createdAt: new Date()
      };
    }
  };

  const registerWithEmail = async (email, password) => {
    try {
      console.log('Creating user with email:', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created, sending verification email');

      await createProfileIfNeeded(result.user);
      return { success: true, user: result.user, message: 'Registration successful! You can now log in.' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  };

   const loginWithEmail = async (email, password) => {
     try {
       const result = await signInWithEmailAndPassword(auth, email, password);
       await createProfileIfNeeded(result.user);
       return { success: true, user: result.user };
     } catch (error) {
       // Map common Firebase auth errors to user-friendly messages
       let friendlyError = error.message;
       if (error.code === 'auth/user-not-found') {
         friendlyError = 'No account found with this email. Please check your email or sign up.';
       } else if (error.code === 'auth/wrong-password') {
         friendlyError = 'Incorrect password. Please try again or reset your password.';
       } else if (error.code === 'auth/invalid-email') {
         friendlyError = 'Invalid email address. Please check your email.';
       } else if (error.code === 'auth/user-disabled') {
         friendlyError = 'This account has been disabled. Please contact support.';
       } else if (error.code === 'auth/too-many-requests') {
         friendlyError = 'Too many failed attempts. Please try again later.';
       }
       return { success: false, error: friendlyError };
     }
   };

  const resendVerificationEmail = async () => {
    try {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
        return { success: true, message: 'Verification email sent! Please check your inbox.' };
      } else {
        return { success: false, error: 'No unverified user found or already verified.' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    userProfile,
    loading,
    loginWithGoogle,
    registerWithEmail,
    loginWithEmail,
    resendVerificationEmail,
    logout
  };
}
