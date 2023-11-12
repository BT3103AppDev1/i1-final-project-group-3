<template>
  <NavigationBar />
  <div class="container">
      <div class="messaging">
          <div class="inbox_people">
              <div class="convo-list">
                <div class="headind_srch">
                    <div class="group-parent">
                      <div class="stylish-input-group">
                            <button class="profiles" @click="navigateToProfiles">Profiles</button>
                            <button class="groups" >Groups</button>
                      </div>
                    </div>
                  </div>

                  <div class="inbox_chat">
                      <div v-for="group in groups" :key="group.id" @click="selectGroup(group)" class="conversations">
                          <div class="chat_list">
                              <div class="chat_group">
                                  <div class="chat_name_and_date">
                                      <h5 class="bold-text">{{ group.name }} </h5>

                                      <!-- Only try to access timestamp if lastMessage exists -->
                                      <span v-if="group.lastMessage" class="chat_date">{{ formatMessageDate(group.lastMessage.timestamp) }}</span>
                                      
                                  </div>
                                  
                                  <div class="chat_message">
                                      <p v-if="group.lastMessage"> {{group.lastMessage.senderName}} : {{ group.lastMessage.text }}</p>
                                      <p v-else>No messages</p>
                                  </div>
                                  <!-- Conditionally render last message text or a placeholder -->
                                 

                              </div>

                          </div>
                          
                      </div>

                  </div>

              </div>

          </div>

          <div class="mesgs">
              <div class="msg_history">
                  <div class="message-list">
                  <div v-if="selectedGroup" class="group-chat-header">
                    <div class="group-name-header">
                      <h1>{{ selectedGroupName }}</h1>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="more-options" @click="openOptions">
                      <circle cx="12" cy="12" r="9" stroke="#33363F" stroke-width="2"/>
                      <circle cx="12" cy="18" r="0.5" fill="#33363F" stroke="#33363F"/>
                      <path d="M12 16V14.5811C12 13.6369 12.6042 12.7986 13.5 12.5V12.5C14.3958 12.2014 15 11.3631 15 10.4189V9.90569C15 8.30092 13.6991 7 12.0943 7H12C10.3431 7 9 8.34315 9 10V10" stroke="#33363F" stroke-width="2"/>
                      </svg>
                    </div>
                    <!---Options pop up--->
                    <div class="popup" v-if="isOptionsPopupOpen">
                      <h2 class="option-title">Members</h2>
                      <div class="group-member-container">
                        <div class="group-member" v-for="(name, userId) in groupMemberNames" :key="userId">
                          <img :src="getProfileImageUrl(userId)" class="option-image">
                          <div class="name-and-title">
                            <h6 class="member-name">{{ name }}</h6>
                            <span class="member-title">{{ isGroupAdmin(userId) ? 'Admin' : 'Member' }}</span>
                            <button v-if="isCurrentUserAdmin && !isGroupAdmin(userId)" @click="confirmMemberRemoval(userId)" class="remove-button">Remove</button>
                          </div>

                          
                        </div>
                      </div>
                    </div>

                    <!--- Confirmation Popup -->
                    <div v-if="showConfirmationPopup" class="backdrop"></div>
                    <div class="confirmation-popup" v-if="showConfirmationPopup">
                      <div class="confirmation-content">
                        <h1 class="remove-member-name"> Remove {{ memberToRemoveName }} ?</h1>
                          <p>Member of {{ selectedGroupName }}</p>
                          <div class="confirmation-button">
                            <button @click="removeMember" class="confirm-button">Confirm</button>
                            <button @click="cancelRemoval">Cancel</button>

                      </div>

                      </div>

                      
                      

                    </div>



                      

                      <div v-for="message in selectedGroupMessages" :key="message.id">
                          <!-- For sent messages -->
                          <div v-if="message.senderUID === authUser?.uid" class="sent_msg">
                            <div class="name-and-image">
                              <img :src="getProfileImageUrl(message.senderUID)" alt="Profile Image" class="profile-image-self">
                              <span class="members-name">{{ groupMemberNames[message.senderUID] }}</span>

                            </div>
                            
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
                            <img :src="getProfileImageUrl(message.senderUID)" alt="Profile Image" class="profile-image-members">
                            <span class="members-name">{{ groupMemberNames[message.senderUID] }}</span>
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
                          <input @keyup.enter="sendMessageOnClick" v-model="newMessage" type="text" class="write_msg" placeholder="Type a message" />
                          <img class="msg_send_btn" alt="" src="../assets/send.png" @click="sendMessageOnClick" />
                          </div>
                      </div>
                  </div>
                  <div v-else="" class="noSelectedGroup">
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

