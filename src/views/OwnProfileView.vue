<template>
  <NavigationBar/>
  <div class="posts-format">

    
    <button class="editprofilebutton" @click="navigateToEditProfile">Edit Profile</button>

    <div class="own-profile-page-body">
      <div id="fullname" class="users-name" v-if="user">name</div>
      <img :src="uploadedImage || defaultImage" class="profilepicture-icon" alt="Profile Picture"/>
      <div id="post-content" class="tabcontent" style="display: block;">
      
        
        <div class="post-list">
          <div v-for="post in posts" :key="post.id" class="post">
            <div class="post-rectangle-border" />
              <div class="post-content-container">
                <p class="post-header-tag">
                <b class="post-title" style="font-weight: bold;">{{ post.header }}</b>
                </p>
                <p class="post-header-tag">
                <b>&nbsp;</b>
                </p>
                <p class="post-header-tag">
                <span>{{ post.description }}</span>
                </p>
              </div>
            <button class="edit-button" @click="navigateToEditPost(post.id)"></button>
            <button class="delete-button" type="button" @click="removeUserPost(post.id), removeFromPost(post.id)"></button>
          </div>
        </div>

        
      </div>

      <div class="about-description-format">
        <div id="about-content" class="tabcontent">
          <div class="basic-information-header">BASIC INFORMATION</div>
          <div class="academic-information-header">ACADEMIC INFORMATION</div>
          
          <div class="basic-information-container">
            <p class="basic-information" id="gender">Gender: Female</p>
            <p class="basic-information" id="email">Email: test@gmail.com</p>
            <p class="basic-information" id="phoneNumber">Phone number: +65 8123 4567</p>
          </div>
          <div class="academic-container">
            <p class="basic-information" id="major">Major: Business Analytics</p>
            <p class="basic-information" id="year">Year: 2</p>
            <p class="basic-information" id="description">
              Description: Hi, I aspire to become a business analyst once I graduate.
              I am an enthusiastic, self-motivated and hardworking person.
            </p>
            <p class="basic-information" id="currentCourse">
              Current course: BT3103, IS3103, GEN2004, ST2334, CS2040
            </p>
          </div>
        </div>
      </div>
      <div id="group-content" class="tabcontent">
        <div v-for="group in activeGroups" :key="group.id" class="group-format">
          <b class="group-name">Group: {{ group.name }}</b>
          <div class="group-description">{{ group.description }}</div>

        </div>
      </div>
  
    <hr>

    <div class="tabs">
      <button id="posts-tab" class= "tablinks" v-on:click="openSection(event, 'post-content')"> Posts
          <img class="post-icon" alt="" src="../assets/post-icon.png" />
      </button>
      
      <button id="about-tab" class= "tablinks" v-on:click="openSection(event, 'about-content')">About
          <img
          class="about-icon"
          alt=""
          src="../assets/about-icon.png"
          />
      </button>
      <button id="groups-tab" class= "tablinks" v-on:click="openSection(event, 'group-content')">Groups
          <img
          class="groups-icon"
          alt=""
          src="../assets/groups-icon.png"
          />
      </button>

    </div>
  </div>
    
  </div>

  
