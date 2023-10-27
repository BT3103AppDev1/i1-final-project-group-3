<template>
    <div class="looking-at-profile-page">
       <div class = "navigation"> 
          <NavigationBar/>
       </div>

    <div class ="profile-section">
        <div class="left-section">
            <!-- Dynamic Image -->
            <img class="profile-image" alt = "Profile Picture" src="profilePicture" />
            
            <!-- Action buttons -->
            <div class="buttons-container">
                <button class="message">Send a Message</button>
                <button class="block">Block</button>
            </div>

            <div class="groupInfo">
                <p class="header">Current Group:</p> 
                <div class="grouparray">
                    {{  currentGroup }}
                </div>
            </div>
        </div>
        <div class="right-section">
            
            <h2>{{  profile.name }}<span>{{ profile.name.split(' ').join('_').toLowerCase() }}</span></h2>
            <h3>{{ profile.major }}. Year {{  profile.yearOfStudy }}</h3>
            <p>{{ profile.description }}</p>
            <div class="email">Email: {{  profile.email }}</div>


            <div class="courses">
                <p class="header">Study Style:</p>
                <ul>
                    <li v-for="course in profile.currentCourses" :key="course">{{ course }}</li>
                </ul>
            </div>

            <div class="study-style">
                <p class="header">Study Style:</p> 
                <div class="grouparray">
                    {{ profile.studyStyle }}
                </div>
                
            </div>

            <div class="preference">
                <p class="header">StudyBuddy preference:</p> 
                <div class="grouparray">
                    {{ profile.preference }}
                </div>
                
            </div>
        </div>
    </div>
    </div>
</template>
  

<script>  
import { defineComponent } from "vue";
import NavigationBar from '@/components/NavigationBar.vue';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';

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
            currentGroup: '' // Name or details of the current group
        };
    },

    methods: {
        async fetchUserProfile(profileName) {
            try {
                const db = getFirestore(firebaseApp);
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
    }
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

button {
    width: 130px;
    height: 50px;
    
}

.header {
    
    font-size:24px;
    font-family: var(--font-yeseva-one);
    
}

.right-section {
    width: 60%;
}

.right-section h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.right-section h2 span {
    font-size: 1.2rem;
    color: #555;
    margin-left: 0.5rem;
}

.right-section h3 {
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 1rem;
}

.right-section p, .right-section div {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.5;
}

.right-section strong {
    font-weight: bold;
}

</style>

