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
      <i class="account-details" id="accountDetails">ACCOUNT DETAILS</i>
      <span class="about-you">ABOUT YOU</span>
      <span class="academic-details">
        <span>ACADEMIC</span>
        <b> </b>
        <span>DETAILS</span>
      </span>
      <span class="preferences">PREFERENCES</span>
    </div>
    <img class="form-group-icon" alt="" src="../assets/form-group@2x.png" />
    <h1 class="create-account">CREATE ACCOUNT</h1>
    <img class="sign-up-page-1-child" alt="" src="../assets/line-7@2x.png" />
    <form class="form" id="form">
      <button class="next">
        <img class="next-child" alt="" src="../assets/rectangle-48@2x.png" />
        <span class="next1" @click="navigateToSignUp2">Next</span>
      </button>
      <!--
      <input
        class="confirm-password-field"
        id="confirmPassword"
        placeholder="Confirm Password"
        type="text"
      />
      <input
        class="password-field"
        id="password"
        placeholder="Password"
        type="text"
      />
      <input
        class="username-field"
        id="email"
        placeholder="Email"
        type="text"
      />
      -->
      <div id="firebaseui-auth-container"></div>
    </form>
    <span class="credentials-for-login">Credentials for login</span>
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
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAdditionalUserInfo, getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
    name: "SignUpPage1",
    data() {
      return {
        user:false,
      };
    },
    methods: {
      navigateToSignUp2() {
        this.$router.push({ name: 'SignUp2' });
      },
    }, 
    mounted() {
      // const auth = getAuth();
      // onAuthStateChanged(auth, (user) => {
      //   if (user) {
      //     console.log(user);
      //     this.user = user;
      //   }
      // });
      var ui = firebaseui.auth.AuthUI.getInstance();
      if (!ui) {
        ui = new firebaseui.auth.AuthUI(firebase.auth());
      }

      var uiConfig = {
        signInFlow: 'popup',
        callbacks: {
          signInSuccessWithAuthResult: (authResult, redirectUrl) => {
            console.log(authResult);
            if (authResult) {
              console.log(authResult.additionalUserInfo.isNewUser);
              if (authResult.additionalUserInfo.isNewUser) {
                return true;
              } else {
                this.$router.push('/registration2');
                return false;
              }
            }
          },
        },
        signInSuccessUrl:'/registration2',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ]
      };
      ui.start('#firebaseui-auth-container', uiConfig);
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
    font-weight: 700;
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
    font-weight: 700;
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
  .confirm-password-field {
    border: none;
    display: block;
    font-family: var(--font-josefin-sans);
    font-size: var(--font-size-lg);
    background-color: transparent;
    position: absolute;
    top: 10.5rem;
    left: 0rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 19.25rem;
    height: 3.46rem;
    padding-left: 0.5rem;
  }
  .password-field {
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
    left: 35.88rem;
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
