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
