<template>
    <NavigationBar />
    <div class="convo-list">
        <div class="chat-buttons">
            <button class="profiles" @click="navigateToProfiles">Profiles</button>
            <button class="groups" >Groups</button>
        </div>
                


    </div>
    
</template>

<script>

import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDocs, getDoc, collection, query, orderBy, limit } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '@/firebase.js';
import NavigationBar from '../components/NavigationBar.vue';

    
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
    
export default {
    name: 'TempChatsGroups',
    components: {
        NavigationBar
    },

    methods: {
      navigateToProfiles() {
        this.$router.push({ name: 'TempChats' });
      },

    }
}

</script>