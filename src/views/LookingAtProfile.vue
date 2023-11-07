<template>
    <div class="looking-at-profile-page">
       <NavigationBar class = "navigation"/> 


    <div class ="profile-section" v-if="userProfile">
        <div class="left-section">
            <!-- Dynamic Image -->
            <img class="profile-image" :alt = "userProfile.name" :src="userProfile.profilePicture || defaultProfilePicture" />
            
            <!-- Action buttons -->
            <div class="buttons-container">
                <button class="message" @click="openUploadMessageDialog">Send a Message</button>
                <button class="block" @click="openUploadBlockDialog">Block</button>
            </div>

            <div class="group-info" v-if="userProfile.currentGroup">
                <p class="header" id="current-group">Current Group:</p> 
                <div class="grouparray">
                    <li v-for="group in userProfile.currentGroup" :key="group">{{ group }}</li>
                </div>
            </div>
        </div>

        <div class="right-section">
            <div class="name">
                <h2>{{ userProfile.displayName }}</h2>
            </div>

            <div class="major-profileDescription">
                <h3>{{ userProfile.major }}, Year {{ userProfile.yearOfStudy }}</h3>
                <p>{{ userProfile.description }}</p>
            </div>

            <div class="profile-details">
                <p class="header-profile">Email:</p>
                <p class="profile-info" >{{ userProfile.email }}</p>


                <p class="header-profile">Current Courses:</p>
                <ul id="course-list" class="profile-info">
                    <li v-for="course in userProfile.currentCourses" :key="course">{{ course }}</li>
                </ul>

                <p class="header-profile">My Personalities:</p> 
                <ul id="personality-list" class ="profile-info">
                    <li v-for="personality in userProfile.personalities" :key="personality">{{ personality }}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="post-section">
        <div class="post-header">Posts</div>
        <div class="post1">
        <div class="comments">Comments: 1</div>
        <div class="div2">|</div>
        <div class="likes">Likes: 3</div>
        <b class="post-title">DAO1704x hw1 answer</b>
        <img class="post-user-image" alt="" src="../assets/profile_picture.jpg" />
        <div class="user-name">Liu Siyi</div>
        <div class="post-date">14/2/2023</div>
        <div class="post-content-container">
        <p class="post-content">Anyone has the hw1 answer key?</p>
        </div>
        <div class="post-divider-line" />
    </div>

        <div class="post2">
        <div class="comments">Comments: 1</div>
        <div class="div2">|</div>
        <div class="likes">Likes: 3</div>
        <b class="post-title">DAO1704x hw1 answer</b>
        <img class="post-user-image" alt="" src="../assets/profile_picture.jpg" />
        <div class="user-name">Liu Siyi</div>
        <div class="post-date">14/2/2023</div>
        <div class="post-content-container">
        <p class="post-content">Anyone has the hw1 answer key?</p>
        </div>
        <div class="post-divider-line" />
    </div>



    </div>
    </div>

    <div class="popup" v-show="showMessageDialog" ref="messageDialog">
        <div class="popup-content">
            <h2>Send a Message!</h2>
            <div class="action-buttons">
                <input type="text" placeholder="Say something nice!" v-model="messageText" />
                <button @click="sendMessage('z25KHJk1tScjiIljnupJUSBWIDW', 'Siyi')" class="remove-photo">Send</button> 
                <!--- currently set Siyi account as receiver--->
            </div>

            
        </div>
    </div>

    <div class="popup" v-show="showBlockDialog" ref="blockDialog">
        <div class="popup-content">
            <h2>Are you sure you want to block user?</h2>
            <div class="action-buttons">
                <button @click="removePhoto" class="remove-photo">Cancel</button>
            
                <button @click="removePhoto" class="remove-photo">Confirm</button>
            </div>
            
        </div>
    </div>
</template>
  

<script>  
import { ref, defineComponent, onMounted, onUnmounted, computed } from "vue";
import NavigationBar from '@/components/NavigationBar.vue';
import { doc, getDoc, setDoc, addDoc, getFirestore, collection } from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { getAuth } from 'firebase/auth';
import firebaseApp from '@/firebase.js';



