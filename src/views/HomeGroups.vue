<template>
  <div class="home-profiles-page">
     <homeBanner />
       
    <div class = "bottom-half">


        <div class="discover-header">
            <h1 id = "study-buddy-header">Find your StudyBuddy today!</h1>
            <h2 id = "profiles-and-groups">Profiles and Groups for you to discover</h2>
            
            <div id="app">
                <input id="search-input" type="text" v-model="searchQuery" placeholder="Search using Keywords: BT3103/ Business Analytics">
                <img class="search-icon"  @click="search" alt = "" src="../assets/search.png" />
            
            </div>
            
        </div>

      <div class = "display-of-profiles-and-groups">
        
        <button class="profiles" @click="navigateToProfiles">Profiles</button>
        <button class="groups">Groups</button>
 
          <h3 id="create-group-here">
            <em>Can't find a group? Click <span class="clickHere" @click="showCreateGroupForm">HERE</span> to create one</em>
          </h3>
          <CreateGroups v-if="isCreateGroupFormVisible" @create-group="handleCreateGroup" @close-form = "closeCreateGroupForm" />

 
        
      
      </div>

 
        <div class = "display-all-group-cards">
          <div class="group-card" v-for="group in groups" :key="group.title"> 

            <h1 id = "group-name">{{ group.title }}</h1>
            <h3 id = "group-vacancy">Vacancy: {{group.count}}/{{group.members}}members</h3>
            <h3 id = "group-description">{{group.description}}</h3> 
            <button
              id="join-group"
              @click="!group.isMember && !group.isFull && joingroup(group.id)"
              :class="{ 'joined': group.isMember, 'full': group.isFull }"
            >
              {{ group.isMember ? 'Joined' : group.isFull ? 'Full' : 'Join' }}
            </button>

 
        </div>
  
      </div>

 
    </div> 
    </div>
  
</template>




