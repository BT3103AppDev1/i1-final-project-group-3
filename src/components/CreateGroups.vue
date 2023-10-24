<!--<template>
  <div class="create-group-page">

    <div class = "top-half">
        <NavigationBar/>
    </div>


      <div class="modal" v-if="showModal">
            <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Create a Group</h2>
     
            <form @submit.prevent="createGroup">
          

                <button type="submit">Create Group</button>
            </form>
            </div>
  </div>
  </div>



     <div class = "create-form">
        <div class="form-box">
            <h1 class = "create-header">Create a group!</h1> 
            <form @submit = "submitGroupForm">

                <label for="group-name" class = "group-name"><b>Group Title:</b></label> <br><br>
                <input id="group-name" type="text" name="group-name" placeholder="example: GPA 6.0">
               
               <br>
               <br>
                
                <label for="description" class = "description"><b>Group Description:</b></label>  <br><br>
                <input id="description" type="text" name="description" placeholder="example: lets study BT3103 together!">

                <br>
                <br>
                
                <label for="members-count" class="members-count"><b>Number of Members:</b></label>  
                <input id="members-count" type="number" name="members" max = "5">

               <br>
               <br>

                <button class="create-group-button" @click="navigateToCreateGroup">Create!</button>
  
            </form>
        </div>
</template>




<script>
  import { defineComponent } from "vue";
   import NavigationBar from '../components/NavigationBar.vue'

  export default defineComponent({
    name: "CreateGroups",

    components: {
      NavigationBar
    },

    data() {
        return {
            showModal: false
        };
    },
      methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    createGroup() {
      // Logic to handle group creation (send API request, etc.)
      // After successful creation, you can close the modal
      this.closeModal();
    },
  },
});
</script> -->


    
 


<!--
//START HERE IS WORKING OKAY
<template>
  <div class="popup-form">
    <h2>Create a New Group</h2>
    <form @submit.prevent="submitForm">
      <label for="groupTitle">Group Title:</label>
      <input v-model="groupTitle" type="text" id="groupTitle" required>
      
      <label for="groupDescription">Group Description:</label>
      <textarea v-model="groupDescription" id="groupDescription" required></textarea>
      
      <label for="numMembers">Number of Members:</label>
      <input v-model="numMembers" type="number" id="numMembers" required>
      
      <button type="submit">Create Group</button>
    </form>
  </div>
</template>-->

<template>
   <div class = "create-form">
        <div class="form-box">
            <h1 class = "create-header">Create a group!</h1> 
            <form @submit.prevent="submitForm">

                <label for="group-name" class = "group-name"><b>Group Title:</b></label> <br><br>
                <input v-model="groupTitle" id="group-name" type="text" name="group-name" placeholder="example: GPA 6.0" required>
               
               <br>
               <br>
                
                <label for="description" class = "description"><b>Group Description:</b></label>  <br><br>
                <textarea v-model="description" id="description" placeholder="example: lets study BT3103 together!" required></textarea>
    
                <br>
                <br>
                
                <label for="members-count" class="members-count"><b>Number of Members:</b></label>  
                <input v-model= "membersCount" type="number" id="members" max = "5" required>
            

               <br>
               <br>

                <button type = "submit" class="create-group-button" @click="navigateToCreateGroup">Create!</button>
  
            </form>
        </div>
   </div>
</template>




 

<script>
export default {
  data() {
    return {
      groupTitle: "",
      groupDescription: "",
      numMembers: null
    };
  },
  methods: {
    submitForm() {
 
      this.$emit("create-group", {
        title: this.groupTitle,
        description: this.groupDescription,
        members: this.numMembers
      }); 
     
      this.groupTitle = "";
      this.groupDescription = "";
      this.numMembers = null;
    }
  }
};
</script>

 


<style scoped>


.create-group-page {
    position: relative; 
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 100vh; /* Set a minimum height to ensure the page takes at least the full viewport height */
    overflow-y: auto; /* Allow vertical scrolling when content exceeds container height */
  
    text-align: center;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
}
 

  

body {
  background: #f7f7f7;
}
 
 
  .form-box {
  position: absolute;
  width: 50%;
  margin: auto;
  padding: 50px;
  border: 0.01rem solid lightgray;
  height: 38rem;
  top: 14rem;
  left: 50%; /* Center the form box horizontally */
  transform: translateX(-50%); /* Center the form box horizontally */
  border-radius: 2rem;
  text-align: left;
  background-color: white;
  z-index: 999; /* Set a high z-index value to ensure the form box appears on top */
}


  .group-name, .description, .members-count {
  text-align: left;
    font-size: 2rem;
    color: rgb(101, 100, 100);
    margin-left: 4rem;  
    

  }

  #group-name, #description {
    text-align: left;
    font-size: 1.2rem;
    color:rgb(101, 100, 100);
    margin-left:4rem;
    border: none;
    outline: none;
    width: 80%;
    border-bottom: 0.1rem solid #575756;
    margin-top: 0.01rem;
    font-family: 'Yeseva One';
    width: 80%; 

    
  }

  #membersCount { 
    text-align: left;
    font-size: 1.2rem;
    color:rgb(101, 100, 100);
    margin-left:1rem;
    border: none;
    outline: none;
    width: 80%;
    border-bottom: 0.1rem solid #575756;
    margin-top: 0.01rem;
    font-family: 'Yeseva One';
    width: 10%; 
  }

    


h1, p {
  text-align: center;
}

input, textarea {
  width: 100%;
}




.create-group-page {
    position: relative;
    background-color: var(--color-white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    min-height: 100vh; /* Set a minimum height to ensure the page takes at least the full viewport height */
    overflow-y: auto; /* Allow vertical scrolling when content exceeds container height */
    text-align: center;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
}
 

.create-group-button {
    position: absolute;
    top: 32rem;
    left: 23rem;
    font-weight: 600;
    font-size: 1.4rem;
    display: inline-block;
    width: 10rem;
    height: 3rem;
    border: 2px solid #525fe1;
    background-color: #525fe1;
    border-radius: 2rem;
    color: white;
    font-family: 'Yeseva One';
    cursor: pointer;
    
    
}
 

 
.create-group-button:hover {
    background-color: #4d58d0;
}






.modal {
  display: none;
  position: fixed;
  z-index: 999; /* Set a high z-index value to ensure the modal appears on top of other content */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  z-index: 1000; /* Set a higher z-index value than the modal's parent */
}




 
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}



 




</style>
      