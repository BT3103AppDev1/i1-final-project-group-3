<template>
  <div class="rectangle-parent">
    <img src="../assets/icon.jpg" alt="" class="logo">
      <h1 class="login-main">Login</h1>
      <div class="studybuddy"  @click="navigateToMainView">StudyBuddy</div>
      <div class="create-account">Don't have an account? <em class="sign-up" @click="navigateToRegistration"> Sign up here </em></div>

  </div>




</template>

<script>

export default {
  name: "LoginBanner",

  methods: {
      navigateToRegistration() {
          this.$router.push({ name: "Registration" });
      },
      navigateToMainView() {
          this.$router.push({ name: "MainView" });
      },
  },
}



</script>

<style scoped>

.logo {
  position: relative;
  top: 25px;
  left: -630px;
  height: 100px;
  width: 100px;
}

h1 {
color: white; 
position: relative;
left: -35px;
}
.rectangle-parent {
position: absolute;
top: 0px;
left: 0px;
width: 100%;
height: 450px;
text-align: center;
color: white;
background-color: #525fe1;

}

.studybuddy {
position: absolute;
top: 60px;
left: 160px;
font-size: 48px;
font-weight: 700;
width: 40px;
height: 40px;
}

.studybuddy:hover {
cursor: pointer;
}

.login-main{
position: center;
padding-top: 120px;
font-size: 100px;
width: 300px;
margin-left: 600px;


}

.create-account {
position: center;
font-size: 24px;
font-weight: 500;
margin-top: 25px;
}

.sign-up {
color: white;
text-decoration: underline;
font-style: italic;
cursor: pointer;
}



</style>