<script>
  import { getFirestore, collection, getDocs, addDoc , doc, getDoc, updateDoc, arrayUnion} from "firebase/firestore"
  import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
  import firebaseApp from '../firebase.js';
  import { defineComponent, ref, onMounted, reactive } from "vue";
  import { computed } from 'vue'; 
  import CreateGroups from "../components/CreateGroups.vue";
  import homeBanner from "../components/homeBanner.vue";
  import { get } from "firebase/database";
 
  const db = getFirestore(firebaseApp); 
  const auth = getAuth();


  export default defineComponent({
    name: "HomeGroups",

    components: {
      homeBanner,
      CreateGroups
    },
    
    data() {
        return {
            isCreateGroupFormVisible: false,
            groups: reactive([]),
            groupTitle: "",
            groupDescription: "",
            membersCount: null,
            groupId: '' 
        };
    },

    methods: {
      navigateToProfiles() {
        this.$router.push({ name: 'Home' });
      },

      navigateToCreateGroup() {
        this.$router.push({name: 'CreateGroup'});

      },

      showCreateGroupForm() {
        this.isCreateGroupFormVisible = true;
      },

      closeCreateGroupForm() {
        this.isCreateGroupFormVisible = false;
      },
 

      async handleCreateGroup() {
        console.log("Received data");
        this.isCreateGroupFormVisible = false;
        window.alert("Group successfully created!");
      },

      createGroupFormPopUp() {
        alert("Test");

      },
      

      async joingroup(groupId) {
        // Check if the groupId is not undefined or empty
        if (!groupId) {
          console.error('No group ID provided');
          return;
        }
        
        const db = getFirestore(firebaseApp);
        const user = auth.currentUser;

        // Check if the user is logged in
        if (!user) {
          console.error('User not logged in!');
          return;
        }

        // Reference to the user's document in the 'Users' collection
        const userDocRef = doc(db, 'Users', user.uid);
        
        // Reference to the group's document in the 'Groups' collection
        const groupDocRef = doc(db, 'Groups', groupId);

        try {
          // Fetch the current data of the group
          const groupDoc = await getDoc(groupDocRef);
          
          if (!groupDoc.exists()) {
            console.error('Group does not exist!');
            return;
          }

          // checking if the group can still accept new members
          const groupData = groupDoc.data();
          const maxMembers = groupData.members;
          const currentMembers = groupData.groupMembers.length;
          if (currentMembers >= maxMembers) {
            alert('Group is full! Please create a new group or join another group :)');
            return;
          }
          alert('Successfully joined group!');



          this.groups = this.groups.map(group => {
            if (group.id === groupId) {
              return {
                ...group,
                isMember: true,
                count: group.count + 1,
                isFull: group.count + 1 >= group.members
              };
            }
            return group;
          });


          // Update the 'groupMembers' field of the group
          await updateDoc(groupDocRef, {
            groupMembers: arrayUnion(user.uid)
          });

          // Optionally, also update the 'activeGroups' field of the user's document
          await updateDoc(userDocRef, {
            activeGroups: arrayUnion(groupId)
          });

          console.log('Joined group successfully!');
          location.reload();

          window.location.reload();

        } catch (error) {
          console.error('Error joining group:', error);
        }
      },

    },

 

  setup() {
  const searchQuery = ref('');
  const groups = ref([]);

  const filteredGroups = computed(() => {
    return groups.value.filter(group => {
      const searchRegex = new RegExp(searchQuery.value, 'i');
      return searchRegex.test(group.title) || searchRegex.test(group.description);
    });
  });

  const fetchDataFromFirebase = async (uid) => {
    const db = getFirestore(firebaseApp);
    const usersCollection = collection(db, "Groups");
    const auth = getAuth();
    const user = auth.currentUser; // This line should ensure you have the current user
    
    if (!user) {
      console.error('No user is currently logged in.');
      return; // Exit the function if no user is logged in
    }
    
    try {
      const querySnapshot = await getDocs(usersCollection);
      const fetchedGroups = [];
      querySnapshot.forEach((doc) => {
        const groupData = doc.data();
        const count = groupData.groupMembers.length;
        const isFull = count >= groupData.members;
        const isMember = groupData.groupMembers.includes(user.uid);
        fetchedGroups.push({
          id: doc.id,
          title: groupData.title,
          description: groupData.groupDescription,
          members: groupData.members,
          count: count,
          isFull: isFull,
          isMember: isMember,
        });
      });

      groups.value = fetchedGroups;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      // After setting persistence, you can add the auth state observer
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, now you can fetch the data
          fetchDataFromFirebase(user.uid);
        } else {
          // User is signed out
          console.log('No user is currently logged in.');
        }
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error setting persistence: ${errorCode}`, errorMessage);
    });



  



  onMounted(() => {
    fetchDataFromFirebase();
  });

  return {
    groups: filteredGroups,
    searchQuery,
   
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

  

  .top-container {
    position: absolute;
    background-color: #525fe1;
    width: 100%;
    height: 40rem;
  }
 


  .profile-image {
    position: absolute;
    top: 10.44rem;
    left: 54.81rem;
    border-radius: 50%;
    width: 25rem;
    height: 25rem;
    object-fit: cover;
  }


 


.profiles:hover {
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




  
  .welcome-message {
    position: absolute;
    top: 14.19rem;
    left: 5.56rem;
    font-size: 6.25rem;
    font-family: 'Yeseva One';
    display: inline-block;
    width: 45.06rem;
    height: 15.56rem;
    color: white;
  }

  .subtag {
    position: absolute;
    top: 29.75rem;
    left: 12.19rem;
    font-size: 2rem;
    font-weight: 600;
    display: inline-block;
    width: 31.81rem;
    height: 2.88rem;
    font-family: 'Yeseva One';
    color: white;
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
  left: 72%; 
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
 

 
  .groups {
    position: absolute;
    left: 55%;
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

 

  .profiles {
    position: absolute;
    left: 36%;
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



#create-group-here {
    font-size: 1rem;
    color: #959592; 
    text-align: center;
    margin-top: 5.5rem;
 
    
}

.clickHere {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer; 
}



 .display-all-group-cards {
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


  

  
  .group-card {
    flex-basis: calc(22% - 20px);  
    width: 18rem;
    height: 28rem;
    margin: 0.9rem;  
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 1.3rem;
    margin-bottom: 40px;
    position: relative;

}

.group-card:hover {
    box-shadow: 15px 30px 30px 5px rgba(0, 0, 0, 0.25);
    transition: 0.5s ease-in-out;

}




     
#group-name {
    font-size: 1.5rem;  
    width:100%;
    margin: 0px; 
    margin-top:6rem;
    
    
}

#group-vacancy{
    font-size: 1rem;
    margin: 0.7rem;
    width: 100%;
    text-align: center;  
    color: #525fe1; 
    margin-top:3rem;
    
}

#group-description {
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding:0.9rem; 
    margin-top:1rem;
 
    
}
 
  

#join-group {
    position: absolute;
    text-align: center;
    font-weight: 600;
    font-size: 1.3rem; 
    width: 7rem;
    height: 3rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
    margin-top: 22rem;
 
}
 
 
 


 

</style>
