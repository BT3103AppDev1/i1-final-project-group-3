<template>
   <div class = "create-form">
        <div class="form-box">
          <img src= "../assets/exit-icon.png" alt="Close" @click="closeForm" class="close-button" />
            <h1 class = "create-header">Create a group!</h1> 
            <form @submit.prevent="submitForm" id = "myform">
               <br>
               <br>
                <label for="groupTitle" class = "groupTitle"><b>Group Title:</b></label> 
                <input v-model="groupTitle"  :class="{ 'highlight-error': isDuplicateGroup }" id="groupTitle" type="text" name="groupTitle" placeholder="example: GPA 6.0" required = "" > 
                <br>
                <br>                
                <label for="groupDescription" class = "groupDescription"><b>Group Description:</b></label>  <br>
                <textarea v-model="groupDescription" id="groupDescription" type="text" placeholder="example: lets study BT3103 together!" required = ""></textarea>
                <br> 
                <br>  
                <div class = "numMembers">             
                  <label for="membersCount" class="membersCount"><b>Number of Members:</b></label>  
                  <input v-model= "membersCount" type="number" id="membersCount" min =  "3" max = "5" required = "">
                </div>
                <br>
                <br>
                <br>
                <button type = "submit" id="create-group-button">Create!</button>
  
            </form>
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
import { doc, collection, getFirestore, getDoc, updateDoc, addDoc, getDocs, setDoc, arrayUnion } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
    data() {
      return {
        groupTitle: "",
        groupDescription: "",
        membersCount: null,
        uid: "",
        user:false,
        username: "",
        isDuplicateGroup: false,
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

    emits:["create-group"],

    methods: {

      closeForm() {
       this.$emit("close-form");
      },

 

      async submitForm() {
        try {
          const db = getFirestore(firebaseApp);

          // Retrieve input values using v-model instead of direct DOM access
          let groupTitle = this.groupTitle;
          let groupDescription = this.groupDescription;
          let membersCount = parseInt(this.membersCount);

          // Check if a group with the same title already exists
          const querySnapshot = await getDocs(collection(db, 'Groups'));
          const duplicateGroup = querySnapshot.docs.some(doc => doc.data().title === groupTitle);

          if (duplicateGroup) {
            this.isDuplicateGroup = true;
            // Display an error or handle the case where a group with the same title already exists
            window.alert("Error: Group with the same title already exists! Please change your group title");
            this.isDuplicateGroup = false;
            
            return;
          }

          const auth = getAuth();
          const user = auth.currentUser;

          if (user) {
            const userDocRef = doc(db, "Users", this.uid);
            const userDocument = await getDoc(userDocRef);
            const userData = userDocument.data();
            let username = userData.firstName + " " + userData.lastName;

            const newPost = {
              title: groupTitle,
              groupDescription: groupDescription,
              members: membersCount,
              username: username,
              userid: this.uid,
              groupMembers: [this.uid],
            };

            const groupDocRef = await addDoc(collection(db, 'Groups'), newPost);
            const newGroupId = groupDocRef.id;

            // Reference to the 'msgList' subcollection under the new group
            const msgListRef = collection(db, 'Groups', newGroupId, 'msgList');

            // Add an empty document with at least an empty object to 'msgList' subcollection
            await addDoc(msgListRef, {});

            if (userDocument.exists() && userDocument.data().hasOwnProperty('activeGroups')) {
              // The user already has an activeGroups field, update it
              await updateDoc(userDocRef, {
                activeGroups: arrayUnion(newGroupId),
              });
            } else {
              // The user does not have an activeGroups field, set it
              await setDoc(userDocRef, {
                activeGroups: [newGroupId],
              }, { merge: true }); // Merge to ensure we don't overwrite existing fields
            }

            // Clear the form
            this.groupTitle = "";
            this.groupDescription = "";
            this.membersCount = null;

            // Emit an event or perform other actions as needed
            this.$emit("create-group", {
              title: groupTitle,
              groupDescription: groupDescription,
              members: membersCount,
            });

            console.log('Group created successfully!');
            window.location.reload(); //reload the page to show the new group
          }  
        } catch (error) {
          console.error("Error adding group:", error);
        }
      },




    

    }
}

</script> 
 

<style scoped>


.create-group-page {
    position: relative; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 100vh; 
    overflow-y: auto; 
    text-align: center;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
}
 
 .create-header {
    text-align: center; 
    width: 100%;
    margin:0;
 }

  

body {
  background: #f7f7f7;
}

.close-button {
    position: absolute;
    top: 1.4rem;
    right: 2rem;
    width: 3rem;  
    height: 3rem;
    cursor: pointer;
  }
 
.form-box {
  position: fixed;
  width: 50%;
  margin: auto;
  padding: 50px;
  border: 0.01rem solid lightgray;
  height: 36rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2rem;
  text-align: left;
  background-color: white;
  z-index: 999;
  align-items: center;
  flex-direction: column;
  display: flex;
  background-color: #bbc0fbf8;
}

  .groupTitle, .groupDescription, .membersCount {
    text-align: center;
    font-size: 2rem;
    color: rgb(101, 100, 100);
    margin-left: 4rem;  
    margin: 0;
    margin-bottom: 1rem; 
    

  }

  #groupTitle, #groupDescription {
    text-align: left; 
    font-size: 1rem;
    color:rgb(101, 100, 100);
    margin-left:4rem;
    border: none;
    outline: none;
    width: 100%;
    border-bottom: 0.05rem solid #575756;
    background: transparent;
    background-color: transparent;
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;   
  }

  #groupDescription {
    height: 3rem; 
    padding-top: 1.5rem;
  }

  #groupTitle {
     height: 2rem; 
    padding-top: 0.5rem;
  }
  
 

.numMembers {
    display: flex;
    align-items: center;
    font-size: 2rem;
    color: rgb(101, 100, 100);
    margin-bottom: 1rem;
}

 
#membersCount {
    font-size: 1.5rem;
    color: rgb(101, 100, 100);
    border: none;
    outline: none;
    border-bottom: 0.05rem solid #575756;
    background-color: transparent;
    width: 20%;
    height: 2.5rem;
    margin-left: 1rem; 
}





h1, p {
  text-align: center;
}

input, textarea {
  width: 100%;
}




.create-group-page {
    position: relative;
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 100vh;
    overflow-y: auto; 
    text-align: center;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
}
 

#create-group-button {
    position: absolute;
    top: 30rem;
    left: 28rem;
    font-weight: 600;
    font-size: 1.4rem;
    display: inline-block;
    width: 10rem;
    height: 3rem;
    border: 2px solid #525fe1;
    background-color: #525fe1;
    border-radius: 2rem;
    color: white;
    font-family: 'Yeseva One';
    cursor: pointer;
    
    
}
 

 
.create-group-button:hover {
    background-color: #4d58d0;
}






.modal {
  display: none;
  position: fixed;
  z-index: 999;  
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  z-index: 1000; 
}
 
 
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}



 




</style>
      