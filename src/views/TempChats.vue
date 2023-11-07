<template>
    <div>
        <NavigationBar/>
      <!-- Iterate through the user's field which is an array -->
        <div v-for="chat in chats" :key="chat.id">
            <h3>Chat ID: {{ chat.id }}</h3>
            <ul>
                <h6 v-for="message in chat.messages" :key="message.id">
                <strong>{{ message.senderName }}:</strong> 
                <h1>{{ message.text }} </h1>
                <div>Time: {{ message.timestamp }}</div>
                </h6>
            </ul>
        </div>
    </div>
  </template>
  
<script>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDocs, getDoc, collection, query, orderBy } from "firebase/firestore";
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
    const chats = ref([]);
    const user = ref(null);
    
    onMounted(async () => {
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          await fetchChats(firebaseUser.uid); // Fetch the chats using UID
        }
      });
    });

    const fetchChats = async (uid) => {
        const userDocRef = doc(db, 'Users', uid);
        try {
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
            const userChatIds = userDocSnap.data().chatIds; // Assuming 'chatIds' is the field name
            for (const chatId of userChatIds) {
                // Note the path 'Message/{chatId}/msglist' should match your collection structure
                const messagesRef = collection(db, 'Message', chatId, 'msglist');
                const q = query(messagesRef, orderBy('timestamp', 'desc'));
                const messagesSnap = await getDocs(q);
                
                const messages = [];
                messagesSnap.forEach((doc) => {
                // Add each message to the messages array
                messages.push({
                    id: doc.id,
                    text: doc.data().message,
                    receiverName: doc.data().receiverName,
                    receiverUID: doc.data().receiverUID,
                    senderName: doc.data().senderName,
                    senderUID: doc.data().senderUID,
                    timestamp: doc.data().timestamp,
                    // Add other fields as needed
                });
                });

                // Add the chat with its messages to the chats array
                chats.value.push({
                id: chatId,
                messages: messages,
                });
            }
            } else {
            console.log('User document does not exist!');
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    


    return {
      chats,
    };
    
        // Return the reactive properties to be used in the template
        
    }
};
</script>

<style scoped>
h6{
    color: black;
}

</style>
  