export default defineComponent({
    name: "profile",
    
    components: {
      NavigationBar
    },

    setup() {
        const showMessageDialog = ref(false);
        const showBlockDialog = ref(false);
        const messageDialogRef = ref(null);
        const blockDialogRef = ref(null);
        const messageText = ref('');
        const defaultProfilePicture = '../assets/default-profile-image.jpg';
        const db = getFirestore(firebaseApp);
        const auth = getAuth();
        const route = useRoute();

        const userProfile = ref({
            name: '',
            major: '', 
            yearOfStudy: '', 
            email: '',
            courses: '',
            personalities: '',
            description: '', 
            profilePicture: defaultProfilePicture // Assuming defaultProfilePicture is defined
        });

        // message dialog
        const openUploadMessageDialog = () => {
            showMessageDialog.value = true;
            console.log("true")
            onUnmounted(() => {
                document.removeEventListener('click', closeMessageDialogOnClickOutside);
            });
        };

        const closeMessageDialog = () => {
            showMessageDialog.value = false;
            document.removeEventListener("click", closeMessageDialogOnClickOutside);
        };

        const closeMessageDialogOnClickOutside = (event) => {
            console.log("false")
            // Check if the click event occurred outside of the popup
            if (messageDialogRef.value && !messageDialogRef.value.contains(event.target)) {
                showMessageDialog.value = false;
                document.removeEventListener('click', closeMessageDialogOnClickOutside);
            }
        };

        // block dialog
        const openUploadBlockDialog = () => {
            showBlockDialog.value = true;
            console.log("true")
            onUnmounted(() => {
                document.removeEventListener('click', closeBlockDialogOnClickOutside);
            });
        };

        const closeBlockDialog = () => {
            showBlockDialog.value = false;
            document.removeEventListener("click", this.closeBlockDialogOnClickOutside);
        };

        const closeBlockDialogOnClickOutside = (event) => {
            console.log("false")
            // Check if the click event occurred outside of the popup
            if (blockDialogRef.value && !blockDialogRef.value.contains(event.target)) {
                showBlockDialog.value = false;
                document.removeEventListener('click', closeBlockDialogOnClickOutside);
            }
        };

        const sendMessage = async(receiverUID, receiverName) => {
            console.log(receiverUID);
            console.log(receiverName);
            try {
                const firebaseUser = auth.currentUser;
                
                if (firebaseUser) {
                    const senderUID = firebaseUser.uid;
                    const senderName = firebaseUser.displayName || ''; // If displayName is null, set it to an empty string or handle accordingly
                    const messageDocumentID = senderUID + receiverUID;

                        this.createMessageDocument(messageDocumentID, senderUID, receiverUID, senderName, receiverName);
                        this.addMessageToList(messageDocumentID, senderUID, receiverUID, senderName, receiverName, this.messageText);
                    // After creating the conversation document, you might want to add a message to it, using addMessageToList() method
                } else {
                    console.error("User is not authenticated");
                }
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        };

        const createMessageDocument = async (docID, senderUID, receiverUID, senderName, receiverName) => {
            const docRef = doc(db, 'Message', docID);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    senderUID,
                    receiverUID,
                    senderName,
                    receiverName,
                    createdAt: serverTimestamp(),
                });
                
            }
        };

        const addMessageToList = async (docID, senderUID, receiverUID, senderName, receiverName, messageContent) => {
            const msgListRef = collection(db, 'Message', docID, 'msglist');
            await addDoc(msgListRef, {
                senderUID,
                receiverUID,
                senderName,
                receiverName,
                message: messageContent,
                timestamp: serverTimestamp(),
            });
        };

        const fetchUserProfileFromFirebase = async () => {
            const db = getFirestore(firebaseApp);
            const userId = route.params.userId;

            if (!userId) {
                console.error('No user ID provided');
                return;
            }

            const userDocRef = doc(db, 'Users', userId);

            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const profileData = userDocSnap.data();

                    // Constructing the display name
                    let displayName = profileData.name; // default to the 'name' field
                    if (profileData.firstName || profileData.lastName) {
                        displayName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
                    }

                    // Extracting the year of study
                    const yearMatch = profileData.yearOfStudy ? String(profileData.yearOfStudy).match(/\d+/) : null;
                    const yearOfStudy = yearMatch ? yearMatch[0] : 'Unknown';

                    // Handling the profile picture
                    let profilePicture = profileData.profilePicture || defaultProfilePicture;

                    userProfile.value = {
                        ...profileData, 
                        displayName,
                        yearOfStudy, 
                        profilePicture
                    };
                } else {
                    console.error('Profile document does not exist!');
                }
            } catch (error) {
                console.error('Error fetching profile: ', error);
            }
        };

        onMounted(fetchUserProfileFromFirebase);

        onUnmounted(() => {
            document.removeEventListener('click', closeMessageDialogOnClickOutside);
            document.removeEventListener('click', closeBlockDialogOnClickOutside);
        });

        return {
            userProfile,
            showMessageDialog,
            showBlockDialog,
            messageText,
            messageDialogRef,
            blockDialogRef,
            openUploadMessageDialog,
            closeMessageDialog,
            openUploadBlockDialog,
            closeBlockDialog,
            sendMessage,
            createMessageDocument,
            addMessageToList
        };
    },
});
</script>

