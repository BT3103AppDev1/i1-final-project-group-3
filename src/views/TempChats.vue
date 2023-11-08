<template>
    <div>
        <NavigationBar/>
        <div class="chat">
            <div class="convo-list">
                <div class="chat-buttons">
                    <button class="profiles">Profiles</button>
                    <button class="groups">Groups</button>
                </div>
                

                <div v-for="chat in chats" :key="chat.id"  @click="selectChat(chat)" class="conversations">
                    <div class="image">
                        <img :src="chat.userImageUrl" alt="User Image" class="user-image" />
                    </div>

                    <div class="words">
                        <h3>{{ chat.name }}</h3>  
                        <p>{{ formatMessageDate(chat.lastMessage.timestamp) }}</p>                  
                        <!--- getting the person's name--->
                        <h6>{{ chat.lastMessage.text }}</h6>
                        

                    </div>
                        

                  
                    
                        
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
                <div v-else="">
                    <svg class = "imageblank" width="168" height="187" viewBox="0 0 168 187" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.0418 121.92L36.3432 122.635L37.0418 121.92ZM63 137.135L63.295 136.179L63 137.135ZM28.875 154.883L28.3648 155.743C28.4139 155.772 28.4654 155.797 28.5188 155.817L28.875 154.883ZM146 84.188C146 118.859 118.375 140.627 84 140.627V142.627C119.213 142.627 148 120.212 148 84.188H146ZM22 84.188C22 54.5091 49.5751 32.167 84 32.167V30.167C48.837 30.167 20 53.0706 20 84.188H22ZM84 32.167C101.242 32.167 116.756 36.5476 127.935 45.2126C139.083 53.8534 146 66.8125 146 84.188H148C148 66.2162 140.814 52.6648 129.16 43.6319C117.538 34.6232 101.552 30.167 84 30.167V32.167ZM37.7403 121.204C27.9511 111.649 22 98.0071 22 84.188H20C20 98.5628 26.1807 112.715 36.3432 122.635L37.7403 121.204ZM84 140.627C76.8234 140.627 69.9248 138.226 63.295 136.179L62.705 138.09C69.2119 140.099 76.4499 142.627 84 142.627V140.627ZM63.295 136.179C62.2278 135.85 61.139 136.271 60.2027 136.84C59.2323 137.43 58.1802 138.332 57.0777 139.375C55.969 140.423 54.7553 141.668 53.4724 142.965C52.1825 144.27 50.8106 145.64 49.3581 146.973C43.4677 152.375 36.6445 156.774 29.2312 153.948L28.5188 155.817C37.1472 159.107 44.8278 153.842 50.71 148.446C52.2007 147.079 53.6013 145.679 54.8945 144.371C56.1948 143.056 57.3749 141.847 58.4521 140.828C59.5354 139.803 60.4611 139.024 61.242 138.549C62.0569 138.053 62.4928 138.025 62.705 138.09L63.295 136.179ZM29.3852 154.023C29.3508 154.002 29.1219 153.822 29.139 152.894C29.1548 152.035 29.3824 150.856 29.7925 149.406C30.6089 146.52 32.0633 142.846 33.5718 139.08C35.0679 135.344 36.6161 131.521 37.5698 128.423C38.0457 126.877 38.3915 125.456 38.498 124.286C38.5512 123.7 38.5489 123.134 38.4515 122.626C38.3541 122.119 38.1483 121.602 37.7403 121.204L36.3432 122.635C36.3648 122.656 36.4376 122.744 36.4873 123.003C36.5369 123.262 36.5499 123.624 36.5062 124.105C36.4187 125.067 36.1212 126.331 35.6583 127.834C34.7348 130.835 33.2248 134.567 31.7152 138.336C30.2179 142.074 28.719 145.854 27.868 148.862C27.4445 150.359 27.16 151.737 27.1393 152.857C27.1199 153.909 27.3301 155.129 28.3648 155.743L29.3852 154.023Z" fill="#343434"/>
                    <path d="M81 85.959C81 86.5113 80.5523 86.959 80 86.959C79.4477 86.959 79 86.5113 79 85.959C79 85.4067 79.4477 84.959 80 84.959C80.5523 84.959 81 85.4067 81 85.959Z" fill="#343434"/>
                    <path d="M85 85.959C85 86.5113 84.5523 86.959 84 86.959C83.4477 86.959 83 86.5113 83 85.959C83 85.4067 83.4477 84.959 84 84.959C84.5523 84.959 85 85.4067 85 85.959Z" fill="#343434"/>
                    <path d="M89 85.959C89 86.5113 88.5523 86.959 88 86.959C87.4477 86.959 87 86.5113 87 85.959C87 85.4067 87.4477 84.959 88 84.959C88.5523 84.959 89 85.4067 89 85.959Z" fill="#343434"/>
                    </svg>
                    
                
                </div>
            </div>

        </div>

        <!-- Iterate through the user's field which is an array -->
        
            

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
                    const messagesRef = collection(db, 'Message', chatId, 'msglist');

                    // Getting contact name and image
                    const chatDocRef = doc(db, 'Message', chatId);
                    const chatDocSnap = await getDoc(chatDocRef);
                    const chatData = chatDocSnap.data();
                    const user1 = chatData.senderUID;
                    const user2 = chatData.receiverUID;

                    let name;
                    if (user1 == uid) {
                        name = chatData.receiverName;
                    } else {
                        name = chatData.senderName;
                    }

                    let contactUID = user1 === uid ? user2 : user1; // The UID of the user we are chatting with
                    let profilePicUrl;

                    // Fetch the contact's profile picture
                    const contactDocRef = doc(db, 'Users', contactUID);
                    const contactDocSnap = await getDoc(contactDocRef);
                    if (contactDocSnap.exists()) {
                        
                        profilePicUrl = contactDocSnap.data().profilePicture || 'path_to_default_image.jpg';
                    } else {
                        // Set default values if the contact document doesn't exist
                        
                        profilePicUrl = 'path_to_default_image.jpg';
                    }

                    const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
                    const lastMessageSnap = await getDocs(lastMessageQuery);

                    if (!lastMessageSnap.empty) {
                        const lastMessageDoc = lastMessageSnap.docs[0].data();

                        // Add the chat with its last message and contact image to the chats array
                        chats.value.push({
                            id: chatId,
                            lastMessage: {
                                text: lastMessageDoc.message,
                                receiverName: lastMessageDoc.receiverName,
                                receiverUID: lastMessageDoc.receiverUID,
                                senderName: lastMessageDoc.senderName,
                                senderUID: lastMessageDoc.senderUID,
                                timestamp: lastMessageDoc.timestamp,
                            },
                            name: name,
                            userImageUrl: profilePicUrl, // Adding the image URL
                        });
                    }
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

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();

    }

    const formatMessageDate = (timestamp) => {
      // Convert Firestore Timestamp to JavaScript Date object
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

      if (isToday(date)) {
        // Format as time if the date is today
        return date.toLocaleTimeString('en-SG', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true // 24-hour format
        });
      } else {
        // Format as date if the date is not today
        return date.toLocaleDateString('en-SG', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      }
    };

    

    

    


    return {
      chats,
      selectChat,
      selectedChat,
      formatMessageDate,
    };
    
        // Return the reactive properties to be used in the template
        
    }
};
</script>

