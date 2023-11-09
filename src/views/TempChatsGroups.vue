<template>
    <NavigationBar />
    <div class="convo-list">
        <div class="chat-buttons">
            <button class="profiles" @click="navigateToProfiles">Profiles</button>
            <button class="groups" >Groups</button>
        </div>
        <div v-for="group in groups" :key="group.id"  @click="selectChat(group)" class="conversations">
            <h3 class="chat-name">{{ group.name }}</h3>
                       
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

    },

    setup() {
        const groups = ref([]);
        const selectedGroup = ref(null);
        const user = ref(null);

        onMounted(async () => {
            onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                await fetchGroups(firebaseUser.uid); // Fetch the chats using UID
                
                }
            });
        });

        const fetchGroups = async (uid) => {
            const userDocRef = doc(db, 'Users', uid);

            try {
                const userDocSnap = await getDoc(userDocRef);
        

                if (userDocSnap.exists()) {
                   const activeGroups = userDocSnap.data().activeGroups;

                   for (const group of activeGroups) {
                        console.log(group);
                        const groupDocRef = doc(db, 'Groups', group);
                        const groupDocSnap = await getDoc(groupDocRef);
                        groups.value.push({
                            id: group,
                            name: groupDocSnap.data().title,
                        
                        })

                        // getting name of document
                        console.log(groupDocSnap.data());

                       if (groupDocSnap.exists()) {
                           groups.value.push(groupDocSnap.data());
                       }
                   }
                }
            }
            catch (error) {
                console.log(error);
            }
        };

        return {
            groups,
            selectedGroup,
            fetchGroups,
            user,
        };
    },

   
}

</script>