<template>
  <div class="home-profiles-page">
    <homeBanner />
       
    <div class = "bottom-half">


        <div class="discover-header">
            <h1 id = "study-buddy-header">Find your StudyBuddy today!</h1>
            <h2 id = "profiles-and-groups">Profiles and Groups for you to discover</h2>
            <div id="app">
              <input id="search-input" type="text" placeholder="Search using Keywords: BT3103/ Business Analytics">
              <img class="search-icon" alt="" src="../assets/search.png" />

            
          
            </div>
            
        </div>

      <div class = "display-of-profiles-and-groups">
        
        <button class="profiles">Profiles</button>
        <button class="groups" @click="navigateToGroups">Groups</button>
        
      
      </div>
 
        <div class = "display-all-profile-cards">
            <div class="profile-card" v-for="profile in profiles" :key="profile.name" @click ="navigateToProfile(profile.name)">
       
             <!-- <img class="profile-image-on-card" src="../assets/profile_picture.jpg" alt="">-->
              <img class="profile-image-on-card" :src="profile.profilePicture" alt=""> 
          
              <h1 id = "profile-name" >{{ profile.name }}</h1>
              <h3 id = "profile-major-and-year">{{profile.major}}, Year {{profile.yearOfStudy}}</h3>
              <h3 id = "profile-description">{{profile.description}}</h3> 
            </div>

      
        </div>


      </div> 
    </div>
  
</template>



<script>
import { ref, defineComponent, onMounted } from 'vue';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import firebaseApp from '../firebase.js';
import homeBanner from '../components/homeBanner.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'vue-router';
import router from '../router/index.js';
import defaultProfilePicture from '../assets/default-profile-image.jpg';

export default defineComponent({
  name: 'Home',

  components: {
    homeBanner,

  },

  setup() {
    const profiles = ref([]);
    const user = ref(null);
    const uid = ref('');
    const profilePicture = ref('');
    const firstName = ref('');
    const router = useRouter();

    onMounted(() => {
      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser;
          
          // Fetch user's first name and profile picture from the database
          const db = getFirestore(firebaseApp);
          const userDocRef = doc(db, 'Users', firebaseUser.uid);
          try {
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
              const userData = userDoc.data();
              firstName.value = userData.firstName ;
              profilePicture.value = userData.profilePicture ;
            } else {
              console.log('User document does not exist!');
            }
          } catch (error) {
            console.error('Error fetching user document:', error);
          }
        } else {
          user.value = null;
        }
      });
      fetchProfilesFromFirebase();
    });

    const navigateToGroups = () => {
     
      router.push({ name: 'HomeGroups' });

    };

    const navigateToProfile = (profileName) => {
      router.push({ name: 'profile', params: { name: profileName }});

    };

    const fetchProfilesFromFirebase = async () => {
      const db = getFirestore(firebaseApp);
      const usersCollection = collection(db, 'Users');
      try {
        const querySnapshot = await getDocs(usersCollection);
        const profilesArray = [];
        
        querySnapshot.forEach((doc) => {
          const profileData = doc.data();
          const auth = getAuth();
          const firebaseUser = auth.currentUser;

          // modifying the display name
          let displayName;
            if (firebaseUser) {
              if (profileData.firstName == null && profileData.lastName == null) { 
                displayName = profileData.name; // name displayed will be their gmail account name unless they update it in the edit profile page
              } else {
                displayName = profileData.firstName + " " + profileData.lastName;
              }
                
            } 

          // modifying the year of study
          const yearOfStudy = profileData.yearOfStudy ? String(profileData.yearOfStudy).match(/\d+/)[0] : 'Unknown';
          const year = yearOfStudy[0];

          //modifying picture
          let profilePicture = profileData.profilePicture;
      
          if (!profilePicture) {
            // If profilePicture is not available in Firestore, 
            // you might want to fetch it from Firebase Authentication
            // This is a simplified example; you might need to adjust based on your app's structure
            
            if (firebaseUser) {
              profilePicture = profileData.photoURL;
            }
          }


          profilesArray.push({
            name: displayName,
            major: profileData.major,
            yearOfStudy: yearOfStudy,
            description: profileData.description,
            profilePicture: profileData.profilePicture || defaultProfilePicture,
          });
        });


        profiles.value = profilesArray;
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    return {
      profiles,
      user,
      uid,
      profilePicture,
      firstName,
      navigateToGroups,
      navigateToProfile,
    };
  },
});
</script>






<style scoped>

