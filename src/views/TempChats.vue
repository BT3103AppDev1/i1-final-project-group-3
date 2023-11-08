<template>
    <div>
        <NavigationBar/>

        <!-- Iterate through the user's field which is an array -->
        <div class="convo-list">
            <div v-for="chat in chats" :key="chat.id"  @click="selectChat(chat)">
                <h6>{{ chat.name }}:</h6>                    
                <!--- getting the person's name--->
                <h6>{{ chat.lastMessage.text }}</h6>
                <h6>Time: {{ chat.lastMessage.timestamp.toDate() }}</h6>
                    
            </div>

        </div>

        <div class="convo-full">
            <div v-if="selectedChat">
                <h2>{{ selectedChat.name }}</h2>
                <div v-for="message in selectedChat.messages" :key="message.id">
                    <h6>{{ message.senderName }}: {{ message.text }}</h6>
                    <h6>Time: {{ message.timestamp.toDate() }}</h6>
                </div>
            </div>
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
    components: {
        NavigationBar
    },
        
    setup() {
    const chats = ref([]);
    const user = ref(null);
    const selectedChat = ref(null);
    
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
                console.log(messagesRef)
                
                //getting contact name
                const chatDocRef = doc(db, 'Message', chatId);
                const chatDocSnap = await getDoc(chatDocRef);
                const chatData = chatDocSnap.data();
                const user1 = chatData.senderUID;
                const user2 = chatData.receiverUID;


                let name 
                if (user1 == uid) {
                    name = chatData.receiverName;
                } else {
                    name = chatData.senderName;
                }

                const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
                const lastMessageSnap = await getDocs(lastMessageQuery);

                const lastMessageDoc = lastMessageSnap.docs[0].data();
                console.log(lastMessageDoc)

                
                const lastMessage = [];

                
                    lastMessage.push( {
                        text: lastMessageDoc.message,
                        receiverName: lastMessageDoc.receiverName,
                        receiverUID: lastMessageDoc.receiverUID,
                        senderName: lastMessageDoc.senderName,
                        senderUID: lastMessageDoc.senderUID,
                        timestamp: lastMessageDoc.timestamp,
                    });

                
                console.log(lastMessage)
               

                // Add the chat with its messages to the chats array
                chats.value.push({
                id: chatId,
                lastMessage:lastMessage[0],
                name: name,
                });
            }
            } else {
            console.log('User document does not exist!');
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const selectChat = async (chatSummary) => {
        const messagesRef = collection(db, 'Message', chatSummary.id, 'msglist');

        try {
            const q = query(messagesRef, orderBy('timestamp', 'asc'));
            const messagesSnap = await getDocs(q);

            // If there are messages, proceed to parse them
            if (!messagesSnap.empty) {
                const messages = [];
                messagesSnap.forEach((doc) => {
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
                console.log(messages)

                // Assuming chats is a reactive property and you want to update it
                selectedChat.value = { // 'this' needs to reference the Vue instance
                    id: chatSummary.id,
                    messages: messages,
                    name: chatSummary.name, // Make sure chatSummary has a 'name' property
                };
            } else {
                console.log('No messages found!');
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    

    


    return {
      chats,
      selectChat,
      selectedChat,
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