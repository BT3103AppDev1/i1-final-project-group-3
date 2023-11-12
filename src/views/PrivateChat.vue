<template>
<NavigationBar />
 
<div class="container">
  <div class="messaging">
        <div class="inbox_msg"> 
          <div class="inbox_people">
            <div class="headind_srch">
              <div class="group-parent">
                <div class="stylish-input-group">
                      <button class="profiles">Profiles</button>
                      <button class="groups" @click="navigateToGroupsChat">Groups</button>
                </div>
              </div>
            </div>

            <div class="inbox_chat">
              <div v-for="chat in chats" :key="chat.id"  @click="selectChat(chat)" class="conversations">
                <div class="chat_list">
                  <div class="chat_people">
                    <div class="chat_img"> 
                      <img :src="chat.userImageUrl" alt="User Image" class="individualProfile"> 
                    </div>
                    <div class="chat_ib">
                      <h5 class="bold-text">{{chat.name}} <span class="chat_date">{{ formatMessageDate(chat.lastMessage.timestamp) }}</span></h5>
                      <p> {{chat.lastMessage.text}} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
        <div class="mesgs">
          <div class="msg_history">
            <div v-if="selectedChat">
                <div v-for="message in selectedChat.messages" :key="message.id">
                  <!-- For sent messages -->
                  <div v-if="message.senderUID === authUser.uid" class="sent_msg">
                    <div v-if="message.imageUrl"> 
                       <img :src="message.imageUrl" alt="Uploaded Image" class="uploaded-image">
                    </div>
                    <div v-else>
                      <p>{{ message.text }}</p>
                      <!--<span class="name-of-sender">{{ message.senderName }}</span>-->
                    </div> 
                  </div>

                  <!-- For received messages -->
                  <div v-else class="received_msg">
                    <div v-if="message.imageUrl">
                      <img :src="message.imageUrl" alt="Uploaded Image" class="uploaded-image">
                    </div>
                  <div v-else class="received_withd_msg">
                    <p>{{ message.text }}</p>
                    <!--<span class="name-of-sender">{{ message.senderName }}</span>-->
                  </div>
                  </div>
                </div>
 

              <div class="type_msg">
                <div class="input_msg_write">
                  <img class="upload-icon" src="../assets/uploadphoto.png" alt="Upload Icon" @click="triggerFileInput" />
                  <input id="fileInput" ref="fileInput" type="file" style="display: none" @change="handleFileUpload" />
                  <input @keyup.enter="saveMessage" v-model="newMessage" type="text" class="write_msg" placeholder="Type a message" />
                  <img class="msg_send_btn" alt="" src="../assets/send.png" @click="sendMessageOnClick" />
                </div>
              </div>
            </div>
            
            <div v-else="" class="noSelectedChat">
              <img class="send-message-icon" src="../assets/message.png"  />
              <h2 class = "noChatSelectedHeader1">Your Messages</h2>
              <h4 class = "noChatSelectedHeader2">Send private photos and messages to a friend or group!</h4>
            </div>
        </div> 
      </div>      
    </div>
  </div>
</div> 
</template>
 

<script>
import { ref, onMounted, onUnmounted  } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, doc, getDocs, getDoc, collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '@/firebase.js';
import NavigationBar from '../components/NavigationBar.vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

    
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
    