.home-profiles-page { 
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

  

 

 


.groups:hover {
    background-color: #f6f3f3;
}

  .routers {
    color: white;
    font-family: sans-serif;
  }


  
  
  .log-out {
    position: absolute;
    top: 4.7rem;
    left: 78rem;
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    width: 8rem;
    height: 2.4rem;
    background-color: #f86f03;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
  }

  .profile {
    position: absolute;
    top: 5.13rem;
    left: 67.38rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem; 
    
  }

  .chats {
    position: absolute;
    top: 5.13rem;
    left: 59rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem;
  }

  .posts {
    position: absolute;
    top: 5.13rem;
    left: 50.63rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem;
  }

  .home {
    position: absolute;
    top: 5.25rem;
    left: 43.38rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem;
  }

 


 

  .studybuddy {
    position: absolute;
    top: 4rem;
    left: 1rem;
    font-size: 3rem;
    display: inline-block;
    width: 25rem;
    height: 2.5rem;
    color: white;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  }



 
  



 

  #study-buddy-header {
    font-family: 'Yeseva One';
    font-size: 3rem; 
    color: black; 
    text-align: center;
    width:100%;
    margin: 0;
    padding: 0;
 
  }

  .discover-header {
    position: absolute; 
    width: 100%;
    text-align: left;
    height: 40rem;
    top: 44rem;
    margin: 0;
    padding: 0;
    
  }

  #profiles-and-groups {
    font-family: 'Yeseva One';
    font-size:1.5rem;
    margin-top: 4rem;
    text-align: center;
    color: darkgray;
    
 
  }
 


#search-input {
    width: 50%;
    padding: 1rem 1rem;
    margin-right: 1rem;
  
    border: 0.01rem solid transparent;
    border-bottom: 0.01rem solid #575756;
    padding-bottom: 0.01rem;
    border-radius: 0;
    background-color: transparent;
    transition: border-color 0.3s;
    font-size: 1.3rem;
    line-height: 3rem;
    color: #575756; 
    font-style: italic;
}


#app {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    align-items: center; 
    padding-top: 0rem; 
    
    
}
 
 

.search-icon {
  position: absolute;
  top: 10.1em;
  left: 68rem; 
  transform: translateY(-50%);
  cursor: pointer; 
  width: 1.5rem;
  height: 1.5rem; 
}



 .display-of-profiles-and-groups {
    position: absolute; 
    width: 100%;
    text-align: left;
    height: 40rem;
    top: 60rem;
    margin: 0;
    padding: 0; 
    
  }
 

 
  .profiles {
    position: absolute;
    left: 32rem;
    font-weight: 600;
    font-size: 1.3rem;
    display: inline-block;
    width: 11rem;
    height: 3.4rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
  }

 

  .groups {
    position: absolute;
    left: 52rem;
    font-weight: 600;
    font-size: 1.3rem;
    display: inline-block;
    width: 11rem;
    height: 3.4rem;
    border: 2px solid #525fe1;
    background-color: transparent;
    color: #525fe1;
    border-radius: 2rem;
    cursor: pointer;
    

}


 .display-all-profile-cards {
    position: absolute; 
    width: 100%;
    text-align: center;
    top: 67rem;
    margin: 0 5rem;   
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 20px;
    box-sizing: border-box;  

 
    
  }

  

  .profile-card {
    flex-basis: calc(22% - 20px);  
    width: 18rem;
    margin: 0.9rem;  
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 1.3rem;
    margin-bottom: 40px;
    cursor: pointer;
     
   
 
  
}

.profile-card:hover {
    background-color:#525fe1;
    box-shadow: 10px 10px 20px 11px rgba(33,33,33,.2); 
    color: white;
    transition: ease-in-out 0.3s;
}

.profile-card:hover h1,
.profile-card:hover h3 {
    color: #ffffff !important; /* Set text color to white */
    transition: color 0.3s; /* Smooth transition for text color change */
}


.profile-image-on-card {
    width: 85%;
    height: 11.4rem; 
    object-fit: cover; 
    margin: 1.5rem 0;  
    border-radius: 0.7rem;
    margin-top: 1.5rem;
}

     
#profile-name {
    font-size: 1.5rem;  
    width:100%;
    margin: 0px; 
    
    
}

#profile-major-and-year {
    font-size: 1rem;
    margin: 0.7rem;
    width: 100%;
    text-align: center;  
    color: #525fe1; 
    
}

#profile-description {
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding:0.9rem; 
 
    
}
 
 
 


 

</style>
