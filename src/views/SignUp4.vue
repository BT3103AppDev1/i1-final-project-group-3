<template>
  <div class="sign-up-page-1" >
    <div class="content">
    <div class="rectangle-parent" id="TopBar">
      <div @click="navigateToSignUp1">
        <span class="account-details" id="accountDetails">ACCOUNT DETAILS</span>
        <img class="group-child" alt="" src="../assets/rectangle-8@2x.png" />
        <strong class="strong3">1</strong>
      </div>
      <div @click="navigateToSignUp2">
        <span class="about-you">ABOUT YOU</span>
        <img class="group-item" alt="" src="../assets/rectangle-8@2x.png" />
        <strong class="strong2">2</strong>
      </div>
      <div @click="navigateToSignUp3"></div>
      <div @click="navigateToSignUp4"></div>
      
      
      <img class="group-inner" alt="" src="../assets/rectangle-8@2x.png" />
      <img class="rectangle-icon" alt="" src="../assets/rectangle-8@2x.png" />
      <img class="line-icon" alt="" src="../assets/line-1@2x.png" />
      <img class="group-child1" alt="" src="../assets/line-1@2x.png" />
      <img class="group-child2" alt="" src="../assets/line-1@2x.png" />
      <strong class="strong">3</strong>
      <strong class="strong1">4</strong>
      <strong class="strong2">2</strong>
      
      
      
      <span class="academic-details">ACADEMIC DETAILS</span>
      <i class="preferences">PREFERENCES</i>
    </div>
    <img class="form-group-icon" alt="" src="../assets/form-group@2x.png" />
    <h1 class="create-account">TELL US MORE ABOUT YOU</h1>
    <img class="sign-up-page-1-child" alt="" src="../assets/line-7@2x.png" />
    <form class="form" id="form">
      <button class="next">
        <img class="next-child" alt="" src="../assets/rectangle-48@2x.png" />
        <span class="next1" @click="updateProfile">Next</span>
      </button>
      <div class="traits">
        <div class="row" v-for="(option, index) in tags" :key="index">
          <button type="button"
          class="tag-button"
          :class="{ 'checked': option.checked }"
          @click="toggleOption(index)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
      
    </form>
    <span class="credentials-for-login">Connect better with other students!</span>
    <span class="instruction">Peronality type(s) you work best with (Choose 5)</span>
  </div>
  </div>
</template>

<script>
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebaseApp from '@/firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
  
  export default {
    name: "SignUp4",
    data() {
      return {
        tags: [
          { label: 'Extroverted', checked: false },
          { label: 'Introverted', checked: false },
          { label: 'Confident', checked: false },
          { label: 'Adaptable', checked: false },
          { label: 'Good listener', checked: false },
          { label: 'Supportive', checked: false },
          { label: 'Humorous', checked: false },
          { label: 'Respectful', checked: false },
          { label: 'Patient', checked: false },
          { label: 'Sensitive', checked: false },
          { label: 'Open-minded', checked: false },
          { label: 'Trustworthy', checked: false },
          { label: 'Quick responder', checked: false },
          { label: 'Fair-weather', checked: false },
          { label: 'Selfless', checked: false }
        ],
        uid: false,
        user: false,
        moreThan5: false,
      };
    },
    methods: {
      navigateToSignUp2() {
        this.$router.push({ name: 'SignUp2' });
      },
      navigateToSignUp1() {
        this.$router.push({ name: 'Registration' });
      },
      toggleOption(index) {
        this.tags[index].checked = !this.tags[index].checked;
        console.log(this.tags);
      },
      async updateProfile(event) {
        event.preventDefault();
        let personalities = [];

        this.tags.forEach((tag) => {
          if (tag.checked) {
            personalities.push(tag.label);
          }
        })

        let uid = this.uid;
        console.log(uid);

        console.log(personalities);

        if (personalities.length > 5) {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              // Create and show a notification
              const notification = new Notification("Please select only 5 tags!");
            }
          });
        } else {
          try {
            const docRef = await updateDoc(doc(db, "Users", uid),{
              personalities: personalities,
            })
            console.log(docRef);
            this.$router.push({ name: 'OwnProfile' });
            
          }
          catch(error) {
            console.error("Error adding document: ", error);
          }
        }

        
      },
    }, 
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
        }
      })
      console.log(auth.currentUser);
      console.log(auth.currentUser.uid);
      this.uid = auth.currentUser.uid;
      console.log(this.uid);
    }
  };
</script>