<style scoped>
.looking-at-profile-page { 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    overflow-y: auto;
    font-size: var(--font-size-lg);
    color: var(--color-black);
    font-family: var(--font-inter);
}
  
.navigation {
    background-color: #525fe1;
    width: 100%;
    height: 10rem;
}

.profile-section {
    display: flex;
    justify-content: center;
    padding: 2rem;
    margin-top: 5rem;  /* Adjusting for the navigation height */
}

.left-section {
    width: 30%;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    position: relative;
}

.profile-image {
    display: block;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 2rem;
    margin-right: 10rem;
    object-fit: cover;
}

.buttons-container {
    display: flex;
    justify-content: space-between;
    width: 75%;
    padding: 1rem 0;  
    position: relative;
    left:-15px;
}

.message, .block {
    display: block;
    width: 40%;
    margin: 0 0.5rem;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    flex: 1;
    text-align: center;
    cursor: pointer;
}

.message {
    background-color: #F86F03;
    color: white;
    border-radius: 40px;
    font-size: 15px;
    font-family: var(--font-josefin-sans);
    cursor: pointer;
}

.block {
    background-color: #FF4E50;
    color: white;
    border-radius: 40px;
    font-size: 15px;
    font-family: var(--font-josefin-sans);
    cursor: pointer;
}

.group-info {
    display: flex;
    flex-direction: row;
    text-align: left;
    position: relative;
    gap: 40px;
    left: -20px;
}

.profile-details {

    flex-direction: column;
    text-align: left;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Creates 2 columns */
    grid-template-rows: repeat(4, auto); /* Each row's height will be determined by its content */
    gap: 20px;
    
}

.grouparray {
    position: relative;
    top: 30px;
    flex-direction: row;
    align-items: left;
}

button {
    width: 130px;
    height: 50px;
    
}

.header {
    font-size:30px;
    font-family: var(--font-yeseva-one);
    position:relative;
    top:20px;
    left: 0px;
}

.header-profile {
    font-size: 30px;
    font-family: var(--font-yeseva-one);
}

.profile-info {
    position: relative;
    font-size: 25px;
    font-family: var(--font-josefin-sans);
    margin-left: 25px;
    top: 10px
}

.name-and-username {
    display: flex; 
    align-items: center;
    gap: 80px;
    margin-left: 10px;
}

h4 {
    font-size: 1.5rem;
    color: #ada6a6;
    margin-bottom: 1rem;
    font-style:italic;
    font-weight: lighter;
    position: relative;
    top: -30px;
    font-family: var(--font-josefin-sans);
}

p {
    font-family: var(--font-josefin-sans);
}

.major-profileDescription {
    position: relative;
    top: -20px;
    margin-left: 10px;
}

h3 {
    font-family: var(--font-josefin-sans);
    color: #ADA6A6;
    font-size: 22px;
    position: relative;
    top:-30px;
    font-size: 30px;
    
}

.right-section {
    width: 60%;
    text-align: left;
    padding-left: 80px;

    
}

.right-section h2 {
    font-size: 60px;
    color: #525fe1;

}

.right-section h3 {
    color: #555;
    margin-bottom: 1rem;
}

.right-section p, .right-section div {
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.post-section {
    width: 100%;
    text-align: left;
    font-size: var(--font-size-xl);
    color: var(--color-black);
    font-family: var(--font-josefin-sans);
    margin-top: 3rem; 
}

.post-header {
    font-size: var(--font-size-29xl);
    font-family: var(--font-yeseva-one);
    margin-bottom: 2rem;

}

.post1, .post2 {
    width: 23.69rem;
    height: 8.69rem;
    margin-bottom: 2rem;
  }

  .comments {
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    width: 100%;
  }
  .div2 {
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
  }
  .likes {
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    width: 100%;
  }
  .post-title {
    top: 43.88%;
    left: 0%;
    font-weight: bold;
  }
  .post-user-image {
    height: 30.94%;
    width: 11.35%;
    top: 0%;
    right: 88.65%;
    bottom: 69.06%;
    left: 0%;
    border-radius: 50%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .user-name {
    top: 5.04%;
    left: 14.78%;
    font-weight: 500;
  }

  .post-date {
    top: 5.04%;
    left: 59.63%;
    font-weight: 500;
  }
  .post-content {
    margin: 0;
  }
  .post-content-container {
    top: 71.22%;
    left: 0%;
    font-weight: 300;
  }

  .post-divider-line {
    height: 4.83%;
    width: 280%;
    bottom: -30%;
    right: 27.29%;
    left: -1%;
    border-bottom: 1px solid var(--color-black);
    box-sizing: border-box;
  }


</style>
