<template>
  <div class="sign-up-page-1" :style="{ backgroundColor: bgColor }">
    <div class="content">
    <div class="rectangle-parent" id="TopBar">
      <img class="group-child" alt="" src="../assets/rectangle-8@2x.png" />
      <img class="group-item" alt="" src="../assets/rectangle-8@2x.png" />
      <img class="group-inner" alt="" src="../assets/rectangle-8@2x.png" />
      <img class="rectangle-icon" alt="" src="../assets/rectangle-8@2x.png" />
      <img class="line-icon" alt="" src="../assets/line-1@2x.png" />
      <img class="group-child1" alt="" src="../assets/line-1@2x.png" />
      <img class="group-child2" alt="" src="../assets/line-1@2x.png" />
      <strong class="strong">3</strong>
      <strong class="strong1">4</strong>
      <strong class="strong2">2</strong>
      <strong class="strong3">1</strong>
      <span class="account-details" id="accountDetails">ACCOUNT DETAILS</span>
      <i class="about-you">ABOUT YOU</i>
      <span class="academic-details">ACADEMIC DETAILS</span>
      <span class="preferences">PREFERENCES</span>
    </div>
    <img class="form-group-icon" alt="" src="../assets/form-group@2x.png" />
    <h1 class="create-account">PERSONAL DETAILS</h1>
    <img class="sign-up-page-1-child" alt="" src="../assets/line-7@2x.png" />
    <span class="credentials-for-login">These data are stored safely!</span>
    <span class="gender" id="gender">Gender</span>
    <form class="form" id="form">
     
      <input
        class="username-field"
        id="userName"
        placeholder="User Name"
        type="text"
        required=""
      />
      <input
        class="phoneNum-field"
        id="phoneNumber"
        placeholder="Phone Number"
        type="text"
        required=""
      />
      <div class="gender-radio">
          <label class="radio-option">
              <input type="radio" value="male" v-model="gender" class="radio-input" required=""/>Males
          </label>
          <label class="radio-option">
              <input type="radio" value="female" v-model="gender" class="radio-input"/>Females
          </label>
          <label class="radio-option">
              <input type="radio" value="others" v-model="gender" class="radio-input"/>Others
          </label>
      </div>
      
      <button class="next">
        <img class="next-child" alt="" src="../assets/rectangle-48@2x.png" />
        <span class="next1" @click="updateProfile">Next</span>
      </button>
    </form>
    
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
import { doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth"

const db = getFirestore(firebaseApp);

  export default {
    name: "SignUpPage1",
    data() {
      return {
        gender: null,
        user: false,
        uid: null,
      };
    },
    methods: {
      navigateToSignUp3() {
        this.$router.push({ name: 'SignUp3' });
      },
      async updateProfile(event) {
        event.preventDefault();
        let userName = document.getElementById("userName").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let gender = this.gender;

        let uid = this.uid;
        console.log(uid);

        try{
          const docRef = await setDoc(doc(db, "Users", uid),{
            phoneNumber: phoneNumber,
            userName : userName,
            gender: gender,
          })
          console.log(docRef);
          this.$router.push({ name: 'SignUp3' });
          
        }
        catch(error) {
          console.error("Error adding document: ", error);
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
    left: 43.5rem;
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
  }
  .strong2 {
    position: absolute;
    top: 0.5rem;
    left: 23.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.38rem;
    height: 1.56rem;
    font-weight: 700;
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
    font-weight: 700;
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
    left: 28.19rem;
    border-radius: 15px;
    width: 23.56rem;
    height: 29.38rem;
    object-fit: cover;
  }
  .create-account {
    margin: 0;
    position: absolute;
    top: 18.75rem;
    left: 28.19rem;
    font-size: 1.88rem;
    font-weight: 400;
    font-family: var(--font-yeseva-one);
    color: #3a3939;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 23.56rem;
    height: 2.44rem;
  }
  .sign-up-page-1-child {
    position: absolute;
    top: 21.34rem;
    left: 30.56rem;
    width: 18.81rem;
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
    left: 5.5rem;
    width: 8.06rem;
    height: 2.19rem;
  }
  
  .phoneNum-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: var(--font-size-lg);
    background-color: transparent;
    position: absolute;
    top: 5.25rem;
    left: 0rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 19.25rem;
    height: 3.46rem;
    padding-left: 0.5rem;
  }
  .username-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: var(--font-size-lg);
    background-color: transparent;
    position: absolute;
    top: 0rem;
    left: 0rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 19.25rem;
    height: 3.46rem;
    padding-left: 0.5rem;
  }

  .gender {
      position: absolute;
      top: 35.25rem;
      left: 30.88rem;
      font-size: 1rem;
      font-family: var(--font-josefin-sans);
      color: #ada6a6;
      text-align: left;
  }

  .gender-radio {
      position: fixed;
      top: 37.25rem;
      left: 30.88rem;
      font-size: 1rem;
      font-family: var(--font-josefin-sans);
      text-align: left;
      color: #ada6a6;
  }

  .radio-option {
      margin-right: 0.5rem;
      text-align: center;
  }

  .radio-input {
      margin-right: 0.3rem;
  }

  .form {
    position: fixed;
    top: 24.44rem;
    left: 30.44rem;
    width: 19.25rem;
    height: 18.5rem;
  }
  .credentials-for-login {
    position: absolute;
    top: 22.38rem;
    left: 34rem;
    font-size: 0.88rem;
    font-weight: 600;
    font-family: var(--font-josefin-sans);
    color: #ada6a6;
    text-align: left;
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
