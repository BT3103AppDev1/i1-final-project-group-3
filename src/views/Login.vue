<template>
  <div class="login-page">
      <div class="rectangle-parent">
          <div class="rectangle-group">
            <b class="studybuddy" @click="navigateToRegistration">StudyBuddy</b>
          </div>

          <h1 class="login-main">Login</h1>
          <div class="create-account">Don't have an account? <em class="sign-up" @click="navigateToRegistration"> Sign up here </em></div>
      </div>

      <div class="login-form">

              <div class="email">
                  
                  <h3>Email: </h3>
                  <input type="email" v-model="email" placeholder="Example: e0123456@u.nus.edu" />

              </div>
              

              <div class="password"> 
                  <h3>Password: </h3>
                  <input type="password" v-model="password" placeholder="Example: Abcdefg123!" /> 
              </div>
              
              <div class="bottom-row">
                  <div class="forgot-password">Forgot Password?</div>
                  <button class="login-button" @click="onSubmit">Login</button>
              </div>
              
      </div>
  </div>

</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import firebaseApp from '../firebase.js';
import { defineComponent } from "vue";

export default {
  name: "Login",

  data() {
    return {
      email: '',
      password: '',
    };
  },

  mounted() {
    // Add the event listener when the component is mounted
    const studyBuddyElement = document.querySelector('.studybuddy');
    if (studyBuddyElement) {
        studyBuddyElement.addEventListener('click', this.navigateToMain);
    }
  },

  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    const studyBuddyElement = document.querySelector('.studybuddy');
    if (studyBuddyElement) {
        studyBuddyElement.removeEventListener('click', this.navigateToMain);
    }
  },


  methods: {
    navigateToRegistration() {
      console.log("done");
      this.$router.push({ name: 'Registration' });
    },

    navigateToProfile() {
      console.log("done");
      this.$router.push({ name: 'Home' });
    },

    navigateToMain() {
      console.log("done");
      this.$router.push({ name: 'MainView' });
    },

    async onSubmit() {
      const auth = getAuth(firebaseApp);
      const db = getFirestore(firebaseApp);
      const userCollection = collection(db, "users");

      try {
        // Authenticate the user
        await signInWithEmailAndPassword(auth, this.email.trim(), this.password.trim());
        const user = auth.currentUser;

        // Access the user's document in the users collection
        const userDocRef = doc(userCollection, user.email);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          console.log("User data:", userDocSnap.data());
        } else {
          console.log("No such document!");
        }

        this.navigateToProfile();
      } catch (error) {
        console.error("Error:", error);
        // alert(error.message);
        if (error.code === "auth/invalid-login-credentials") {
          alert("Invalid email or password. Please try again.");
        } else {
          alert("Invalid email or password. Please try again.");
        }
      }
    },


  },
};
</script>




<style scoped>
h1 {
  color: white; 
  position: relative;
  left: -35px;
}

.password h3, 
.email h3 {
  font-size: 40px;
  color: #ADA6A6;
  font-family: var(--font-yeseva-one);

}

div, input {
  font-family: josefin sans;
}

.rectangle-parent {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 319px;
  text-align: center;
  color: white;
  background-color: #525fe1;
}

.studybuddy {
  position: absolute;
  top: 30px;
  left: 2px;
  font-size: 48px;
  font-weight: 700;
  width: 401px;
  height: 40px;
}

.login-main {
  position: center;
  padding-top: 120px;
  font-size: 100px;
  font-weight: 300;
  mix-blend-mode: normal;
}

.create-account {
  position: center;
  font-size: 24px;
  font-weight: 500;
  margin-top: 25px;
}


.login-form {
  position: relative;
  top: 350px;
  left: 470px;

  padding-bottom: 100px;
}


.login-form input {

  border: none;
  border-bottom: 1px solid #ccc;
  height: 60px;
  padding-top:20px;
  width: 500px;

  box-sizing: border-box;
  font-size:20px;
  padding-left: 30px;
}

.login-form h3 {
  margin-bottom: 15=0px;

}

input::placeholder {
  padding-top: 30px;
  padding-left: 30px;
  font-style: italic;
  font-size: 20px;
  color: #ADA6A6;
}

.sign-up {
  color: white;
  text-decoration: underline;
  font-style: italic;
  cursor: pointer;
}

.login-form input:focus {
outline: none;
border-color: #3730A3;
}

.password {
  margin-top: 70px;
}

.forgot-password {
  color: #ADA6A6;
  font-style: italic;
  margin-left: 50px;
  position: relative;
  top: 30px




}

button {
  background-color: #f86f03;
  border-radius: 40px;
  border: none;
  color: white;
  font-family: var(--font-josefin-sans);
  cursor: pointer;
  width: 134px;
  height: 37px;
  margin-left: 330px;
  


  
}

button:hover {
  background-color: #525fe1;
  opacity: 0.8;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.login-button {
  font-size: 20px;

}

.bottom-row {
  position: relative;
  top: 10px;
}



</style>