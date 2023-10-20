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
            
            </div>
            
        </div>

      <div class = "display-of-profiles-and-groups">
        
        <button class="profiles" @click="navigateToProfiles">Profiles</button>
        <button class="groups">Groups</button>
        
      
      </div>

      <!--<div class = "display-all-profile-cards">
          <div class="profile-card">
            <img class="profile-image-on-card" src="../assets/profile_picture.jpg" alt="Profile 1">
            <h1 id = "profile-name">Steffi Lim</h1>
            <h3 id = "profile-major-and-year">Business Analytics, Year 2</h3>
            <h3 id = "profile-description">Hi, I aspire to become a business analyst once i graduate. I am an enthusiastic, self-motivated, and hardworking person.</h3> 
 
        </div> -->

        <div class = "display-all-profile-cards">
          <div class="profile-card">
            <img class="profile-image-on-card" src="../assets/profile_picture.jpg" alt="Profile 1">
            <!--
            <h1 id = "profile-name">{{ profile.name }}</h1>
            <h3 id = "profile-major-and-year">{{profile.major}}, {{profile.yearOfStudy}}</h3>
            <h3 id = "profile-description">{{profile.description}}</h3> -->
 
        </div>
 
 
        
          
        
      
      </div>



   
  

 












    </div> 
    </div>
  
</template>




<script>
  import { defineComponent } from "vue";
  import NavigationBar from '../components/NavigationBar.vue'
 
  

  export default defineComponent({
    name: "HomeGroups",
    components: {
      NavigationBar
    },
    methods: {
      navigateToProfiles() {
        this.$router.push({ name: 'Home' });
      }
    }, 
  });
  

  
</script>





<style scoped>

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
    color: black; 
    text-align: center;
    width:100%;
    margin: 0;
    padding: 0;
 
  }

  .discover-header {
    position: absolute; 
    width: 100%;
    text-align: left;
    height: 40rem;
    top: 44rem;
    margin: 0;
    padding: 0;
    
  }

  #profiles-and-groups {
    font-family: 'Yeseva One';
    font-size:1.5rem;
    margin-top: 4rem;
    text-align: center;
    color: darkgray;
    
 
  }
 


#search-input {
    width: 50%;
    padding: 1rem 1rem;
    margin-right: 1rem;
  
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
    width: 100%;
    text-align: center;
    align-items: center; 
    padding-top: 0rem; 
    
    
}
 
 

.search-icon {
  position: absolute;
  top: 10.1em;
  left: 64rem; 
  transform: translateY(-50%);
  cursor: pointer; 
  width: 1.5rem;
  height: 1.5rem; 
}



 .display-of-profiles-and-groups {
    position: absolute; 
    width: 100%;
    text-align: left;
    height: 40rem;
    top: 60rem;
    margin: 0;
    padding: 0; 
    
  }
 

 
  .groups {
    position: absolute;
    left: 52rem;
    font-weight: 600;
    font-size: 1.3rem;
    display: inline-block;
    width: 11rem;
    height: 3.4rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
  }

 

  .profiles {
    position: absolute;
    left: 32rem;
    font-weight: 600;
    font-size: 1.3rem;
    display: inline-block;
    width: 11rem;
    height: 3.4rem;
    border: 2px solid #525fe1;
    background-color: transparent;
    color: #525fe1;
    border-radius: 2rem;
    cursor: pointer;

}


 .display-all-profile-cards {
    position: absolute; 
    width: 100%;
    text-align: left;
    height: 40rem;
    top: 67rem;
    margin: 0;
 
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  
    padding: 20px;
    
  }

  .profile-card {
    width:20rem;
    height: 26rem;
    margin: 10px; /* Adjust the margin between cards */
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 1.3rem;
    padding: 0;
 
  
}

.profile-image-on-card {
    width: 85%;
    height: 11.4rem; 
    object-fit: cover; 
    margin: 1.5rem 0;  
    border-radius: 0.7rem;
    margin-top: 1.5rem;
}

     
#profile-name {
    font-size: 1.5rem;  
    width:100%;
    margin: 0px; 
    
    
}

#profile-major-and-year {
    font-size: 1rem;
    margin: 0.7rem;
    width: 100%;
    text-align: center;  
    color: #525fe1; 
    
}

#profile-description {
    width: 100%;
    box-sizing: border-box;
    font-size: 1rem;
    padding:0.9rem; 
 
    
}
 
 
 


 

</style>
