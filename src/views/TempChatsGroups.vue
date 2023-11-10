<template>
    <NavigationBar />
    <div class="convo-list">
        <div class="chat-buttons">
            <button class="profiles" @click="navigateToProfiles">Profiles</button>
            <button class="groups" >Groups</button>
        </div>
        <div v-for="group in groups" :key="group.id"  @click="selectGroup(group)" class="conversations">
            <h3 class="chat-name">{{ group.name }}</h3>
                       
        </div>
                


    </div>

    <div class="message-list">
        <div v-if="selectedGroup">
            <div class="message-list">
                <div v-for="group in groups" :key="group.id" @click="selectGroup(group)">
                    {{ group.name }}
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
        <div v-else="" class="noSelectedGroup">
            <svg class = "imageblank" width="168" height="187" viewBox="0 0 168 187" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M37.0418 121.92L36.3432 122.635L37.0418 121.92ZM63 137.135L63.295 136.179L63 137.135ZM28.875 154.883L28.3648 155.743C28.4139 155.772 28.4654 155.797 28.5188 155.817L28.875 154.883ZM146 84.188C146 118.859 118.375 140.627 84 140.627V142.627C119.213 142.627 148 120.212 148 84.188H146ZM22 84.188C22 54.5091 49.5751 32.167 84 32.167V30.167C48.837 30.167 20 53.0706 20 84.188H22ZM84 32.167C101.242 32.167 116.756 36.5476 127.935 45.2126C139.083 53.8534 146 66.8125 146 84.188H148C148 66.2162 140.814 52.6648 129.16 43.6319C117.538 34.6232 101.552 30.167 84 30.167V32.167ZM37.7403 121.204C27.9511 111.649 22 98.0071 22 84.188H20C20 98.5628 26.1807 112.715 36.3432 122.635L37.7403 121.204ZM84 140.627C76.8234 140.627 69.9248 138.226 63.295 136.179L62.705 138.09C69.2119 140.099 76.4499 142.627 84 142.627V140.627ZM63.295 136.179C62.2278 135.85 61.139 136.271 60.2027 136.84C59.2323 137.43 58.1802 138.332 57.0777 139.375C55.969 140.423 54.7553 141.668 53.4724 142.965C52.1825 144.27 50.8106 145.64 49.3581 146.973C43.4677 152.375 36.6445 156.774 29.2312 153.948L28.5188 155.817C37.1472 159.107 44.8278 153.842 50.71 148.446C52.2007 147.079 53.6013 145.679 54.8945 144.371C56.1948 143.056 57.3749 141.847 58.4521 140.828C59.5354 139.803 60.4611 139.024 61.242 138.549C62.0569 138.053 62.4928 138.025 62.705 138.09L63.295 136.179ZM29.3852 154.023C29.3508 154.002 29.1219 153.822 29.139 152.894C29.1548 152.035 29.3824 150.856 29.7925 149.406C30.6089 146.52 32.0633 142.846 33.5718 139.08C35.0679 135.344 36.6161 131.521 37.5698 128.423C38.0457 126.877 38.3915 125.456 38.498 124.286C38.5512 123.7 38.5489 123.134 38.4515 122.626C38.3541 122.119 38.1483 121.602 37.7403 121.204L36.3432 122.635C36.3648 122.656 36.4376 122.744 36.4873 123.003C36.5369 123.262 36.5499 123.624 36.5062 124.105C36.4187 125.067 36.1212 126.331 35.6583 127.834C34.7348 130.835 33.2248 134.567 31.7152 138.336C30.2179 142.074 28.719 145.854 27.868 148.862C27.4445 150.359 27.16 151.737 27.1393 152.857C27.1199 153.909 27.3301 155.129 28.3648 155.743L29.3852 154.023Z" fill="#343434"/>
                    <path d="M81 85.959C81 86.5113 80.5523 86.959 80 86.959C79.4477 86.959 79 86.5113 79 85.959C79 85.4067 79.4477 84.959 80 84.959C80.5523 84.959 81 85.4067 81 85.959Z" fill="#343434"/>
                    <path d="M85 85.959C85 86.5113 84.5523 86.959 84 86.959C83.4477 86.959 83 86.5113 83 85.959C83 85.4067 83.4477 84.959 84 84.959C84.5523 84.959 85 85.4067 85 85.959Z" fill="#343434"/>
                    <path d="M89 85.959C89 86.5113 88.5523 86.959 88 86.959C87.4477 86.959 87 86.5113 87 85.959C87 85.4067 87.4477 84.959 88 84.959C88.5523 84.959 89 85.4067 89 85.959Z" fill="#343434"/>
            </svg>

            <h2>Your Messages</h2>
            <h4>Send private photos and messages to a friend or group!</h4>
                    
                    
                
        </div>
        
    </div>
    
</template>

<script>

import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDocs, getDoc, collection, query, orderBy, limit } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from '@/firebase.js';
import NavigationBar from '../components/NavigationBar.vue';

    

    
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
        const selectedGroupMessages = ref([]);
        const user = ref(null);
        const db = getFirestore(firebaseApp);
        const auth = getAuth(firebaseApp);


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

                for (const groupId of activeGroups) {
                    console.log(groupId);
                    const groupDocRef = doc(db, 'Groups', groupId);
                    const groupDocSnap = await getDoc(groupDocRef);

                    if (groupDocSnap.exists()) {
                    const groupData = groupDocSnap.data();
                    // Ensure that the groupData has a 'title' property before accessing it
                    if (groupData && groupData.title) {
                        groups.value.push({
                        id: groupId,
                        name: groupData.title,
                        });
                        // getting name of document
                        console.log(groupData);
                    } else {
                        console.error(`Group with ID ${groupId} does not have a title.`);
                    }
                    } else {
                    console.error(`No data found for group with ID ${groupId}.`);
                    }
                }
                } else {
                console.error(`User document with UID ${uid} does not exist.`);
                }
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        const fetchMessages = async (groupId) => {
            const messagesRef = collection(db, 'Groups', groupId, 'msgList');
            try {
                const querySnapshot = await getDocs(messagesRef);
                selectedGroupMessages.value = querySnapshot.docs.map(doc => doc.data());
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        const selectGroup = (group) => {
            // Clear previous messages
            selectedGroup.value = group;
            // Fetch new messages for the selected group
            fetchMessages(group.id);
        };








        return {
            groups,
            selectedGroup,
            fetchGroups,
            user,
            fetchMessages,
            selectGroup,
            selectedGroupMessages,
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

h4 {
    font-family: var(--font-josefin-sans);
    color: #6a6868;
    font-size: 20px;    
    margin-top: -20px;
}


</style>