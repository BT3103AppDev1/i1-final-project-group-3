<template>
  <div class="home-profiles-page">
     <div class = "top-half">
        <div class="top-container" /> 
     
        <NavigationBar/>

            <img class="profile-image" alt = "" src="../assets/profile_picture.jpg" />

            <div class="welcome-message">Welcome <br> back, Veviana</div>

            <div class="subtag">How are we feeling today?</div>
     </div>
       
    <div class = "bottom-half">
        <div class="discover-header">
            <h1 id = "study-buddy-header">Find your StudyBuddy today!</h1>
            <h2 id = "profiles-and-groups">Profiles and Groups for you to discover</h2>
        <div id="app">
            <input id="search-input" type="text" placeholder="Search using Keywords: BT3103/ Business Analytics">
             <img class="search-icon"  @click="search" alt = "" src="../assets/search.png" />
          
            <!--<button class="search-button" @click="search">Search</button>-->
        </div>
      </div>
      <div class = "display-of-profiles-and-groups">
        <button class="profiles"  @click="navigateToProfiles">Profiles</button>
        <button class="groups"  @click="navigateToGroups">Groups</button>
      </div>
    </div> 
    </div>
  
</template>




<script>
  import { defineComponent } from "vue";
  import NavigationBar from '../components/NavigationBar.vue'
 
  

  export default defineComponent({
    name: "HomePageAfterLogin",
    components: {
      NavigationBar
    }
  });

  
</script>





<style scoped>
 

  .top-container {
    position: absolute;
    background-color: #525fe1;
    width: 100%;
    height: 40rem;
  }
 


  .profile-image {
    position: absolute;
    top: 10.44rem;
    left: 54.81rem;
    border-radius: 50%;
    width: 25rem;
    height: 25rem;
    object-fit: cover;
  }


 
 

  .profiles {
    position: absolute;
    top: 62rem;
    left: 32rem;
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    width: 10rem;
    height: 3rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
  }


  .groups {
    position: absolute;
    top: 62rem;
    left: 48rem;
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    width: 10rem;
    height: 3rem;
    border: 2px solid #525fe1;
    background-color: transparent;
    color: #525fe1;
    border-radius: 2rem;
    cursor: pointer;
    

}


.groups:hover {
    background-color: #f6f3f3;
}

  .routers {
    color: white;
    font-family: sans-serif;
  }


  
  
  .log-out {
    position: absolute;
    top: 4.7rem;
    left: 78rem;
    font-weight: 600;
    font-size: 1rem;
    display: inline-block;
    width: 8rem;
    height: 2.4rem;
    background-color: #f86f03;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
  }

  .profile {
    position: absolute;
    top: 5.13rem;
    left: 67.38rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem; 
    
  }

  .chats {
    position: absolute;
    top: 5.13rem;
    left: 59rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem;
  }

  .posts {
    position: absolute;
    top: 5.13rem;
    left: 50.63rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem;
  }

  .home {
    position: absolute;
    top: 5.25rem;
    left: 43.38rem;
    font-weight: 600;
    display: inline-block;
    width: 8.38rem;
    height: 2.31rem;
  }

 


 

  .studybuddy {
    position: absolute;
    top: 4rem;
    left: 1rem;
    font-size: 3rem;
    display: inline-block;
    width: 25rem;
    height: 2.5rem;
    color: white;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  }




  
  .welcome-message {
    position: absolute;
    top: 14.19rem;
    left: 5.56rem;
    font-size: 6.25rem;
    font-family: 'Yeseva One';
    display: inline-block;
    width: 45.06rem;
    height: 15.56rem;
    color: white;
  }

  .subtag {
    position: absolute;
    top: 29.75rem;
    left: 12.19rem;
    font-size: 2rem;
    font-weight: 600;
    display: inline-block;
    width: 31.81rem;
    height: 2.88rem;
    font-family: 'Yeseva One';
    color: white;
  }

 

  #study-buddy-header {
    font-family: 'Yeseva One';
    font-size: 3rem;
    text-align: center;
    color: black;
  }

  .discover-header {
    position: absolute; 
    width: 100%;
    height: 40rem;
    top: 44rem;
  }

  #profiles-and-groups {
    font-family: 'Yeseva One';
    font-size:1.5rem;
    margin-top: 2rem;
    text-align: center;
    color: darkgray;
  }
 


#search-input {
    width: 50%;
    padding: 3rem 3rem;
    margin-right: 1rem;
    outline: 0;
    border: 0.01rem solid transparent;
    border-bottom: 0.01rem solid #575756;
    padding-bottom: 0.01rem;
    border-radius: 0;
    background-color: transparent;
    transition: border-color 0.3s;
    font-size: 1.3rem;
    line-height: 3rem;
    color: #575756; 
    font-style: italic;
}


#app {
    display: flex;
    justify-content: center;
    align-items: center; 
}

.search-button {
    padding: 1rem 2rem;
    font-size: 1rem; 
    background-color: #525fe1;;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 6rem;
    text-align: center;
    transition: background-color 0.3s;
}

.search-button:hover {
    background-color: #45a049;
}

.search-icon {
  position: absolute;
  top: 11.8rem;
  left: 64rem; 
  transform: translateY(-50%);
  cursor: pointer; 
  width: 1.5rem;
  height: 1.5rem; 
}
 

 


.home-profiles-page { 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    overflow-y: auto;
    position: fixed;
    font-size: var(--font-size-lg);
    color: var(--color-black);
    font-family: var(--font-inter);
  }
 

</style>
