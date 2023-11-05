<template>
    <NavigationBar class="navbar"/>
    <div class = "profile-and-groups">

      <div class="chat-tabs">
        <button id="chat-profiles" class="chat-tab">
          Profiles
        </button>

        <button id="chat-groups" class="chat-tabs" @click="navigateToChatGroups" >
            Groups
        </button>

      </div>

      <div class="chats">
        <div class="profile-card" v-for="profile in profiles" :key="profile.name" @click ="navigateToProfile(profile.name)">
        
            <img class="profile-image-on-card" :src="profile.profilePicture" alt=""> 
        
            <h1 id = "profile-name" >{{ profile.name }}</h1>
            <h3 id = "profile-major-and-year">{{profile.major}}, Year {{profile.yearOfStudy}}</h3>
            <h3 id = "profile-description">{{profile.description}}</h3> 
          </div>

      </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase';
import NavigationBar from '@/components/navigationbar.vue';

export default {
    name: "Chat",
    
    components: {
      NavigationBar, 

    },

    methods: {
      navigateToChatGroups() {
        this.$router.push({ name: 'ChatGroups' });
      },

      openSection(evt, section) {
                
        this.activeTab = section;
      },

    }
}
</script>

<style scoped>
.navbar {
    top:0px;
    left:0px;
}



.profile-and-groups {
    display: flex;
    height: 300px;
    top: 20rem;
    padding-left: 90px;
    justify-content: left;
    align-items: center;
    
}


#chat-profiles {
    font-weight: 600;
    font-size: 1.3rem;
    width: 11rem;
    height: 3.4rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    font-family: var(--font-yeseva-one);
    margin-right: 90px;
    transition: background 0.5s ease-in-out;
    background-size: 200% 100%;
    background-position: right bottom;
  }



 

  #chat-groups {

    font-weight: 600;
    font-size: 1.3rem;
    color:#525fe1;
    border: 2px solid #525fe1;
    border-radius: 2rem;
    width: 11rem;
    height: 3.4rem;
    background-image: linear-gradient(to left, white 50%, #525fe1 50%);
    transition: background 0.5s ease-in-out;
    background-size: 200% 100%;
    background-position: right bottom;
    cursor: pointer;
    font-family: var(--font-yeseva-one);
    
    

}

#chat-groups:hover {
  background-color: #525fe1;
  color: white;
  transition: 1s;
  background-position: left bottom;


}




</style>
