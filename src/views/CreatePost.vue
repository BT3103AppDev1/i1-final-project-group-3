<template>
  <NavigationBar/>

  <!-- Create post fields -->
  <div class="create-post">
    <div class="new-post">New Post</div>
    <div class="header">Header</div>
    <input v-model="header" class="enter-the-header" id="enter-the-header" placeholder="Enter the header here...">
    
    <!-- Description textarea -->
    <div class="description">Description</div>
    <textarea v-model="description" class="enter-the-description" id= "enter-the-description" placeholder="Enter the description here..."></textarea>
    
    <!-- Cancel and Post buttons -->
    <button class="cancelCreatepost" @click="navigateToPost">Cancel</button>   
    <button type = "submit" id="post-button" @click="submitForm">Post</button>           
  </div>

  <!-- Error dialog -->
  <div class="popup" v-show="showErrorDialog" ref="errorDialog">
    <div class="popup-content">
      <h2>Error: Missing Header / Description </h2>
      <div class="error-popup-bar-line" />
      <div class="action-buttons">
        <button style="width: 10.75rem; height: 2.75rem;" @click="closeErrorDialog">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Confirmation dialog -->
  <div class="popup" v-show="showConfirmationDialog" ref="confirmationDialog">
    <div class="popup-content">
      <h2>Confirmation</h2>
      <div class="popup-bar-line" />
      <h3 style="font-size: 2.19rem; color: var(--color-darkgray-200); font-family: var(--font-josefin-sans); font-weight: 300;">Are you sure you want to publish this post?</h3>
      <div class="action-buttons">
        <button id= "confirmConfirmation" @click="confirmSubmitForm">Confirm</button>
        <button id= "cancelConfirmation" @click="closeConfirmationDialog">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebaseApp from '@/firebase.js';
import { doc, collection, getFirestore, getDoc, updateDoc, addDoc, getDocs, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
    name: "CreatePost",
    data() {
      return {
        showErrorDialog: false,
        showConfirmationDialog:false,
        header: "",
        description: "",
        uid: "",
        user:false,
        likes: "",
        comments: "",
        date: "",
        username: "",
      }
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;      
          this.useremail = user.email;
          this.uid = user.uid;
        } else {
          this.user = null;
          this.useremail = null;
         }
      })
    },
    components: {
      NavigationBar
    },

    methods: {
      // Function to navigate to post page
      navigateToPost() {
        this.$router.push({ name: 'Post' });
      },

      // Function to get the current date
      getCurrentDate() {
        const currentDate = new Date();
        return currentDate;
      },

      // Function to submit form.
      submitForm() {
        // If header or description is empty, error dialog will be shown
        if (!this.header || !this.description) {
          this.showErrorDialog = true;
        } else { // confirmation dialog will be shown
          this.showConfirmationDialog = true;
        }
      },

      async confirmSubmitForm() {
        const db = getFirestore(firebaseApp);
        let uid = this.uid;

        // Get the header and description values from the input fields
        let header = document.getElementById("enter-the-header").value;
        let description = document.getElementById("enter-the-description").value;

        // Initialize variables for post data
        let index = 0;
        let likes = 0;
        let comments = 0;
        try{
          const auth = getAuth();
          const user = auth.currentUser;

          const userDocRef = doc(db, "Users", uid);
          const userDocument = await getDoc(userDocRef);
          const userData = userDocument.data();

          const postCollectionRef = collection(userDocRef, "Posts");

          // Get the documents in the 'Posts' subcollection to determine the user's post index
          const querySnapshot = await getDocs(postCollectionRef);
          const numberOfPosts = querySnapshot.size;
          let username = (userData.firstName) + " " + (userData.lastName);
          
          const allPostCollectionRef = collection(db, "Posts");
          const overallQuerySnapshot = await getDocs(allPostCollectionRef);
          const overallNumberOfPosts = overallQuerySnapshot.size;

          if (user) {
            // Create a new post object with relevant data that will be stored in the firebase
            const newPost = {
              overallPostIndex : overallNumberOfPosts + 1,
              userPostindex : numberOfPosts + 1,
              header: header,
              description: description,
              likes: likes,
              comments: comments,
              date: this.getCurrentDate().toDateString(),
              username: username,
              userid : this.uid,
              datetime: this.getCurrentDate()
            }

            // Add the new post to the user's 'Posts' subcollection
            const postDocRef = await addDoc(postCollectionRef, newPost);

            // Retrieve the document ID of the newly created post to ensure consistent document id for the "Post" collection 
            const docId = postDocRef.id;
            // Set the new post in the 'Posts' collection for all users
            const allPostsRef = await setDoc(doc(db, "Posts", docId), newPost);

            const updatePost = {
              postId : docId
            }
            const updatePostDocRef = await updateDoc(doc(postCollectionRef, docId), updatePost);
            const updateAllPostsRef = await updateDoc(doc(db, "Posts", docId), updatePost);
            
            // Close the confirmation dialog
            this.closeConfirmationDialog()

            // Navigate to the newly created post
            this.navigateToPost()
            console.log('Post created successfully!');
          } else {
            console.error('No user is logged in.');
        }

        }
        catch(error) {
          console.error("Error adding document: ", error);
        }
      },

      openErrorDialog() {
        this.showErrorDialog = true;

        // Add a click event listener to the entire document when the popup is open
        document.addEventListener("click", this.closeErrorDialogOnClickOutside);

        // Prevent the click event on the button from propagating and immediately closing the popup
        event.stopPropagation();
      },

      closeErrorDialog() {
        this.showErrorDialog = false;
        document.removeEventListener("click", this.closeErrorDialogOnClickOutside);
      },

      closeErrorDialogOnClickOutside(event) {
        // Check if the click event occurred outside of the popup
        const popup = this.$refs.errorDialog;
        if (popup && !popup.contains(event.target)) {
          this.closeErrorDialog();
        }
      },

      openConfirmationDialog() {
        this.showConfirmationDialog = true;

        // Add a click event listener to the entire document when the popup is open
        document.addEventListener("click", this.closeConfirmationDialogOnClickOutside);

        // Prevent the click event on the button from propagating and immediately closing the popup
        event.stopPropagation();
      },

      closeConfirmationDialog() {
        this.showConfirmationDialog = false;
        document.removeEventListener("click", this.closeConfirmationDialogOnClickOutside);
      },

      closeConfirmationDialogOnClickOutside(event) {
        // Check if the click event occurred outside of the popup
        const popup = this.$refs.confirmationDialog;
        if (popup && !popup.contains(event.target)) {
          this.closeConfirmationDialog();
        }
      },
    }
}