import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { getFirestore, doc, getDocs, getDoc, collection, query, orderBy, limit, addDoc, serverTimestamp, onSnapshot, arrayRemove, updateDoc  } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '@/firebase.js';
import NavigationBar from '../components/NavigationBar.vue';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import defaultProfileImage from '@/assets/default-profile-image.jpg';
  

const auth = getAuth(firebaseApp);
  
export default {
  name: 'ChatGroups',

  components: {
      NavigationBar
  },

  methods: {
    navigateToProfiles() {
      this.$router.push({ name: 'Chat' });
    },

  },

  setup() {
      const authUser = ref(null);
      const groups = ref([]);
      const selectedGroup = ref(null);
      const selectedGroupMessages = ref([]);
      const user = ref(null);
      const db = getFirestore(firebaseApp);
      const storage = getStorage(firebaseApp);

      const message = ref(''); 
      const newMessage = ref('');
      const unsubscribeFetchMessages = ref(null);
      const selectedGroupName = ref('');
      const groupMemberProfiles = ref({});  
      const groupMemberNames = ref({}); 
      const groupCreatorId = ref('');

      const isOptionsPopupOpen = ref(false);
      const showConfirmationPopup = ref(false);
      const memberToRemove = ref(null);

      const memberToRemoveName = ref('');
    
      



      onMounted(() => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
              authUser.value = user;
              if (user) {
              fetchGroups(user.uid);
      
              } else {
              // User is not authenticated
              }
          });

          onUnmounted(() => {
              if (unsubscribeFetchMessages.value) {
                  unsubscribeFetchMessages.value();
              }
              document.removeEventListener('click', handleClickOutside);
          });

         
          
          return unsubscribe;
      });
      nextTick(() => {
        document.addEventListener('click', handleClickOutside);
      });
     

      const fetchGroups = async (uid) => {
          const userDocRef = doc(db, 'Users', uid);

          try {
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
              const activeGroups = userDocSnap.data().activeGroups;

              for (const groupId of activeGroups) {
                  const groupMessageRef = collection(db, `Groups/${groupId}/msgList`);
                  const groupDocRef = doc(db, 'Groups', groupId);
                  const groupDocSnap = await getDoc(groupDocRef);

                  if (groupDocSnap.exists()) {
                  const groupData = groupDocSnap.data();
                  
             
                  const lastMessageQuery = query(groupMessageRef, orderBy('timestamp', 'desc'), limit(1));
                  const lastMessageSnap = await getDocs(lastMessageQuery);

                  let lastMessage = null;
                  if (!lastMessageSnap.empty) {
                      const lastMessageDoc = lastMessageSnap.docs[0].data();
                      lastMessage = {
                      text: lastMessageDoc.text || '',
                      senderName: lastMessageDoc.senderName || '',
                      senderUID: lastMessageDoc.senderUID || '',
                      timestamp: lastMessageDoc.timestamp || '',
                      };
                  }

                  groups.value.push({
                      id: groupId,
                      name: groupData.title,
                      lastMessage: lastMessage,
                      // This will be null if there's no message
                  });
                  }
              }

                // Sort the fetched chats based on the latest message timestamp in descending order
                const sortedChats =  groups.value.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

                // Update the chats array with the sorted chats
                groups.value = sortedChats;
              } else {
              console.error(`User document with UID ${uid} does not exist.`);
              }
          } catch (error) {
              console.error('Error fetching groups:', error);
          }
      };


      const fetchMessages = (groupId) => {
          const messagesRef = collection(db, 'Groups', groupId, 'msgList');
          const q = query(messagesRef, orderBy('timestamp'));

          // Detach any previous listener
          if (unsubscribeFetchMessages.value) {
              unsubscribeFetchMessages.value();
          }

          // Setting up real-time listener
          unsubscribeFetchMessages.value = onSnapshot(q, (querySnapshot) => {
              console.log('Snapshot received:', querySnapshot.docs);
              selectedGroupMessages.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          }, (error) => {
              console.error('Error fetching real-time messages:', error);
          });
      };

      const selectGroup = async (group) => {
          // Clear previous messages
          selectedGroup.value = group;

          const groupDocRef = doc(db, 'Groups', group.id);
          const groupDocSnap = await getDoc(groupDocRef);
          const groupData = groupDocSnap.data();

          groupCreatorId.value = groupData.userid;
          console.log(groupCreatorId.value)
          console.log(groupData.title)
          
          console.log(group)
          selectedGroupName.value = groupData.title;
          console.log(group.id)
          // Fetch new messages for the selected group
          fetchMessages(group.id);
          

          await fetchGroupMemberProfiles(groupData.groupMembers);
      };

      const fetchGroupMemberProfiles = async (groupMembers) => {
        const profiles = {};
        const names = {};


        for (const memberId of groupMembers) {
          const userDocRef = doc(db, 'Users', memberId);
          try {
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              profiles[memberId] = userData.profilePicture || defaultProfileImage; // Assume 'profileImage' is the field
              names[memberId] = userData.firstName + " " + userData.lastName;
              console.log(`Fetched profile image for user ${memberId}:`, userData.profilePicture);
            } else {
              console.log(`User document for ${memberId} does not exist.`);
              profiles[memberId] = defaultProfileImage;  // Fallback image URL
              names[memberId] = 'Unknown';
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            profiles[memberId] = defaultProfileImage;  // Fallback image URL
            names[memberId] = 'Unknown';
          }
        }

        groupMemberProfiles.value = profiles;
        groupMemberNames.value = names;
        console.log('Group member profiles:', groupMemberProfiles.value);
      };
      const getProfileImageUrl = (userId) => {
        return groupMemberProfiles.value[userId] || '@/assets/default-profile-image.png';
      };




 
      const triggerFileInput = () => {
          console.log('triggerFileInput called');
          const fileInput = document.getElementById('fileInput');
          fileInput.click();
      };

 

      const handleFileUpload = async (event) => {
            console.log('handleFileUpload called');
            if (authUser.value && authUser.value.displayName && selectedGroup.value) {
                const file = event.target.files[0];
                if (file) {
                    const storageChildRef = storageRef(storage, 'chat_images/' + file.name);
                    try {
                        await uploadBytes(storageChildRef, file);
                        const downloadURL = await getDownloadURL(storageChildRef);
                        const newMessage = {
                            senderUID: authUser.value.uid,
                            senderName: authUser.value.displayName,
                            timestamp: serverTimestamp(),
                            imageUrl: downloadURL,
                        };

                        const msgListRef = collection(db, 'Groups', selectedGroup.value.id, 'msgList');

                        // Add a new message document to Firestore
                        await addDoc(msgListRef, newMessage);

                        // Fetch the last message to get the correct timestamp
                        const lastMessageQuery = query(msgListRef, orderBy('timestamp', 'desc'), limit(1));
                        const lastMessageSnap = await getDocs(lastMessageQuery);

                        if (!lastMessageSnap.empty) {
                            const lastMessageDoc = lastMessageSnap.docs[0].data();
                            selectedGroup.value.lastMessage = {
                                text: lastMessageDoc.text || '',
                                senderName: lastMessageDoc.senderName || '',
                                senderUID: lastMessageDoc.senderUID || '',
                                timestamp: lastMessageDoc.timestamp || '',
                            };
                        }

                        // Move the selected group to the top of the list
                        const updatedGroups = groups.value.filter(group => group.id !== selectedGroup.value.id);
                        updatedGroups.unshift(selectedGroup.value);
                        groups.value = updatedGroups;

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

            

       

        const sendMessage = async (text) => {
            try {
                // Reference to the 'msgList' subcollection in the selected group
                const msgListRef = collection(db, 'Groups', selectedGroup.value.id, 'msgList');

                // Add a new message document to Firestore
                const messageToSend = {
                    text: text,
                    senderUID: authUser.value.uid,
                    senderName: authUser.value.displayName,
                    timestamp: serverTimestamp(),
                };
                await addDoc(msgListRef, messageToSend);

                // Fetch the last message to get the correct timestamp
                const lastMessageQuery = query(msgListRef, orderBy('timestamp', 'desc'), limit(1));
                const lastMessageSnap = await getDocs(lastMessageQuery);

                if (!lastMessageSnap.empty) {
                    const lastMessageDoc = lastMessageSnap.docs[0].data();
                    selectedGroup.value.lastMessage = {
                        text: lastMessageDoc.text || '',
                        senderName: lastMessageDoc.senderName || '',
                        senderUID: lastMessageDoc.senderUID || '',
                        timestamp: lastMessageDoc.timestamp || '',
                    };
                }

                // Move the selected group to the top of the list
                const updatedGroups = groups.value.filter(group => group.id !== selectedGroup.value.id);
                updatedGroups.unshift(selectedGroup.value);
                groups.value = updatedGroups;

                // Clear the input field after sending the message
                newMessage.value = '';
 
                // scrollToBottom();
            } catch (error) {
                console.error("Error sending message:", error);
            }
        };





      const sendMessageOnClick = () => {
          
          sendMessage(newMessage.value);
          console.log('sendMessageOnClick called');
      };

      const updateChat = (chatId, lastMessage) => {
          const index = chats.value.findIndex((chat) => chat.id === chatId);
          if (index !== -1) {
              chats.value[index].lastMessage = lastMessage;
              // Sort the chats based on the latest message timestamp
              chats.value.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
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

      /* popup functions */
      const openOptions = () => {
        isOptionsPopupOpen.value = !isOptionsPopupOpen.value;
        if (!isOptionsPopupOpen.value) {
          // Use Vue.nextTick to wait for the next DOM update cycle
          console.log("open")
          nextTick(() => {
            document.addEventListener('click', handleClickOutside);
          });
        } 

        
      };

      const closeOptions = () => {
        isOptionsPopupOpen.value = false;
        document.removeEventListener('click', handleClickOutside);
        console.log('closeOptions called');
      };

      const handleClickOutside = (event) => {
        console.log("clickoutside")
        const popupElement = document.querySelector('.popup'); // Use the correct selector for your popup
        const moreOptionsElement = document.querySelector('.more-options'); // Selector for the button that triggers the popup

        if (popupElement && !popupElement.contains(event.target) && !moreOptionsElement.contains(event.target)) {
          closeOptions();
          console.log("close")
        }
      };

      const isGroupAdmin = (userId) => {
        // Ensure both userId and groupCreatorId are defined and are strings
        return userId === groupCreatorId.value;
      };


      /* Confirmation Popup*/
      const isCurrentUserAdmin = computed(() => {
        console.log("you are admin")
        return isGroupAdmin(authUser.value.uid);
      });

      const confirmMemberRemoval = (userId) => {
        memberToRemove.value = userId;

        const memberName = groupMemberNames.value[userId];
        const groupName = selectedGroupName.value;
        memberToRemoveName.value = memberName;
        selectedGroupName.value = groupName;

        showConfirmationPopup.value = true;
        isOptionsPopupOpen.value = false;
        
      };

      const removeMember = async () => {
        if (!memberToRemove.value || !selectedGroup.value) return;

        try {
          // Step 1: Update the 'Groups' collection
          // Assuming 'selectedGroup.value.id' contains the ID of the current group
          const groupDocRef = doc(db, 'Groups', selectedGroup.value.id);
          console.log(groupDocRef)
          await updateDoc(groupDocRef, {
            groupMembers: arrayRemove(memberToRemove.value)
          });

          // Step 2: Update the 'Users' collection
          // Assuming you have a field in the user's document that keeps track of group memberships
          const userDocRef = doc(db, 'Users', memberToRemove.value);
          await updateDoc(userDocRef, {
            activeGroups: arrayRemove(selectedGroup.value.id)
          });


          if (groupMemberNames.value[memberToRemove.value]) {
            delete groupMemberNames.value[memberToRemove.value];
          }


          // Close the confirmation popup
          showConfirmationPopup.value = false;
          isOptionsPopupOpen.value = true;


        } catch (error) {
          console.error("Error removing member:", error);
          // Handle the error appropriately
        }

        // Reset the memberToRemove
        memberToRemove.value = null;
      };

    const cancelRemoval = () => {
      // Reset removal state and close confirmation popup
      memberToRemove.value = null;
      showConfirmationPopup.value = false;
      isOptionsPopupOpen.value = true;
    };



      

      









      return {
          authUser,
          groups,
          selectedGroup,
          selectGroup,
          fetchGroups,
          user,
          fetchMessages,
          selectGroup,
          selectedGroupName,
          selectedGroupMessages,
          triggerFileInput,
          handleFileUpload,
          sendMessageOnClick,
          updateChat,
          newMessage,
          message,
          scrollToBottom,
          formatMessageDate,
          unsubscribeFetchMessages,
          fetchGroupMemberProfiles,
          getProfileImageUrl,
          groupMemberNames,

          openOptions,
          isOptionsPopupOpen,
          groupCreatorId,
          isGroupAdmin,
          showConfirmationPopup,
          confirmMemberRemoval,
          removeMember,
          cancelRemoval,
          isCurrentUserAdmin,
          memberToRemoveName,

      };
  },

 
}

</script>

<style scoped>

html, body {
height: 1000px; 
margin: 0;
padding: 0;
}


.container{
max-width:100%; 

margin:auto; 
}

.messaging {
  flex:1;
}


img{ 
max-width:100%;
}


.profiles {
  font-weight: 600;
  font-size: 1.3rem; 
  width: 10rem;
  height: 3.6rem;
  background-color: white;
  border: 2px solid #525fe1;
  cursor: pointer;
  margin-right: 3rem;
  margin-left: 7rem;
  margin-top: 1rem;
  margin-bottom: 1rem;


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
.profiles:hover {
  color:white;
  background-color: #525fe1;
  transition: 0.3s ease-in-out;
}

.profiles {
  color: #525fe1;
  margin-right: 30px;
}




.groups {
  font-weight: 600;
  font-size: 1.3rem; 
  width: 10rem;
  height: 3.6rem;
  border: 2px solid #525fe1;
  background-color: #525fe1;
  color: white;
  border-radius: 2rem;
  cursor: pointer;



} 


.bold-text {
font-weight: bold;

}

.inbox_people {
background: #f8f8f8 none repeat scroll 0 0;
float: left;
overflow: scroll;
width: 40%; 
border-right:1px solid #c4c4c4;
height:780px;

}

.mesgs {
float: left;
padding: 30px 15px 0 2px;
width: 60%; 
height: 670px; 
}


.noSelectedGroup {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 130px;
margin-left: 22px;
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

.msg_history {
height: 100%;
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

.inbox_chat { 
height: 1280px; 
overflow-y: scroll; 


}

.chat_list {
border-bottom: 1px solid #c4c4c4;

padding: 1rem 1rem 1rem;
height: 150px;

}

.chat_group {
overflow: hidden;
clear: both;
display: flex; 
flex-direction: column; 
align-items: left;  
height: 6rem;
margin-left: 20px;

}

.chat_group h5{ 
font-size:30px; 
color:#464646; 
margin-top: 10px;


}
.chat_group h5 span{ 
font-size: 1rem; 


}


.chat_group p{ 
  font-size:22px; 
  color: #8f8f8f;

 }

 .chat_date {
  align-self: right;
  margin-left: 0px;
  margin-top: 10px;
  

 }

.chat_name_and_date {
display: flex;
justify-content: space-between; /* This will push the h5 to the left and the span to the right */
align-items: center; /* This will align them vertically in the center */
/* Ensure the container fills the width of the parent */
width: 100%; 
}

 .chat_message {
  margin-top: 15px;
  
 }

 .profile-image-members {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;

 }

 .name-and-image {
  margin-left: 300px;
 }

 .profile-image-self {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  
  margin-top: 10px;
  margin-bottom: 10px;

 }


 .received_msg {
  display: flex;
  align-items: center; /* This aligns children (the image and name) vertically */
  /* other styles... */
}

.members-name {
  margin-left: 20px;
  position: relative;
  top: -20px; 
  font-size: 18px;
  color: #767676;
  font-weight: bolder;
}

.group-name-header {
  position: sticky;
  top: 0;
  left: 0px;
  margin-left:-20px;
  background: white;
  height: 100px;
  width: 864px;
  z-index: 1;
  border-bottom: 1px solid #c4c4c4;
  text-align: left;
  display: flex;
  flex-direction: row;
  

}

.more-options {
  position: absolute;
  left: 800px;
  top: 50px;
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
top: 850px;
margin-right: 5%;


}





.sent_msg {
float: right;
width: 60%;
clear: both; 
margin-bottom: 1rem;

}

.received_msg {
display: inline-block;
padding: 0 0 0 25px;
vertical-align: top;
width: 92%;
 margin-bottom: 1rem;
}

.sent_msg p {
background: #525fe1 none repeat scroll 0 0;
border-radius: 0.4rem;
font-size: 1rem;
margin: 0; 
color:#fff;
padding: 1rem 2rem 1rem 2rem;
width:100%;
word-wrap: break-word;
}


.received_withd_msg p {
background: rgb(238, 236, 236) none repeat scroll 0 0;
border-radius: 0.4rem;
color: #646464;
font-size: 1rem;
margin: 0;
padding: 1rem 2rem 1rem 2rem;
width: 100%;
word-wrap: break-word;
} 


.type_msg {
/* If you want the message typing area to stay at the bottom */

padding-left: 25px;
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




h5, p {
  color: black;
}
.chat_date {
  color: black;
}



h4 {

  color: #6a6868;
  font-size: 20px;    
  margin-top: -20px;
}

/* styling popup */
.popup {
  height: auto;
  display: flex;
  flex-direction: column;
  z-index: 10;
  top: 150px;
}

.option-title {
  margin-top: 100px;
}
.group-member-container { /* New container for members to apply columns */
  column-count: 2; /* Creates two columns */
  column-gap: 50px;
   /* Adjust the gap between columns */
  justify-content: center;
  margin-bottom: 50px;
  
}

.group-member {
  break-inside: avoid; /* Prevents breaking the content across columns */
  page-break-inside: avoid; /* For older browsers */
  -webkit-column-break-inside: avoid; /* For Safari */
  margin-bottom: 30px; 
  display: flex;
  flex-direction: row;
  

}


.option-image {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
  margin-top: 10px;
  margin-left: 10px;

}

h6 {
  color: black;
  font-size: 25px;
  font-weight: bold;
  margin-top: 40px;

}
.name-and-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* Adjust as needed for spacing between elements */
}

.member-name {
  margin: 0;
  align-self: flex-start;
}

.name-and-title .member-title {
  white-space: nowrap; /* Prevent the title from wrapping */
  margin-right: auto; /* Pushes everything else to the right */
}

.name-and-title h6 {

  margin: 0; /* Remove any default margins */
  padding: 0; /* Remove any default padding */
  /* Additional styling */
}

.member-title {
  color: #767575;
  font-size: 15px;
  font-style: italic;
  
  
}


.remove-button {
  width: 100px;
  height: 25px;
  font-size: 13px;
  color: #525fe1;
  margin-top: 10px;
  margin:0;
  align-self: flex-start;
}

.remove-button:hover {
  background-color: #525fe1;
  color: white;
  border: 2px solid #525fe1;
  cursor: pointer;
}

.confirmation-popup {
  position: absolute; /* or 'fixed' if you want it to be viewport-centered */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%); /* Adjust to center perfectly */
  width: auto; /* Adjust as needed */
  height: auto;
  border-radius: 30px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
}
.confirmation-content {
  padding:50px 150px 50px 150px;
}

.confirmation-popup h1 {
  font-size: 40px;
  margin-top: 30px;
  margin-left:0;
  margin-right:0;
  text-align: center;


}

.confirmation-popup p {
  font-size: 28px;
  text-align: center;
  color:#ADA6A6;
  font-style:italic;
  font-weight: 100;
  margin-top: 30px;
  margin-left:0;
  margin-right:0;

}

.confirmation-button {
  display: flex;
  justify-content: center; /* This centers the buttons horizontally in the flex container */
  gap: 60px;
  margin-top: 30px;





}

button {
  color: #525fe1
}

button:hover {
  color: white;
  background-color:#525fe1;
  transition: 0.3s;
  cursor: pointer;
}


.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 999; /* Below the popup but above everything else */
}
.group-parent { 
  width: 100%; 
}


</style>