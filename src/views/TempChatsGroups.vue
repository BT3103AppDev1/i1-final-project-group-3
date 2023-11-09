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

<style scoped>
/* styling buttons */
button {
    font-family: var(--font-yeseva-one);
    border: 2px solid #525fe1;
    background-color: white;
    width: 203px;
    height: 63px;
    border-radius: 40px;
    font-size: 25px;
    
    cursor: pointer;
    margin-left: 20px;
    margin-top: 40px;

}

.groups {
    color:white;
    background-color: #525fe1;
}

.profiles {
    color: #525fe1;
    margin-right: 30px;
}

.chat-buttons {
    margin-bottom: 40px;
}


</style>