</template>
<script>
  import NavigationBar from '@/components/NavigationBar.vue'
  import { getAuth, onAuthStateChanged } from '@firebase/auth'
  import { doc, collection, getFirestore, getDoc, getDocs, deleteDoc, query, orderBy } from '@firebase/firestore'
  import firebaseApp from '../firebase';
  import defaultImage from '../assets/default-profile-image.jpg';


  const db = getFirestore(firebaseApp)

  export default { 
    name: "OwnProfile",
    components: {
      NavigationBar
    },
    data() {
       return {
          user:false,
          useremail:'',
          uid: '',
          uploadedImage: false,
          defaultImage: defaultImage,
          posts: [],
          activeGroups: [],
       }
    },
    
    async mounted() {
       const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
         if (user) {
           this.user = user;
           this.useremail = user.email;
           this.uid = user.uid;
           this.fetchUserData(this.useremail);
           this.fetchUserPosts(this.useremail);
           this.fetchGroups();
         } else {
           this.user = null;
           this.useremail = null;
         }
       })

     },

    methods: {
      async fetchUserData(useremail) {
        let userDocument = await getDoc(doc(db, "Users",this.uid));
        let userData = userDocument.data();
        let firstName = (userData.firstName)
        let lastName = (userData.lastName)

        let gender = (userData.gender)
        let major = (userData.major)
        let email = (userData.email)
        let description = (userData.description)
        let phoneNumber = (userData.phoneNumber)
        let yearOfStudy = (userData.yearOfStudy)
        let currentCourse = (userData.currentCourses)
        //modifying picture
        let profilePicture = (userData.photoURL)

        if (userData.profilePicture) {
            this.uploadedImage = userData.profilePicture;
          } else {
            console.log('Profile picture not found in user data');
        }
      
        document.getElementById("fullname").innerHTML = (String(firstName) + " " + String(lastName));
        document.getElementById("email").innerHTML = ("Email: " + String(email))
        document.getElementById("gender").innerHTML = ("Gender: " + String(gender))
        document.getElementById("phoneNumber").innerHTML = ("Phone Number: " + String(phoneNumber))
        document.getElementById("major").innerHTML = ("Major: " + String(major))
        document.getElementById("year").innerHTML = ("Year: " + String(yearOfStudy))
        document.getElementById("description").innerHTML = ("Description: " + String(description))
        document.getElementById("currentCourse").innerHTML = ("Current Courses: " + String(currentCourse))



      }, 

      async fetchGroups() {
        try {
          // Get the user's activeGroups array
          const userRef = doc(db, 'Users', this.uid);
          const userSnap = await getDoc(userRef);
          const userGroups = userSnap.data().activeGroups;

          // Clear the existing groups before fetching new ones
          this.activeGroups = [];

          // Fetch details for each group
          for (const groupId of userGroups) {
            const groupRef = doc(db, 'Groups', groupId);
            const groupSnap = await getDoc(groupRef);

            if (groupSnap.exists()) {
              // Add the group details to the activeGroups array
              this.activeGroups.push({
                id: groupId,
                name: groupSnap.data().title,          // Assuming 'title' is the field for the group name
                description: groupSnap.data().groupDescription, // Assuming 'groupDescription' is the field for the group description
              });
            } else {
              console.error(`Group ${groupId} does not exist`);
            }
          }
        } catch (error) {
          console.error("Error fetching groups:", error);
        }
      },

      async fetchUserPosts(useremail) {
        try {
          const db = getFirestore(firebaseApp)
          // const postsSnapshot = await getDocs(collection(db, 'Users', this.uid, "Posts"));

          // Get a reference to the "Posts" collection
          const postsRef = collection(db, 'Users', this.uid, "Posts");

          // Create a query to order the posts by date
          const postQuery = query(postsRef, orderBy('overallPostIndex', 'desc')); // Replace 'date' with the actual date field in your documents

          const postsSnapshot = await getDocs(postQuery);

          postsSnapshot.docs.map( (document) => {
            let post = document.data();
            post.id = document.id;
            this.posts.push(post);
            
          });

        } catch (error) {
          console.error("Error fetching posts: ", error);
        }
      },

      async removeUserPost(documentId) {
        if (this.uid) {
          try {
            
            // Delete the document
            deleteDoc(doc(db,"Users",this.uid,"Posts",documentId)).then(() => {
              console.log("Data deleted successfully");

              // Reload the page
              location.reload();
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });

          } catch (error) {
            console.error('Error deleting document:', error);
          }
        } else {
          console.log('User not signed in');
        }
    },

    async removeFromPost(documentId) {
        if (this.uid) {
          try {
            // Delete the document
            deleteDoc(doc(db,"Posts", documentId)).then(() => {
              console.log("Data deleted successfully");

              // Reload the page
              location.reload();
            })
            .catch((error) => {
              console.error("Error deleting data:", error);
            });

          } catch (error) {
            console.error('Error deleting document:', error);
          }
        } else {
          console.log('User not signed in');
        }
    },
      
    openSection(evt, section) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(section).style.display = "block";
        if (evt && evt.currentTarget) {
          evt.currentTarget.classList.add("active");
        }
      },

      navigateToEditProfile() {
        this.$router.push({ name: 'EditProfile' });
      },

      navigateToEditPost(postId) {
        this.$router.push({ name: 'EditPost', params: { postId: postId } });
      }


  }
}
</script>