</script>

<style scoped>
    .create-post {
        background-color: var(--color-white);
        width: 1440px;
        height: 963px;
        text-align: left;
        font-size: var(--font-size-6xl);
        color: var(--color-white);
        font-family: var(--font-josefin-sans);
    }
    .new-post {
        position: absolute;
        top: 187px;
        left: 100px;
        font-size: var(--font-size-29xl);
        font-family: var(--font-yeseva-one);
        color: var(--color-black);
    }
    .header {
    position: absolute;
    top: 301px;
    left: 97px;
    font-size: var(--font-size-5xl);
    color: var(--color-black);
    }

    .enter-the-header {
    position: absolute;
    top: 282px;
    left: 215px;
    box-sizing: border-box;
    width: 1020px;
    height: 55px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 20px;
    font-family: var(--font-josefin-sans);
    padding: 20px;
  }

    .description {
    position: absolute;
    top: 395px;
    left: 56px;
    font-size: var(--font-size-5xl);
    color: var(--color-black);
    }

  .enter-the-description {
    position: absolute;
    top: 366px;
    left: 215px;
    box-sizing: border-box;
    width: 1020px;
    height: 453px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 20px;
    font-family: var(--font-josefin-sans);
    padding: 20px;
  }

  .cancelCreatepost {
    position: absolute;
    top: 877px;
    left: 804px;
    border-radius: var(--br-21xl);
    border: 1px solid var(--color-mediumslateblue);
    box-sizing: border-box;
    width: 172px;
    height: 44px;
    font-family: var(--font-yeseva-one);
    color: var(--color-mediumslateblue);
    text-align: center;
    display: inline-block;
    cursor: pointer;
    font-size: var(--font-size-6xl);
    background-color: white;

  }

  .cancelCreatepost:hover {
    background-color: var(--color-mediumslateblue);
    color: white;
  }

  #post-button {
    position: absolute;
    top: 876px;
    left: 1046px;
    border-radius: var(--br-21xl);
    background-color: var(--color-darkorange);
    width: 172px;
    height: 44px;
    font-family: var(--font-yeseva-one);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: var(--font-size-6xl);
    color: var(--color-white);
    border: 1px solid var(--color-darkorange);
  }

  #post-button:hover {
    background-color: #ffb175;
    border: 1px solid #ffb175;
  }

  #cancelConfirmation {
    position: absolute; 
    top: 15.69rem;
    left: 14.25rem;
    display: inline-block; 
    width: 10.75rem;
    height: 2.75rem;
    border-radius: var(--br-21xl);
    background-color: var(--color-red);
    border: 1px solid var(--color-mediumslateblue);
    box-sizing: border-box;
    font-size: var(--font-size-6xl);
    color: var(--color-mediumslateblue);
  }

  #confirmConfirmation {
    position: absolute;
    top: 15.69rem;
    left: 30rem;
    width: 10.75rem;
    height: 2.75rem;
    font-size: var(--font-size-6xl);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--br-21xl);
    background-color: var(--color-mediumslateblue);
  }

  .popup-bar-line {
    position: absolute;
    height: 4.83%;
    width: 80%;
    top: 45.22%;
    right: 27.29%;
    left: 10%;
    border-bottom: 2px solid var(--color-black);
  }

  .error-popup-bar-line {
    position: absolute;
    height: 4.83%;
    width: 80%;
    top: 50.22%;
    right: 27.29%;
    left: 10%;
    border-bottom: 2px solid var(--color-black);
  }


</style>