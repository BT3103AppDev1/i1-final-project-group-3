<template>
  <div id="logged" >
    <img src="../assets/icon.jpg" alt="" class="logo">
      <b class="studybuddy" >StudyBuddy</b>
      <div id="nav">
          <router-link to="/home">Home</router-link>
          <router-link to="/post">Posts</router-link>    
          <router-link to="/chat">Chats</router-link>
          <router-link to="/ownprofile">Profile</router-link>
          <Logout id="logout-button"/>
      </div>
  
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue'


export default {
  name:'NavBar',
  components: {
    Logout
  }
  
}


</script>

<style scoped>
.logo {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-top: -10px;
  margin-left: 20px;

}

#logged {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  background-color: #525fe1;  
  padding: 20px; 
  width: 100vw;
  height: 165px;
  align-self: left;
  position: sticky;
  
}

.studybuddy {
  color: #fff;
  font-size: 48px;
  font-weight: 700;
  font-family: josefin sans;
  top: 30px;
  margin-left: -360px;
  
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

