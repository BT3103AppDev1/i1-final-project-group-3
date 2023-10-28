<template>
    <div class = "top-half">
    <div class="top-container" /> 
 
    <NavigationBar/>

        <!--- <img class="profile-image" alt = "" src="../assets/profile_picture.jpg" />   -->
        <img class="profile-image" alt="Profile Image" :src="profilePicture" v-if="profilePicture" />
        <div class="welcome-message" v-if="user">Welcome <br> back, {{firstName}}</div> 
        <div class="subtag">How are we feeling today?</div>
    </div>
    
    
   
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import firebaseApp from '../firebase.js';
import NavigationBar from '@/components/navigationbar.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default { 
    name:'HomeBanner',
    components: {
        NavigationBar,
    },

    setup() {
        
        const user = ref(null);
        const uid = ref('');
        const profilePicture = ref('');
        const firstName = ref('');


        onMounted(() => {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
            user.value = firebaseUser;
            
            // Fetch user's first name and profile picture from the database
            const db = getFirestore(firebaseApp);
            const userDocRef = doc(db, 'Users', firebaseUser.uid);
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                const userData = userDoc.data();
                firstName.value = userData.firstName ;
                profilePicture.value = userData.profilePicture ;
                } else {
                console.log('User document does not exist!');
                }
            } catch (error) {
                console.error('Error fetching user document:', error);
            }
            } else {
            user.value = null;
            }
        });

        });

        return {
            user,
            uid,
            profilePicture,
            firstName,
            
        };

    }



}



</script>

<style scoped>

h1{
    color: black;
}
 .top-half {
    position: absolute;
    background-color: #525fe1;
    width: 100%;
    height: 40rem;
  }
 


  .profile-image {
    position: absolute;
    top: 10.44rem;
    left: 54.81rem;
    border-radius: 50%;
    width: 25rem;
    height: 25rem;
    object-fit: cover;
  }

  .welcome-message {
    position: absolute;
    top: 14.19rem;
    left: 30%; 
    font-size: 5rem;
    font-family: 'Yeseva One';
    display: inline-block;
    width: auto;
    max-width: 100%;
    transform: translateX(-50%);
    color: white;
    text-align: center;
}

.subtag {
    position: absolute;
    top: 29.75rem;
    left: 12.19rem;
    font-size: 2rem;
    font-weight: 600;
    display: inline-block;
    width: 31.81rem;
    height: 2.88rem;
    font-family: 'Yeseva One';
    color: white;
  }





</style>