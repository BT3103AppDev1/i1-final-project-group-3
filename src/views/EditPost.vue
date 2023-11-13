<template>
    <NavigationBar/>
    <div class="create-post">
        <div class="new-post">Edit Post</div>
        <div class="header">Header</div>
        <input v-model="header" class="enter-the-header" id="enter-the-header" :placeholder="headerPlaceholder">
        <div class="description">Description</div>
        <textarea v-model="description" class="enter-the-description" id= "enter-the-description" :placeholder="descriptionPlaceholder"></textarea>
        <button class="cancelCreatepost" @click="navigateToOwnProfile">Cancel</button>   
        <button type = "submit" id="post-button" @click="submitForm">Save</button>
            
    </div>

    <div class="popup" v-show="showErrorDialog" ref="errorDialog">
        <div class="popup-content">
            <h2>Error: Missing Header / Description </h2>
            <div class="error-popup-bar-line" />
            <div class="action-buttons">
              <button style="width: 10.75rem; height: 2.75rem;" @click="closeErrorDialog">Cancel</button>
            </div>
        </div>
    </div>

    <div class="popup" v-show="showConfirmationDialog" ref="confirmationDialog">
        <div class="popup-content">
            <h2>Confirmation</h2>
            <div class="popup-bar-line" />
            <h3 style="font-size: 2.19rem; color: var(--color-darkgray-200); font-family: var(--font-josefin-sans); font-weight: 300;">Are you sure you want to make changes to this post?</h3>
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
import { doc, collection, getFirestore, getDoc, updateDoc, addDoc, getDocs, setDoc} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
    name: "EditPost",
    data() {
      return {
        showErrorDialog: false,
        showConfirmationDialog:false,
        newHeader: '',
        newDescription: '',
        uid: "",
        user:false,
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
          this.fetchPostData()
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
      navigateToPost() {
        this.$router.push({ name: 'Post' });
      },

      navigateToOwnProfile() {
        this.$router.push({ name: 'OwnProfile' });
      },

      getCurrentDate() {
        const currentDate = new Date();
        return currentDate;
      },

      submitForm() {
        if (!this.header || !this.description) {
          this.showErrorDialog = true;
        } else {
          this.showConfirmationDialog = true;
        }
      },

      async fetchPostData() {
        const db = getFirestore(firebaseApp);
        const postId = this.$route.params.postId;
        let postDocument = await getDoc(doc(db, "Posts", postId));
        let postData = postDocument.data();

        var headerPlaceholder = (postData.header)
        var descriptionPlaceholder = (postData.description)

        document.getElementById("enter-the-header").value = headerPlaceholder
        document.getElementById("enter-the-description").value = descriptionPlaceholder
      },

      async confirmSubmitForm() {
        const db = getFirestore(firebaseApp);
        const postId = this.$route.params.postId;
        let uid = this.uid;
        let header = document.getElementById("enter-the-header").value;
        let description = document.getElementById("enter-the-description").value;

        try{
          const auth = getAuth();
          const user = auth.currentUser;

          const userPostRef = doc(db, "Users", uid, "Posts", postId);
          const postRef = doc(db, "Posts", postId);


          if (user) {
            const updates = {
              header: header,
              description: description,
              date: this.getCurrentDate().toDateString(),
              datetime: this.getCurrentDate()
            }

            const postDocRef = await updateDoc(userPostRef, updates);
            const allPostsRef = await updateDoc(postRef, updates);

            this.closeConfirmationDialog()
            this.navigateToPost()
            console.log('Post updated successfully!');
          } else {
            console.error('No user is logged in.');
        }

          
        }
        catch(error) {
          console.error("Error updating document: ", error);
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
  .insert-image {
    position: absolute;
    top: 732px;
    left: 1137px;
    border-radius: 50%;
    background-color: #d9d9d9;
    border: 1px solid #d9d9d9;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: 55px;
    height: 55px;
    cursor: pointer;
  }

  .insert-image:hover {
    background-color: #a7a7a7;
    border: 1px solid #a7a7a7;
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