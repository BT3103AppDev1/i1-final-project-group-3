<template>
    <div>
        <NavigationBar/>
      <!-- Iterate through the user's field which is an array -->
      <div>
        <h1 v-for="(item, index) in userFieldArray" :key="index">{{ item }}</h1>
      </div>
    </div>
  </template>
  
<script>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '@/firebase.js';
import NavigationBar from '../components/NavigationBar.vue';

    
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
    
export default {
    components: {
        NavigationBar
    },
        
    setup() {
    const userFieldArray = ref([]);
    const user = ref(null);
    
    onMounted(async () => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                user.value = firebaseUser;
                console.log(user.value)
                await fetchUserField(firebaseUser.uid); // Fetch the fields using UID
                
            } else {
                user.value = null;
            }
            });
        });
    
        const fetchUserField = async (uid) => {
            const userDocRef = doc(db, 'Users', uid);
            try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                // Replace 'fieldName' with the actual field you want to access
                userFieldArray.value = userDoc.data().chatIds;
                console.log(userFieldArray.value)
            } else {
                console.log('User document does not exist!');
            }
            } catch (error) {
            console.error('Error fetching user document:', error);
            }
        };
    
        // Return the reactive properties to be used in the template
        return {
            userFieldArray,
            user
        };
        }
    };
</script>
  