<style scoped>
.chat{ 
    display: flex;
    flex-direction: row;
    height: 100vh;

   
    
}

.convo-list {
    width: 35%;
    overflow-y: auto;
    border-right: 1px solid #ddd
}

.convo-full {
    width: 65%;
    overflow-y: auto;
}

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
    margin-left: 30px;
    margin-top: 40px;

}

.groups {
    color:#525fe1;
}

.profiles {
    color: white;
    background-color: #525fe1;
    margin-right: 30px;
}

.chat-buttons {
    margin-bottom: 40px;
}


/* styling conversation list */
.conversations {
    padding-top: 10px;
    width: 100%;
    height: 150px;
    border: 1px solid grey;
    font-family: var(--font-josefin-sans);
    display: flex;
}

.words{
    margin-top: 2px;
}

.image {
    margin-top: 10px;

}

h3 {
    font-family: var(--font-josefin-sans);
    font-size: 30px;
    margin-left: 20px;
    margin-top: 15px;
}

h6{
    color: grey;
    font-family: var(--font-josefin-sans);
    font-size: 20px;
    margin-left: 25px;
    margin-top: 30px;

    
}

p {
    margin-left: 270px;
    margin-top: -25px;
    color: black;
    font-size: 20px;

} 
.user-image {
    height: 100px;
    width: 100px;
    margin-left: 30px;
    border-radius: 50%;
}

/* styling conversation full */

.convo-full {

    align-items: center;
    justify-content: center;
}









</style>