<style scoped>
  .group-child {
    position: absolute;
    top: 0.13rem;
    left: 3.81rem;
    width: 2.25rem;
    height: 2.38rem;
    object-fit: cover;
  }
  .group-item {
    position: absolute;
    top: 0.13rem;
    left: 23.63rem;
    width: 2.25rem;
    height: 2.38rem;
    object-fit: cover;
  }
  .group-inner {
    position: absolute;
    top: 0.13rem;
    left: 43.44rem;
    width: 2.25rem;
    height: 2.38rem;
    object-fit: cover;
  }
  .rectangle-icon {
    position: absolute;
    top: 0.13rem;
    left: 63.25rem;
    width: 2.25rem;
    height: 2.38rem;
    object-fit: cover;
  }
  .line-icon {
    position: absolute;
    top: 1.25rem;
    left: 6.06rem;
    width: 17.56rem;
    height: 0.13rem;
    object-fit: cover;
  }
  .group-child1 {
    position: absolute;
    top: 1.25rem;
    left: 25.88rem;
    width: 17.56rem;
    height: 0.13rem;
    object-fit: cover;
  }
  .group-child2 {
    position: absolute;
    top: 1.25rem;
    left: 45.69rem;
    width: 17.56rem;
    height: 0.13rem;
    object-fit: cover;
  }
  .strong {
    position: absolute;
    top: 0.6rem;
    left: 43.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.19rem;
    
  }
  .strong1 {
    position: absolute;
    top: 0.6rem;
    left: 63.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.19rem;
    font-weight: 700;
  }
  .strong2 {
    position: absolute;
    top: 0.6rem;
    left: 23.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.38rem;
    height: 1.56rem;
  }
  .strong3 {
    position: absolute;
    top: 0.1rem;
    left: 3.81rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.19rem;
    height: 2.38rem;
  }
  .account-details {
    position: absolute;
    top: 4rem;
    left: 0rem;
    font-size: var(--font-size-base);
    font-family: var(--font-josefin-sans);
    color: var(--color-white);
  }
  .about-you {
    position: absolute;
    top: 4rem;
    left: 21.63rem;
    font-size: var(--font-size-base);
    font-family: var(--font-josefin-sans);
    color: var(--color-white);
  }
  .academic-details {
    position: absolute;
    top: 4rem;
    left: 40rem;
    font-size: var(--font-size-base);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
  }
  .preferences {
    position: absolute;
    top: 4rem;
    left: 60.56rem;
    font-weight: 700;
    font-size: var(--font-size-base);
    font-family: var(--font-josefin-sans);
    color: var(--color-white);
  }
  .rectangle-parent {
    position: absolute;
    top: 5.94rem;
    left: 6.06rem;
    width: 67.81rem;
    height: 5rem;
  }
  .form-group-icon {
    position: absolute;
    top: 16.31rem;
    left: 24.69rem;
    border-radius: 15px;
    width: 30.56rem;
    height: 29.38rem;
    object-fit: cover;
  }
  .create-account {
    margin: 0;
    position: absolute;
    top: 18.75rem;
    left: 27.19rem;
    font-size: 1.88rem;
    font-weight: 400;
    font-family: var(--font-yeseva-one);
    color: #3a3939;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25.56rem;
    height: 2.44rem;
  }
  .sign-up-page-1-child {
    position: absolute;
    top: 21.34rem;
    left: 27.56rem;
    width: 24.81rem;
    height: 0.16rem;
    object-fit: cover;
  }
  .next-child {
    position: absolute;
    top: 0rem;
    left: 0rem;
    border-radius: 40px;
    width: 8.06rem;
    height: 2.19rem;
    object-fit: cover;
  }
  .next1 {
    position: absolute;
    top: 0.44rem;
    left: 1.38rem;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: var(--font-josefin-sans);
    color: var(--color-white);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.31rem;
    height: 1.31rem;
  }
  .next {
    cursor: pointer;
    border: none;
    padding: 0;
    background-color: transparent;
    position: absolute;
    top: 16.31rem;
    left: 7.5rem;
    width: 8.06rem;
    height: 2.19rem;
  }

  .year-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: 14px;
    background-color: transparent;
    position: absolute;
    top: 0rem;
    left: 15.5rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 7.75rem;
    height: 3.46rem;
    padding-left: 0.5rem;
  }
  .description-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: 15px;
    background-color: transparent;
    position: absolute;
    top: 10.5rem;
    left: 0rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 23.25rem;
    height: 4.46rem;
    padding-left: 0.5rem;
    padding-top: 0.7rem;
  }
  .course-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: 18px;
    background-color: transparent;
    position: absolute;
    top: 5.25rem;
    left: 0rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 23.25rem;
    height: 3.46rem;
    padding-left: 0.5rem;
  }
  .major-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: var(--font-size-lg);
    background-color: transparent;
    position: absolute;
    top: 0rem;
    left: 0rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 14.25rem;
    height: 3.46rem;
    padding-left: 0.5rem;
  }

  .tag-button {
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    background-color: #e0e0e0;
    border: 0px solid #ccc;
    border-radius: 7px;
    cursor: pointer;
  }

  .tag-button.checked {
    background-color: #525fe1;
    color: white;
  }
  .form {
    position: fixed;
    top: 24.44rem;
    left: 28.44rem;
    width: 22.75rem;
    height: 18.5rem;
  }

  .traits {
    position: absolute;
    top: 1rem;
    height: 13.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content:space-between;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    text-align: center;
  }
  .credentials-for-login {
    position: absolute;
    top: 22.38rem;
    left: 32.38rem;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: var(--font-josefin-sans);
    color: #ada6a6;
    text-align: left;
  }

  .instruction {
    position: absolute;
    top: 23.88rem;
    left: 31rem;
    font-size: 0.78rem;
    font-weight: 600;
    font-family: var(--font-josefin-sans);
    color:#ccc;
  }
  .sign-up-page-1 {
    background-color: #525fe1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    position: fixed;
    font-size: var(--font-size-lg);
    color: var(--color-black);
    font-family: var(--font-inter);
  }

  .content {
    position: center;
  }

</style>