export default {
    components: {
        NavigationBar
    },
 
     setup() {
      const router = useRouter();
      const chats = ref([]);
      const selectedChat = ref(null);
      const message = ref(''); 
      const newMessage = ref('');
      const currentUserUID = ref(null);
      const authUser = ref(null);
      const storage = getStorage(firebaseApp);
      const db = getFirestore(firebaseApp);
    
 

    onMounted(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        authUser.value = user;
        if (user) {
          fetchChats(user.uid);
 
        } else {
          // User is not authenticated
        }
      });


       
      return unsubscribe;
    });

 
    

    const fetchChats = async (uid) => {
        const userDocRef = doc(db, 'Users', uid);

        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userChatIds = userDocSnap.data().chatIds;

            // Create an array to store fetched chats
            const fetchedChats = [];

            for (const chatId of userChatIds) {
              const messagesRef = collection(db, 'Message', chatId, 'msglist');
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

              let contactUID = user1 === uid ? user2 : user1;
              let profilePicUrl;

              const contactDocRef = doc(db, 'Users', contactUID);
              const contactDocSnap = await getDoc(contactDocRef);

              if (contactDocSnap.exists()) {
                profilePicUrl = contactDocSnap.data().profilePicture || '../assets/default-profile-image.jpg';
              } else {
                profilePicUrl = '../assets/default-profile-image.jpg';
              }

              const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1));
              const lastMessageSnap = await getDocs(lastMessageQuery);

              if (!lastMessageSnap.empty) {
                const lastMessageDoc = lastMessageSnap.docs[0].data();

                // Push the chat data to the array
                fetchedChats.push({
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
                  userImageUrl: profilePicUrl,
                });
              }
            }

            // Sort the fetched chats based on the latest message timestamp in descending order
            const sortedChats = fetchedChats.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

            // Update the chats array with the sorted chats
            chats.value = sortedChats;
          } else {
            console.log('User document does not exist!');
          }
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };


      const scrollToBottom = () => {
        setTimeout(() => {
          let box = document.querySelector('.msg_history');
          if (box) {
            box.scrollTop = box.scrollHeight;
          }
        }, 100);  
      };


    const saveMessage = async () => {
      if (authUser.value && authUser.value.displayName && selectedChat.value) {
        const messageData = {
          message: newMessage.value,
          senderUID: authUser.value.uid,
          senderName: authUser.value.displayName,
          receiverUID: selectedChat.value.id, // Receiver's UID is the chat ID
          receiverName: selectedChat.value.name,
          timestamp: serverTimestamp(),
        };

        try {
          const msgListRef = collection(db, 'Message', selectedChat.value.id, 'msglist');
          await addDoc(msgListRef, messageData);

          // Clear the input field after saving the message
          newMessage.value = '';
          // Msg history is updated in real-time, will auto scroll down when sending a new message
          scrollToBottom();
        } catch (error) {
          console.error('Error adding message: ', error);
        }
      } else {
        console.error('Invalid authUser data or selected chat');
      }
    };

   




     const triggerFileInput = () => {
        console.log('triggerFileInput called');
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
     };



   const handleFileUpload = async (event) => {
    console.log('handleFileUpload called');
    if (authUser.value && authUser.value.displayName && selectedChat.value) {
        const file = event.target.files[0];
        if (file) {
            const storageChildRef = storageRef(storage, 'chat_images/' + file.name);
            try {
                await uploadBytes(storageChildRef, file);
                const downloadURL = await getDownloadURL(storageChildRef);
                const newMessage = {
                    senderUID: authUser.value.uid,
                    senderName: authUser.value.displayName,
                    receiverUID: selectedChat.value.id,
                    receiverName: selectedChat.value.name,
                    timestamp: serverTimestamp(),
                    imageUrl: downloadURL,
                };

                const msgListRef = collection(db, 'Message', selectedChat.value.id, 'msglist');

                await addDoc(msgListRef, newMessage);

                // Clear the input field after saving the message
                message.value = '';
                scrollToBottom();

                console.log('Message uploaded successfully.');
            } catch (error) {
                console.error('Error uploading file:', error);
                  
            }
        } else {
            console.error('No file selected.');
 
        }
    } else {
        console.error('Invalid authUser data or selected chat.');
 
    }
   };  

    const sendMessageOnClick = () => {
      saveMessage();
    };

    const updateChat = (chatId, lastMessage) => {
      const index = chats.value.findIndex((chat) => chat.id === chatId);
      if (index !== -1) {
        chats.value[index].lastMessage = lastMessage;
        // Sort the chats based on the latest message timestamp
        chats.value.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
      }
    };
 

    const selectChat = async (chatSummary) => {
        const messagesRef = collection(db, 'Message', chatSummary.id, 'msglist');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

         selectedChat.value = {
            id: chatSummary.id,
            messages: [],
            name: chatSummary.name,
            unsubscribe: null,
          };

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              id: doc.id,
              text: doc.data().message,
              receiverName: doc.data().receiverName,
              receiverUID: doc.data().receiverUID,
              senderName: doc.data().senderName,
              senderUID: doc.data().senderUID,
              timestamp: doc.data().timestamp,
              imageUrl: doc.data().imageUrl,
            });
          });

          // Update selectedChat.messages with real-time data
          selectedChat.value = {
            id: chatSummary.id,
            messages: messages,
            name: chatSummary.name,
          };

          // Update the chats array with the latest message
          const lastMessage = messages[messages.length - 1];
          updateChat(chatSummary.id, {
            text: lastMessage.text,
            receiverName: lastMessage.receiverName,
            receiverUID: lastMessage.receiverUID,
            senderName: lastMessage.senderName,
            senderUID: lastMessage.senderUID,
            timestamp: lastMessage.timestamp,
          });

          scrollToBottom();
        });

        // Store the unsubscribe function in selectedChat
        selectedChat.value.unsubscribe = unsubscribe;
      };

      
    const navigateToGroupsChat = () => {
     
      router.push({ name: 'ChatGroups' });  

    };




    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();

    };

    const formatMessageDate = (timestamp) => {

        if (!timestamp) {
          return '';  
        }

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
      saveMessage,
      currentUserUID,
      message,
      authUser,
      sendMessageOnClick,
      handleFileUpload,
      triggerFileInput,
      scrollToBottom,
      navigateToGroupsChat,
      newMessage,
    };        
    }
};
</script>

 



<style scoped>

html, body {
  height: 1000px; 
  margin: 0;
  padding: 0;
}


