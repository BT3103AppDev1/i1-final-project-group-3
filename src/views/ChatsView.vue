<template>
    <NavigationBar class="navbar"/>
    <div class="hello"> 
        <h1>Chat Page</h1>
        <ChatWindow :chatID = "chat" />
    </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue';
import ChatWindow from '@/components/ChatWindow.vue';

export default {
    name: "Chat",
    
    components: {
      NavigationBar,
      ChatWindow,
    },
    data() {
        return {
            chat: "81tjP5n0p9AZH51zdgai",
        }
    }
}
</script>

<style scoped>
.navbar {
    top:0px;
    left:0px;
}

h4 {
  color: black
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

#profiles {
  display: flex;
  flex-direction: row;

}




</style>
