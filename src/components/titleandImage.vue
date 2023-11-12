<template>
    <div class="image-and-title">
            <div class="image-update">
              <img :src="uploadedImage || defaultImage" class="profile-image" alt="Profile Picture">
                <button class="camera-upload" @click="openUploadDialog">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-bolt" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 20h-8a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
                        <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M19 16l-2 3h4l-2 3" />
                    </svg>

                </button>
             

            </div>

            
            
            <h1> Edit Profile </h1>
    </div>

    <div class="popup" v-show="showUploadDialog" ref="uploadDialog">
        <div class="popup-content">
            <h2>Upload or Remove Photo</h2>
            <div class="action-buttons">
                <input type="file" accept="image/*" @change="handleFileUpload" class="custom-file-input" />
            
                <button @click="removePhoto" class="remove-photo">Remove Photo</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import 'firebase/storage';

import { doc, collection, getFirestore, setDoc, updateDoc, getDoc } from '@firebase/firestore';
import firebaseApp from '../firebase';
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { getDatabase } from 'firebase/database';
import defaultImage from '../assets/default-profile-image.jpg';

const storage = getStorage(firebaseApp);
const auth = getAuth();
const db = getFirestore();

export default {
  name: "TitleAndImage",
  data() {
    return {
      showUploadDialog: false,
      uploadedImage: false,
      defaultImage: defaultImage,
    };
  },

  async mounted() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.user = user;
        this.useremail = user.email;
        this.uid = user.uid;
        await this.fetchUserProfilePicture();
      } else {
        this.user = null;
        this.useremail = null;
      }
    });
  },

  methods: {
    openUploadDialog() {
      this.showUploadDialog = true;

      // Add a click event listener to the entire document when the popup is open
      document.addEventListener("click", this.closeUploadDialogOnClickOutside);

      // Prevent the click event on the button from propagating and immediately closing the popup
      event.stopPropagation();
    },

    closeUploadDialog() {
      this.showUploadDialog = false;
      document.removeEventListener("click", this.closeUploadDialogOnClickOutside);
    },
    
    async updateProfile(uid, updatedData) {
      const userDocRef = doc(db, 'Users', uid);
      try {
        await updateDoc(userDocRef, updatedData);
        console.log('Profile updated successfully');
      } catch (error) {
        console.error('Error updating profile: ', error);
      }
    },

    async removePhoto() {
      if (this.uid) {
        const userImageDocRef = doc(db, 'Users', this.uid);

        try {
          // Set the profile picture field in Firestore to the default image
          await updateDoc(userImageDocRef, { profilePicture: this.defaultImage });

          // Update the local state
          this.uploadedImage = this.defaultImage;

          // Remove the photoURL from the auth profile if it exists
          if (auth.currentUser && auth.currentUser.photoURL) {
            await updateProfile(auth.currentUser, { photoURL: null });
          }
          console.log('Profile picture removed');
        } catch (error) {
          console.error('Error removing profile picture:', error);
        }
      } else {
        console.log('User not signed in');
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          this.uploadedImage = e.target.result;

          // Now, upload the image to Firebase
          const fileRef = ref(storage, 'profile-pictures/' + file.name);
          try {
            const snapshot = await uploadBytes(fileRef, file);
            console.log('File uploaded');
            
            const url = await getDownloadURL(fileRef);
            console.log('File URL:', url);

            // Assuming user is signed in
            if (auth.currentUser) {
              const uid = auth.currentUser.uid;
              const userImageDoc = doc(db, 'Users', uid);
              
              await setDoc(userImageDoc, { profilePicture: url }, { merge: true });
              console.log('Profile picture URL saved to user profile');
            } else {
              console.log('User not signed in');
            }
          } catch (error) {
            console.log('Error:', error);
          }
        };
        reader.readAsDataURL(file);
      }
    },

    async fetchUserProfilePicture() {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        try {
          const userDoc = await getDoc(doc(db, 'Users', uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data:', userData); // Check the fetched user data
            if (userData.profilePicture) {
              this.uploadedImage = userData.profilePicture;
            } else {
              console.log('Profile picture not found in user data');
            }
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error getting document:', error);
        }
      } else {
        console.log('User not signed in');
      }
    },


    closeUploadDialogOnClickOutside(event) {
      // Check if the click event occurred outside of the popup
      const popup = this.$refs.uploadDialog;
      if (popup && !popup.contains(event.target)) {
        this.closeUploadDialog();
      }
    },
  },
};
</script>



<style>

.image-update {
    margin-top: 100px;
}

/* Style for the pop-up background */
.popup {
    position: fixed;
    top:25%;
    left: 19%;
    width: 880px;
    height: 363px;
    z-index: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    text-align: center;
    display: flex;
       
}



/* Style for the pop-up content */
.popup-content {
    justify-content: space-between;
}


.popup-content button {
    border: 2px solid #525fe1;
    height: 50px;
    width: 536px;
    color: #525fe1;
    border-radius: 30px;
    font-size: 25px;
    background-color: white;
    font-family: josefin sans;
    cursor: pointer;

    
}

h2 {
    color: black;
    font-size: 60px;
    position: relative;
    top: -40px;
    
}


/* Style the custom file input container */
.custom-file-upload {
  position: relative;
  display: inline-block;
}

/* Style the custom file input button */
.custom-file-input {
  font-size: 15px;
  opacity: 100;
  cursor: pointer;
  color: white;
  font-family: josefin sans;
  
 
}
input[type="file"] {
    width: 700px;
    margin-left: 165px;
}

input[type="file"]::file-selector-button {
  border-radius: 40px;
  height: 50px;
  width: 536px;
  font-size: 25px;
  cursor: pointer;
  background-color: #525fe1;
  color: white;
  border: none;
  transition: background-color 200ms;
  font-family: josefin sans;
  margin-right: 40px;
  margin-top: 3px;
  
}

.remove-photo {
    position: relative;
    top: 30px;
}

.profile-image {
  object-fit: cover;
}



</style>

