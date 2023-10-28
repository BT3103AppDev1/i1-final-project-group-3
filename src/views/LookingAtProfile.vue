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

            <div class="profile-info">

                <p class="header">Email:</p>
                <p>gmail.com</p>
                    <!--- {{  profile.email }} ---> 


                <p class="header">Study Style:</p>

                <div class="course-list">
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
                



                <p class="header">Study Style:</p> 
                <!---
                    <div class="grouparray">
                    {{ profile.studyStyle }}
                </div>
                    --->
                <p>motivated etc.</p>
                
                    

                <p class="header">StudyBuddy preference:</p> 
                <!---
                <div class="grouparray">
                    {{ profile.preference }}
                </div>
                --->
                <p>motivated etc.</p>

                    

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
    gap: 40px;
}

.profile-info {
    display: grid;
    flex-direction: column;
    text-align: left;

    grid-template-columns: repeat(2, 1fr); /* Creates 2 columns */
    grid-template-rows: repeat(4, 1fr); /* Creates 4 rows */
    gap: 30px; 
}

.grouparray {
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

