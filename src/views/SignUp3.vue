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
        <span class="about-you">ABOUT YOU</span>
        <i class="academic-details">ACADEMIC DETAILS</i>
        <span class="preferences">PREFERENCES</span>
      </div>
      <img class="form-group-icon" alt="" src="../assets/form-group@2x.png" />
      <h1 class="create-account">YOUR INTEREST</h1>
      <img class="sign-up-page-1-child" alt="" src="../assets/line-7@2x.png" />
      <form class="form" id="form">
        <button class="next">
          <img class="next-child" alt="" src="../assets/rectangle-48@2x.png" />
          <span class="next1" @click="updateProfile">Next</span>
        </button>
        <input
          class="major-field"
          id="major"
          placeholder="Major"
          type="text"
          required=""
        />
        
        <select name="year" id="year" class="year-field" v-model="year" required="">
          <option value="" disabled="" selected="">Year of Study</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
          <option value="3">Year 3</option>
          <option value="4">Year 4</option>
        </select>
        
        <input
          class="course-field"
          id="course"
          placeholder="Current Courses"
          type="text"
        />
        <textarea
          class="description-field"
          id="description"
          placeholder="Short description of yourself, and your study style"
          type="text"
        ></textarea>
        
      </form>
      <span class="credentials-for-login">Meet your course mates!</span>
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
  import { doc, setDoc, updateDoc } from "firebase/firestore";
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  const db = getFirestore(firebaseApp);

    export default {
      name: "SignUp3",
      data() {
        return {
          user: false,
          uid: null,
          year: null,
        };
      },
      methods: {
        navigateToSignUp4() {
          this.$router.push({ name: 'SignUp4' });
        },
        async updateProfile(event) {
          event.preventDefault();
          let major = document.getElementById("major").value;
          let year = this.year;
          let courseInput = document.getElementById("course").value;
          let description = document.getElementById("description").value;

          let uid = this.uid;
          console.log(uid);

          let courses = courseInput
            .split(",")
            .map((course) => course.trim());

          let validCourses = courses.filter(course => course !== "");

          console.log(validCourses);

          try{
            const docRef = await updateDoc(doc(db, "Users", uid),{
              major: major,
              currenCourses : validCourses,
              yearOfStudy: year,
              description: description,
            })
            console.log(docRef);
            this.$router.push({ name: 'SignUp4' });
            
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
      left: 43.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.19rem;
      font-weight: 700;
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
      font-weight: 700;
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
      left: 26.19rem;
      border-radius: 15px;
      width: 27.56rem;
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
    .form {
      position: fixed;
      top: 24.44rem;
      left: 28.44rem;
      width: 23.25rem;
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
  