<style scoped>
  .users-name {
    position: absolute;
    top: 299px;
    left: 379px;
    font-size: var(--font-size-41xl);
    font-family: var(--font-yeseva-one);
    color: var(--color-mediumslateblue);
    display: inline-block;
    width: 36vw;
    height: 8vh;
    mix-blend-mode: normal
  }
  
    .editprofilebutton {
        position: absolute;
        top: 216px;
        left: 1200px;
        width: 203px;
        height: 63px;
        text-align: center;
        display: inline-block;
        font-weight: 600;
        font-size: var(--font-size-6xl);
        font-family: var(--font-josefin-sans);
        color: var(--color-white);
        border-radius: var(--br-21xl);
        background-color: var(--color-mediumslateblue);
        border: 1px solid var(--color-mediumslateblue);
        cursor:pointer;
    }
    .editprofilebutton:active {
    background-color:#757ddb;
    border: 1px solid #757ddb;
    }

  .profilepicture-icon {
    position: absolute;
    border-radius: 50%;
    top: 216px;
    left: 89px;
    width: 251px;
    height: 237px;
    object-fit: cover;
  }

  .post-rectangle-border {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-4xs);
    background-color: var(--color-gray-200);
    border: 1px solid var(--color-darkgray);
    box-sizing: border-box;
    width: 950px;
    height: 154px;
  }
  .post-header-tag {
    margin: 0;
  }
  .post-content-container {
    position: absolute;
    top: 25px;
    left: 25.76px;
    display: inline-block;
    width: 822.26px;
    height: 115px;
  }
  .edit-icon{
    height: 32px;
    max-width: 100%;
  }
  .edit-button {
    background-image: url('../assets/edit-icon.png');
    background-size: cover;
    border:none;
    cursor:pointer;
    position: absolute;
    top: 25px;
    left: 851px;
    height: 32px;
    object-fit: cover;
    max-width: 100%;
    width: 30px; /* Set the width and height according to your image */
    height: 30px;
    background-color: transparent;

  }
  .delete-button {
    background-image: url("../assets/delete-icon.png");
    background-size: cover;
    position: absolute;
    cursor:pointer;
    top: 25px;
    left: 896px;
    height: 33px;
    object-fit: cover;
    max-width: 100%;
    width: 30px; /* Set the width and height according to your image */
    height: 30px;
    border:none;
    background-color: transparent;

  }
  .post {
    position: relative;
    top: 380px;
    left: 387px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 950px;
    height: 154px;
    color: var(--color-black);
    margin-bottom: 20px;
  }

  hr {
    position: absolute;
    top: 501px;
    left: 387px;
    width: 950px;
    border: 1px solid black;
  }
  .post-icon {
    position: absolute;
    top: 8px;
    left: -3px;
    width: 35px;
    height: 35px;
    object-fit: cover;
  }
  #posts-tab {
    position: absolute;
    display: inline-block;
    top: 3px;
    left: 0px;
    width: 116px;
    height: 32px;
    color: var(--color-black);
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-lgi);
    font-family: var(--font-inter);
  }

  .bold {
    font-weight: bold; /* When the button is clicked, make the text bold */
}

  .about-icon {
    position: absolute;
    top: 5px;
    left: -15px;
    width: 28.9px;
    height: 32px;
    object-fit: cover;
  }
  #about-tab {
    position: absolute;
    top: 3px;
    left: 148px;
    width: 94px;
    height: 32px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-lgi);
    font-family: var(--font-inter);
  }
  .groups-icon {
    position: absolute;
    top: 5px;
    left: -15px;
    width: 40px;
    height: 37px;
    object-fit: cover;
  }
  #groups-tab {
    position: absolute;
    top: 3px;
    left: 281px;
    width: 126px;
    height: 37px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-lgi);
    font-family: var(--font-inter);
  }
  .tabs {
    position: absolute;
    top: 438px;
    left:50px;
    width: 392px;
    height: 37px;
    font-size: var(--font-size-lgi);
    color: var(--color-silver);
  }


.tabs button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}


.tablinks:hover {
  color: #ddd;
}

.tablinks:focus {
  font-weight: bold;
}

.tabcontent {
  display: none;
  border-top: none;
}

  .about-description-format {
    text-align: left;
    font-size: var(--font-size-xl);
    color: var(--color-black);
    font-family: var(--font-inter);
  }
  
  .posts-format {
    background-color: var(--color-white);
    text-align: left;
    font-size: var(--font-size-lg);
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .basic-information {
    margin-block-start: 0;
    margin-block-end: 8px;
  }

  .basic-information-container {
    position: absolute;
    top: 581px;
    left: 390px;
    display: inline-block;
    width: 723px;
  }
  .academic-container {
    position: absolute;
    top: 755px;
    left: 390px;
    display: inline-block;
    width: 821px;
  }
  .basic-information-header {
    position: absolute;
    top: 538px;
    left: 390px;
    font-size: var(--font-size-lg);
    color: var(--color-darkgray);
  }
  .academic-information-header {
    position: absolute;
    top: 712px;
    left: 390px;
    font-size: var(--font-size-lg);
    color: var(--color-darkgray);
  }
  .group-format {
    position: relative;
    color: var(--color-black);
    margin-bottom: 20px;
  }

  #group-content {
    position: relative;
    top: 370px;
    left: 400px;

    color: var(--color-black);
    margin-bottom: 20px;
  }

  .group-name {
    font-size: 35px;
    font-family: var(--font-josefin-sans);
    font-weight: 600;
  }

  .group-description {
    font-size: 20px;
    color: var(--color-darkgray);
    margin-top: 10px;
    font-weight: lighter
  }


</style>

