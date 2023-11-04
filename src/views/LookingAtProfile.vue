<template>
    <div class="looking-at-profile-page">
       <div class = "navigation"> 
          <NavigationBar/>
       </div>

    <div class ="profile-section">
        <div class="left-section">
            <!-- Dynamic Image -->
            <img class="profile-image" alt = "Profile Picture" src="../assets/about-icon.png" />
            
            <!-- Action buttons -->
            <div class="buttons-container">
                <button class="message" @click="openUploadMessageDialog">Send a Message</button>
                <button class="block" @click="openUploadBlockDialog">Block</button>
            </div>

            <div class="group-info">
                <p class="header" id="current-group">Current Group:</p> 
                <div class="grouparray">
                    <li>abcdefghijk</li>
                    <li>abc</li>
                    <li>abc</li>
                   <!--- 
                        {{  currentGroup }}
                     --->
                </div>
            </div>
        </div>

        <div class="right-section">
            
            <!--- 
                <h2>{{  profile.name }}<span>{{ profile.name.split(' ').join('_').toLowerCase() }}</span></h2> 
            -->
            <div class="name-and-username">
                <h2>abcdefghi</h2>
                <h4>@hello</h4>
            </div>

            <div class="major-profileDescription">
                <!---
                    <h3>{{ profile.major }}, Year {{  profile.yearOfStudy }}</h3>
                    <p>{{ profile.description }}</p>
                    
                --->

                <h4>Data Science and analy, Year 3</h4>
                <h3>hello abcdefhgh</h3>

                

            </div>

            <div class="profile-details">

                <p class="header-profile">Email:</p>
                <p class="profile-info" >shoppingtraining@gmail.com</p>
                    <!--- {{  profile.email }} ---> 


                <p class="header-profile">Study Style:</p>

                <div id="course-list" class="profile-info">
                    <li>bt123231</li>
                    <li>bt123231</li>
                    <li>bt123231</li>
                    <li>bt123231</li>
                    <li>bt123231</li>
                    <li>bt123231</li>
                    

                    <!---
                    <ul>
                        <li v-for="course in profile.currentCourses" :key="course">{{ course }}</li>
                    </ul>
                    --->
                </div>
                



                <p class="header-profile">Study Style:</p> 
                <!---
                    <div class="grouparray">
                    {{ profile.studyStyle }}
                </div>
                    --->
                <p class="profile-info">hello testing</p>
                
                    

                <p class="header-profile">StudyBuddy preference:</p> 
                <!---
                <div class="grouparray">
                    {{ profile.preference }}
                </div>
                --->
                <p class="profile-info">motivated lah blahetc.motivated lah blahetc.motivated lah blahetc.motivated lah blahetc.</p>

                    

            </div>
            
            
            
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
import { defineComponent } from "vue";
import NavigationBar from '@/components/NavigationBar.vue';
import { doc, getDoc, getFirestore, setDoc, addDoc, serverTimestamp, collection } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';
import { getAuth } from 'firebase/auth';


const db = getFirestore(firebaseApp);
const auth = getAuth();


export default defineComponent({
    name: "profile",
    
    components: {
      NavigationBar
    },

    data() {
        return {
            profile: {
                name: '',
                major: '',
                yearOfStudy: '',
                description: '', 
                email: '',
                currentCourses: [],
                studyStyle: '',
                preference: ''
            },
            profilePicture: '', // URL of the profile picture
            currentGroup: '', // Name or details of the current group
            showMessageDialog: false,
            showBlockDialog: false, 
            messageText: '',
        };
    },

    methods: {

        // message dialog
        openUploadMessageDialog() {
            this.showMessageDialog = true;
            console.log("true")
            document.addEventListener("click", this.closeMessageDialogOnClickOutside);
            event.stopPropagation();

        },
        closeMessageDialog() {
            this.showMessageDialog = false;
            document.removeEventListener("click", this.closeMessageDialogOnClickOutside);
        },

        closeMessageDialogOnClickOutside(event) {
                console.log("false")
            // Check if the click event occurred outside of the popup
            const popup = this.$refs.messageDialog;
            if (popup && !popup.contains(event.target)) {
                this.closeMessageDialog();
            }
        },

        // block dialog
        openUploadBlockDialog() {
            this.showBlockDialog = true;
            console.log("true")
            document.addEventListener("click", this.closeBlockDialogOnClickOutside);
            event.stopPropagation();

        },
        closeBlockDialog() {
            this.showBlockDialog = false;
            document.removeEventListener("click", this.closeBlockDialogOnClickOutside);
        },

        closeBlockDialogOnClickOutside(event) {
                console.log("false")
            // Check if the click event occurred outside of the popup
            const popup = this.$refs.blockDialog;
            if (popup && !popup.contains(event.target)) {
                this.closeBlockDialog();
            }
        },

         sendMessage(receiverUID, receiverName) {
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
        },

        async createMessageDocument(docID, senderUID, receiverUID, senderName, receiverName) {
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
        },

        async addMessageToList(docID, senderUID, receiverUID, senderName, receiverName, messageContent) {
            const msgListRef = collection(db, 'Message', docID, 'msglist');
            await addDoc(msgListRef, {
                senderUID,
                receiverUID,
                senderName,
                receiverName,
                message: messageContent,
                timestamp: serverTimestamp(),
            });
        },





        async fetchUserProfile(profileName) {
            try {
                
                const userDoc = doc(db, "Users", profileName);
                const userProfile = await getDoc(userDoc);
                if (userProfile.exists()) {
                    this.profile = userProfile.data();
                    this.profilePicture = this.profile.profilePictureUrl || '../assets/about-icon.png'; // Set to default picture if not provided
                    this.currentGroup = this.profile.currentGroup || 'No current group'; // Set to a default value if not provided
                } else {
                    console.error("User not found!");
                }
            } catch (error) {
                console.error("Error fetching user profile: ", error);
            }
        }
    },
    

    mounted() {
        const profileName = this.$route.params.name;
        this.fetchUserProfile(profileName);
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
    position: fixed;
    font-size: var(--font-size-lg);
    color: var(--color-black);
    font-family: var(--font-inter);
}
  
.navigation {
    position: absolute;
    background-color: #525fe1;
    width: 100%;
    height: 10rem;
}

.profile-section {
    display: flex;
    justify-content: center;
    padding: 2rem;
    margin-top: 15rem;  /* Adjusting for the navigation height */
}

.left-section {
    width: 30%;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    position: relative;
    top: -100px;
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


</style>