.messaging {
  flex: 1;
  /* This makes sure that your .messaging div takes up all available space */

}

 

.container{
  max-width:100%; 

  margin:auto; 



  }

img{ 
  max-width:100%;
  }

  
  .profiles {
    font-weight: 600;
    font-size: 1.3rem; 
    width: 10rem;
    height: 3.6rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
    margin-right: 3rem;
    margin-left: 7rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
 
 
  }

 

  .groups {
    font-weight: 600;
    font-size: 1.3rem; 
    width: 10rem;
    height: 3.6rem;
    border: 2px solid #525fe1;
    background-color: transparent;
    color: #525fe1;
    border-radius: 2rem;
    cursor: pointer;
 
 
  
  } 

.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; 
  border-right:1px solid #c4c4c4;
  
}

.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;


}

.bold-text {
  font-weight: bold;
}


 

.group-parent { 
  width: 100%; 
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
  margin-left: 20px;
  margin-top: 40px;

}
.headind_srch{ 
  padding: 1rem 1rem 1rem 1rem;
  position: sticky;
  position: sticky;
  top: 0;
  left: 0px;
  z-index: 3;
  background: white;
  border-bottom:1px solid #c4c4c4;
 
  }

.groups {
  color:#525fe1;
  background-color: white;
}
.groups:hover {
  color:white;
  background-color: #525fe1;
  transition: 0.3s ease-in-out;
}

.profiles {
  color: white;
  margin-right: 30px;
}

 
.chat_ib h5{ 
  font-size:1.4rem; 
  color:#464646; 
  margin:0 0 8px 0;
  }

.chat_ib h5 span{ 
  font-size: 1rem; 
  margin-right: -1.1rem;
  float:right;
  
  }

.chat_ib p{ 
  font-size:1.1rem; 
  color:#989898;
  margin:auto;
 
   }

.chat_img {
  float: left;  
  width: 5rem;
  margin-right: 1.5rem;  
}

.individualProfile {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
}

.chat_ib {
  padding: 0;
  width: calc(100% - 9rem); 
}

.chat_people {
  overflow: hidden;
  clear: both;
  display: flex;  
  align-items: center;  
  height: 6rem;
}

.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 1rem 1rem 1rem;
  
}

.inbox_chat { 
  height: 640px; 
  overflow-y: scroll; 
  

  }

  .mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%; 
  height: 762px; 
 
  }

  .noSelectedChat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.send-message-icon {
  width: 6rem;  
  height: 6rem;  
  margin-top: 11rem;
}

.noChatSelectedHeader1 { 
    margin-top: 3rem;
  }

.noChatSelectedHeader2 {
    margin-top: -1rem;
    font-size: 1.1rem;
    color:darkgrey;
  }

   



 

.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  color: #4c4c4c;
  font-size: 1rem;
  min-height: 2rem;
  width: 98%;
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  margin-right: 1rem;
  
}
 
.input_msg_write {
  position: absolute;
  width: 57%;
  top: 860px;
  margin-right: 5%;
  z-index: 100;
  

}

  
.msg_history {
  height: 89%;
  overflow-y: auto;
  padding-right: 0.6rem;
  overflow-x: hidden;
}

.msg_history::-webkit-scrollbar {
  width: 0.6rem;  
}

.msg_history::-webkit-scrollbar-thumb {
  background-color: #888;  
  border-radius: 0.2rem; 
}

.msg_history::-webkit-scrollbar-track {
  background-color: #f1f1f1;  
}

  
 
.sent_msg {
  float: right;
  width: 60%;
  clear: both; 
  margin-bottom: 1rem;
  
}

.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
   margin-bottom: 1rem;
 }

  .sent_msg p {
  background: #9bcbd7 none repeat scroll 0 0;
  border-radius: 0.4rem;
  font-size: 1rem;
  margin: 0; 
  color:#fff;
  padding: 1rem 2rem 1rem 0.5rem;
  width:100%;
  word-wrap: break-word;
}
 

 .received_withd_msg p {
  background: rgb(238, 236, 236) none repeat scroll 0 0;
  border-radius: 0.4rem;
  color: #646464;
  font-size: 1rem;
  margin: 0;
  padding: 1rem 2rem 1rem 0.5rem;
  width: 100%;
  word-wrap: break-word;
} 

.name-of-sender {
  color: #747474;
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.7rem;
}

.type_msg {
  /* If you want the message typing area to stay at the bottom */
 height: 115px;
}


 

.msg_send_btn {
  cursor: pointer;
  height: 1.7rem;
  position: absolute;
  top: 0.8rem;
  right: 6rem;

}


.upload-icon {
  cursor: pointer;
  height: 1.7rem;
  position: absolute;
  top: 0.8rem;
  right: 3rem;
}

.uploaded-image {
  max-width: 10rem; 
  max-height: 10rem; 
}


 

</style> 


