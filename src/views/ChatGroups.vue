<template>
<NavigationBar />
 
<div class="container">
<div class="messaging">
      <div class="inbox_msg">
        <!--INBOX TO BE UPDATED (FETCH FROM FIREBASE) -->
        <div class="inbox_people">
          <div class="headind_srch">
            <div class="group=parent">
              <div class="stylish-input-group">
                    <button class="profiles" @click="navigateToProfileChat">Profiles</button>
                    <button class="groups">Groups</button>
               </div>
            </div>
          </div>
          <div class="inbox_chat">
            <div class="chat_list active_chat">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
            <div class="chat_list">
              <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                <div class="chat_ib">
                  <h5>Sunil Rajput <span class="chat_date">Dec 25</span></h5>
                  <p>Test, which is a new approach to have all solutions 
                    astrology under one roof.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       <div class="mesgs">

          <div class="msg_history">
              <div v-for="message in messages">
                <div :class="[message.author === authUser.displayName ? 'sent_msg' : 'received_msg']">
                  <img v-if="message.imageUrl" :src="message.imageUrl" alt="Uploaded Image" class="uploaded-image">
                  <div v-else class="received_withd_msg">
                    <p>{{ message.message }}</p>
                    <span class="name-of-sender">{{ message.author }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="type_msg">
              <div class="input_msg_write">
                <img class="upload-icon" src="../assets/uploadphoto.png" alt="Upload Icon" @click="triggerFileInput" />
                <input id="fileInput" ref="fileInput" type="file" style="display: none" @change="handleFileUpload" />
                <input @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                <img class="msg_send_btn" alt="" src="../assets/send.png" @click="sendMessageOnClick" />
              </div>
            </div>

        </div>
      </div>
      
      
  
      
    </div></div>
</template>


<script>

import { ref, onMounted, onUnmounted, watch } from 'vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import firebaseApp from '../firebase.js';
import NavigationBar from '../components/NavigationBar.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

 

export default {
  name: 'PrivateChatGroups',

  components: {
    NavigationBar,
  }, 
  
  setup() {
    const message = ref(null);
    const messages = ref([]);
    const authUser = ref({});
    const router = useRouter();
    const auth = getAuth(firebaseApp);
    const storage = getStorage(firebaseApp);
    const db = getFirestore(firebaseApp);


      const triggerFileInput = () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
     };


      const handleFileUpload = async (event) => {
          if (authUser.value && authUser.value.displayName) {
            const file = event.target.files[0];
            if (file) {
              const storageChildRef = storageRef(storage, 'chat_images/' + file.name);
              try {
                await uploadBytes(storageChildRef, file);
                const downloadURL = await getDownloadURL(storageChildRef);
                const newMessage = {
                  author: authUser.value.displayName,
                  createdAt: new Date(),
                  imageUrl: downloadURL,
                };
 
                addDoc(collection(db, 'chat'), newMessage)
                  .then(docRef => {
                    console.log('Message written with ID: ', docRef.id);
                  })
                  .catch(error => {
                    console.error('Error adding message: ', error);
                  });

         
                scrollToBottom();

        
                message.value = '';
              } catch (error) {
                console.error('Error uploading file:', error);
              }
            }
          } else {
            console.error('Invalid authUser data');
          }
        };




     
   
    const scrollToBottom = () => {
      let box = document.querySelector('.msg_history');
      if (box) {
        box.scrollTop = box.scrollHeight;
      }
    };

    const sendMessageOnClick = () => {
      saveMessage();
    };

 
    const saveMessage = () => {
      if (authUser.value && authUser.value.displayName) {
      const newMessage = {
        message: message.value,
        author: authUser.value.displayName,
        createdAt: new Date(),
        imageUrl: null,
      };

      addDoc(collection(db, 'chat'), newMessage)
        .then(docRef => {
          console.log('Document written with ID: ', docRef.id);
          scrollToBottom();
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });

     
      messages.value.push(newMessage);

     
      message.value = '';
    } else {
      console.error('Invalid authUser data');
    }
    };

    const navigateToProfileChat = () => {
      router.push({ name: 'Chat' });  
    };

   
    const fetchMessages = () => {
      const q = query(collection(db, 'chat'), orderBy('createdAt', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let allMessages = [];
        snapshot.forEach((doc) => {
          allMessages.push(doc.data());
        });

        messages.value = allMessages;

    
      });

      return unsubscribe;
    };

    const unsubscribe = ref(null);

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          authUser.value = user;
        } else {
          authUser.value = null;
        }
      });
      unsubscribe.value = fetchMessages();
    });

   
    onUnmounted(() => {
      if (unsubscribe.value) {
        unsubscribe.value();
      }
    });

    return {
      message,
      messages,
      saveMessage,
      authUser,
      sendMessageOnClick,
      navigateToProfileChat,
      handleFileUpload,
      triggerFileInput,
    };
  }
};
</script>



<style scoped>

.container{
  max-width:100%; 
  height: 100%;
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
    background-color:transparent;
    border: 2px solid #525fe1;
    border-radius: 2rem;
    color: #525fe1;;
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
    border: none;
    background-color: #525fe1;;
    color: white;
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


 

.group-parent { 
  width: 100%; 
}

.headind_srch{ 
  padding: 1rem 1rem 1rem 1rem;
  overflow:hidden; 
  border-bottom:1px solid #c4c4c4;
 
  }

 
.chat_ib h5{ 
  font-size:15px; 
  color:#464646; 
  margin:0 0 8px 0;
  }

.chat_ib h5 span{ 
  font-size:13px; 
  float:right;
  
  }

.chat_ib p{ 
  font-size:14px; 
  color:#989898;
  margin:auto;
 
   }

.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ 
  overflow:hidden; 
  clear:both;
  }

.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 1rem 1rem 1rem;
  
}

.inbox_chat { 
  height: 28rem; 
  overflow-y: scroll;
  }

.active_chat{ 
  background:#ebebeb;
  }

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 92%;
 }
 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
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

.received_withd_msg {
   width: 100%; 
   }

.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
 
  
  
}

 .sent_msg p {
  background: #65a4b6 none repeat scroll 0 0;
  border-radius: 0.4rem;
  font-size: 1rem;
  margin: 0; 
  color:#fff;
  padding: 1rem 2rem 1rem 0.5rem;
  width:100%;
  word-wrap: break-word;
}
 
.sent_msg {
  float: right;
  width: 50%;
  clear: both; 
  
}


.input_msg_write   {
  margin-top: 1rem;
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

.type_msg { 
  position: relative;
  }

.msg_send_btn {
  cursor: pointer;
  height: 1.7rem;
  position: absolute;
  top: 11.5px;
  left: 47.5rem;

}

.upload-icon {
  cursor: pointer;
  height: 1.7rem;
  position: absolute;
  top: 11.5px;
  left: 50rem;
}


.uploaded-image {
  max-width: 15rem; 
  max-height: 15rem; 
}
 
 
.msg_history {
  height: 28rem; 
  overflow-y: auto;
  padding-right: 0.6rem;
  overflow-x: hidden;
}

.msg_history::-webkit-scrollbar {
  width: 0.6rem; /* Set the width of the scrollbar */
}

.msg_history::-webkit-scrollbar-thumb {
  background-color: #888; /* Set the color of the scrollbar thumb */
  border-radius: 0.2rem; /* Optional: Round the corners of the thumb */
}

.msg_history::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* Set the color of the scrollbar track */
}

</style>  