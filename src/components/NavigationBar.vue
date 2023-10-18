<template>
  <div id="logged" style="align-self: center;" >
      <b class="studybuddy" >StudyBuddy</b>
      <div id="nav">
          <router-link to="/home">Home</router-link>
          <router-link to="/about">Posts</router-link>    
          <router-link to="/Chats">Chats</router-link>
          <router-link to="/Profile">Profile</router-link>
          <button>Log Out</button>

      </div>
  
  </div>
</template>

<script>
import {getAuth, onAuthStateChanged} from "firebase/auth";
export default {
  name:'NavBar',
  
}


</script>

<style scoped>

#logged {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  background-color: #525fe1;  
  padding: 20px; 
  width: 100vw;
  height: 165px;
  align-self: left;
  position: relative;
  
}

.studybuddy {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-family: josefin sans;
  top: 30px;
  padding-left: 20px;
  
}


#nav {
  display: flex; /* To make router-links line up horizontally */
  font-size: 22px;
  font-family: josefin sans;
  margin-right: 20px;

}

#nav a {
  color: #fff;
  text-decoration: none;
  margin: 0 30px;
  transition: color 0.3s;
}

#nav a:hover {
  color: #ddd;
}

button {
  background-color: #f86f03;
  border-radius: 40px;
  border: none;
  color: white;
  font-family: var(--font-josefin-sans);
  cursor: pointer;
  width: 130px;
  height: 49px;
  font-size: 22px;
  margin-top: -19px;
  margin-left:2px;

  


  
}

</style>

