<template>
    <NavigationBar class="navbar"/>
    <div class = "profile-and-groups">

      <div class="chat-tabs">
        <button id="chat-profiles" class="chat-tab" @click="navigateToProfiles">
          Profiles
        </button>

        <button id="chat-groups" class="chat-tabs"  >
            Groups
        </button>

      </div>

      <div class="chats">
        

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
      navigateToProfiles() {
        this.$router.push({ name: 'Chat' });
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
    
    margin-right: 90px;

    border: 2px solid #525fe1;
    background-color: transparent;
    color: #525fe1;
    border-radius: 2rem;
    cursor: pointer;
    font-family: var(--font-yeseva-one);
}

 

#chat-groups {

    font-weight: 600;
    font-size: 1.3rem;

    width: 11rem;
    height: 3.4rem;
    background-color: #525fe1;
    border-radius: 2rem;
    border: none;
    color: white;
    cursor: pointer;
    font-family: var(--font-yeseva-one);

}




</style>
