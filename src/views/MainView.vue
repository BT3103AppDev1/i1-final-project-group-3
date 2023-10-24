<template>
  
  <div class="home-page-before-login">

    <div class="rectangle-parent">
      <div class="rectangle-group">
        <button class="login" @click="navigateToLogin">Login</button>
        <b class="studybuddy">StudyBuddy</b>
      </div>

      <div>
        <h1 class="welcome">Welcome!</h1>
        <div class="are-you-ready">Are you ready to find your match?</div>


      </div>

      
    </div>

    <div class="bottom-half">

      <div class="what-is-studybuddy-parent">
        <div class="what-is-studybuddy">What is StudyBuddy?</div>

        <div class="platform-to-help">
          Platform to help students find their study partner, upload questions and
          seek help!
        </div>
        <button class="get-started" @click="navigateToLogin">Get Started!</button>


      </div>

      <div id="benefit1" class="rectangle-parent-benefit">
        
          <img
            class="chat-image"
            alt=""
            src="../assets/chat.png"
            style="float: left; margin-right: 10px;"
          />
          <div class="chat-feature-to">
            Chat feature to find study groups or arrange study sessions
          </div>

      </div>


      <div class="rectangle-parent-benefit" id="benefit2">
        
        <img
          class="friends-image"
          alt=""
          src="../assets/friends.png"
        />
        <div class="new-friendships">New friendships!</div>
      </div>

      <div class="rectangle-parent-benefit" id="benefit3">
        
        <img
          class="upload-image"
          alt=""
          src="../assets/upload.png"
        />

        <div class="upload-homework-questions">
          Upload homework questions you are struggling with
        </div>
      </div>

      <div class="rectangle-parent-benefit" id="benefit4">      
        
        <img
          class="connect-image"
          alt=""
          src="../assets/connect.png"
        />
        <div class="connect-with-over">
          Connect with over 10000 school mates in NUS! Find friends in the same
          modules/course
        </div>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "MainView",

    methods: {
      navigateToLogin() {
        this.$router.push({ name: 'Login' });
      }
    }, 
  });
</script>

<style scoped>
  h1 {
    font-family: var(--font-yeseva-one);
    font-weight: 800;
    font-size: 130px;
    color: white;

  }

  div {
    font-family: josefin sans;
  }

  .bottom-half {
    height: 1100px;
  }
  .rectangle-parent {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 533px;
    text-align: center;
    color: white;
    background-color: #525fe1;
  }

  button {
    background-color: #f86f03;
    border-radius: 40px;
    border: none;
    color: white;
    font-family: var(--font-josefin-sans);
    cursor: pointer;
    
    
  }

  .login {
    position: absolute;
    top: 35px;
    right: 175px;
    font-size: 20px;
    width: 134px;
    height: 37px;
    padding-top: 3px;
    

  }

  .welcome {
    position: center;
    padding-top: 190px;
    font-size: 160px;
    font-weight: 300;
    mix-blend-mode: normal;
  }
  .are-you-ready {
    position: relative;
    font-size: 30px;
    font-weight: 500;
    left:35px;
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

  .what-is-studybuddy-parent {
    position: absolute;
    top: 590px;
    left: 55px;
    width: 399px;
    height: 348px;
    font-size: 60px;
  }
  .what-is-studybuddy {
    position: absolute;
    left: 0px;
    font-family: var(--font-yeseva-one);
    display: inline-block;
    width: 399px;
    height: 164px;
    mix-blend-mode: normal;
    color: var(--vt-c-black);
  }

  .platform-to-help {
    position: absolute;
    top: 170px;
    left: 0px;
    font-size: 20px;
    line-height: 30px;
    font-weight: 500;
    color: #7b7b7b;
    display: flex;
    align-items: center;
    width: 297px;
    height: 91px;
    
  }

  .get-started {
    position: absolute;
    top: 280px;
    left: 30px;
    font-weight: 600;
    display: inline-block;
    width: 160px;
    height: 47px;
    font-weight: 600;
    font-size: 22px;
    padding-top: 5px;
    text-align: center;
    background-color: var(--color-darkorange);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid var(--color-darkorange);
  }

  .rectangle-parent-benefit {
    position: absolute;
    top: 600px;
    display:flex;
    text-align: center;
    font-size: var(--font-size-3xl);
    color: var(--color-black);
    border-radius: var(--br-21xl);
    background: linear-gradient(180deg, #fff, rgba(255, 255, 255, 0));
    box-shadow: 15px 30px 30px 5px rgba(0, 0, 0, 0.25);
    border: 1px solid var(--color-white);
    box-sizing: border-box;
    width: 410px;
    height: 171px;
    margin-bottom: 40px;
    
  }

  #benefit1 {
    position: absolute;
    top: 810px;
    left: 500px;
    line-height: 30px;
    font-weight: 600;
    align-items: center;
    justify-content: space-between;
    padding-top:3px;
    padding-left: 10px;
    
    
    
  }

  #benefit1 img {
    float: left;
    width: 116px;
    height: 129px;
  }

  .chat-feature-to, 
  .new-friendships, 
  .upload-homework-questions, 
  .connect-with-over {
    font-size: 20px;
    text-align: left;
    font-weight: 500;
    padding-left: 10px;
  }

  #benefit2 {
    position: absolute;
    top: 810px;
    left: 990px;
    align-items: center;
    padding-top:3px;
    padding-left: 30px;
    display: flex;
  }

  #benefit2 img {
    width: 190px;
    height: 140px;
    margin: 10px 0;

  }

  #benefit3 {
    position: absolute;
    top: 575px;
    left: 500px;
    align-items: center;
    padding-top:3px;
    padding-left: 30px;
    display: flex;
    line-height: 30px;
  }

  #benefit3 img {
    width: 160px;
    height: 139px;
    margin: 10px 0;

  }

  #benefit4 {
    position: absolute;
    top: 575px;
    left: 990px;
    align-items: center;
    padding-top:10px;
    padding-left: 10px;
    display: flex;
    line-height: 30px;
  }

  #benefit4 img {
    width: 131px;
    height: 104px;
    margin-top: 10px;

  }





  
</style>
