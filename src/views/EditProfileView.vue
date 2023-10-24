<template>
    <NavBar class="navbar"/>
    <div style="text-align: center;">

        <titleandImage/>


        <div class="content">
            <div class="toggle-tab">
                <div class="tabs">
                    <button id="account-tab" class="tablinks" v-on:click="openSection(event, 'account-content')" :class="{ active: activeTab === 'account-content' }">
                        <div class="button-content">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-invoice" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                <path d="M9 7l1 0"></path>
                                <path d="M9 13l6 0"></path>
                                <path d="M13 17l2 0"></path>
                            </svg>
                            <text>Account Details</text>
                        </div>
                    </button>

                    <span class="tab-space"></span>

                    <button id="password-tab" class= "tablinks" v-on:click="openSection(event, 'password-content')"
                            :class="{ active: activeTab === 'password-content' }">
                        <div class="button-content">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-password-user" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 17v4"></path>
                                    <path d="M10 20l4 -2"></path>
                                    <path d="M10 18l4 2"></path>
                                    <path d="M5 17v4"></path>
                                    <path d="M3 20l4 -2"></path>
                                    <path d="M3 18l4 2"></path>
                                    <path d="M19 17v4"></path>
                                    <path d="M17 20l4 -2"></path>
                                    <path d="M17 18l4 2"></path>
                                    <path d="M9 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path d="M7 14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2"></path>
                            </svg>
                            <text>Change Password</text>
                        </div>
                        
                    </button>
                    <span class="tab-space"></span>

                    <button id="blocked-tab" class= "tablinks" v-on:click="openSection(event, 'blocked-content')"
                            :class="{ active: activeTab === 'blocked-content' }">
                        <div class="button-content"> 
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users-group" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
                                <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
                                <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
                            </svg>
                            <text>Blocked Users</text> 
                        </div>   
                        
                    </button>

                </div>

            </div>

            <div class="tab-content">
                <div id="account-content" class="tabcontent" v-show="activeTab === 'account-content'">

                    <div class="buttons" v-show="activeTab === 'account-content'">
                        <button class="cancel" @click="navigateToCancel"> Cancel </button>
                        <button class="save-profile" @click="navigateToSave"> Save Profile</button>
                    </div>

                    <div id="first-name" class="input">
                        <h3>First Name</h3>
                        <input type="text" v-model="firstName" placeholder="Veviana" />
                    </div>

                    <div id="last-name" class="input">
                        <h3>Last Name</h3>
                        <input type="text" v-model="lastName" placeholder="Tay" />
                    </div>

                    <div id="gender" class="input">
                        <h3>Gender</h3>
                        <select v-model="selectedGender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div id="email" class="input">
                        <h3>Email</h3>
                        <input type="email" v-model="email" placeholder="vevianatay@gmail.com" />
                    </div>

                    <div id="mobile" class="input">
                        <h3>Mobile Number</h3>
                        <input type="tel" v-model="phoneNumber" placeholder="+65 8123 4567" />
                    </div>

                    <div id="major" class="input">
                        <h3>Major</h3>
                        <input type="text" v-model="course" placeholder="Business Analytics" />
                    </div>

                    <div id="year-study" class="input">
                        <h3>Year of Study</h3>
                        <input type="number" v-model="yearOfStudy" placeholder="2" />
                    </div>

                    <div id="course" class="input">
                        <h3>Current Courses</h3>
                        <input type="text" v-model="courses" placeholder="BT3103, BT3102, CS2040" />
                    </div>

                    <div id="description" class="input">
                        <h3>Description</h3>
                        <input type="text" v-model="description" id="description" placeholder="Hi, I aspire to become a business analyst once I graduate. I am an enthusiastic, self-motivated and hardworking person." />
                    </div>

                </div>

                <div id="password-content" class="tabcontent" v-show="activeTab === 'password-content'">

                    <div id="old-password" class="password"> 
                        <h3>Old Password: </h3>
                        <input type="password" v-model="password" placeholder="Enter your old password" /> 
                    </div>

                    <div id="new-password" class="password"> 
                        <h3>New Password: </h3>
                        <input type="password" v-model="password" placeholder="Enter your new password" /> 
                    </div>

                    <div id="confirm-password" class="password"> 
                        <h3>Confirm New Password: </h3>
                        <input type="password" v-model="password" placeholder="Confirm your new password" /> 
                    </div>

                    <div class="password-buttons" v-show="activeTab === 'password-content'">
                        <button class="save-profile" @click="navigateToSave"> Save</button>
                    </div>

                </div>

                <div id="blocked-content" class="tabcontent" v-show="activeTab === 'blocked-content'">
                    <h1>hello2</h1>

                </div>



            </div>


        </div>


        
       
        

    
    </div>
    
</template>

<script>
import NavBar from '@/components/NavigationBar.vue';
import titleandImage from '../components/titleandImage.vue';
import firebaseApp from '../firebase.js';
import {getAuth} from "firebase/auth";

export default {
    name: "EditProfile",
    components: {
        NavBar,
        titleandImage,
    }, 

    data() {
        return {
            activeTab: 'account-content',
            user: false,
        }
    },

    mounted() {
        const auth =getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },

    methods: { 
        openSection(evt, section) {
                
            this.activeTab = section;
        },
        
        created() {
            // Open the default tab when the component is created
            this.openSection('account-content');
        },

        navigateToCancel() {
            this.$router.push({ name: 'OwnProfile' });
        },

        navigateToSave() {
            alert("Updated!");
        },



    }
}

</script>

<style>

.navbar {
    top:-32px;
    left: -32px;
}


h1 {
    color: #525fe1;
    margin-left: 150px;
    font-size: 60px;
}

h3 {
    font-family: inter;
    color: black;
    font-size: 18px;
    

}


.buttons, .password-buttons {
    display: flex;
    justify-content: flex-end; 
    padding: 10px 0;
    margin-right: 50px; 
    margin-top: 50px;
    
}

.buttons {
    position: absolute;
    top: 140px;
    right: -30px;
}

.buttons button, 
.password-buttons button {
    padding: 10px 20px; 
    border-radius: 5px; 
    font-size: 16px;
    cursor: pointer; 
    transition: background-color 0.3s; /* Smooth transition for hover effects */
    margin: 0 20px;
    width: 203px;
    height: 63px;
    border-radius: 40px;
    font-family: josefin sans;
    font-size: 25px;
}

.tab-space {
    width: 200px; /* Adjust the width to control the space between buttons */
}


.cancel {
    background-color: white; 
    color: #525fe1; /* Text color */
    margin-right: 10px;
    border: 2px solid #525fe1;

}

.cancel:hover {
    background-color: #525fe1;
    color: white; /* Text color */
    border: 2px solid #525fe1;
}

/* Save profile button specific styles */
.save-profile {
    background-color: #525fe1;
    color: white; /* Text color */
    border: 2px solid #525fe1;
}

.save-profile:hover {
    background-color: #3b44a2;
    color: white; /* Text color */
    border: 2px solid #3b44a2; /* hover color */
}

.image-and-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: -50px;

    
}

.profile-image {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    margin-left: 100px;
}

.camera-upload {
    background-color: #525fe1;
    fill: white;
    stroke: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    margin-left: -90px;
    position: relative;
    top:-20px;
    
    
    
}

.content {
    margin-top: -100px;
    
    
}



.tabs {
    margin-left: 340px;
    
}

.tabs button {
    background-color: white;
    border: white;
    font-family: inter;
    font-weight: bold;
    font-size: 19px;
    padding-right: 40px;

    
}



.tab-content {
    width: 50%;
    margin-left: 460px;
    margin-top: 30px;
    
}


.tablinks.active text, 
.tablinks.active svg{
    stroke: #525fe1;
    font-weight: bold; /* Set the font weight for the active tab */
    color: #525fe1; /* Set the active tab text color */
    
}




.button-content {
    display: flex;
    align-items: center;
    color: #b6b6b6;
    padding-bottom: 10px;
}

.button-content text {
    padding-left:10px;
    font-weight:lighter;
}

.button-content:hover {
    color: #525fe1;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    border-bottom: 2px solid #525fe1;
}


.input {
    padding-bottom: 30px;
    
}

.input h3 {
    text-align: left;
    padding-bottom: 10px;
    font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
input[type="password"],
select{
    width: 100%; /* Full-width input */
    padding: 10px;
    border: 1px solid #ddd; /* Border color */
    border-radius: 5px;
    height: 55px;
    font-size: 15px;

}

input[id="description"] {
    height: 90px;
    resize: vertical;
}

#description input[type="text"]::placeholder {
    text-align: left; /* Align the placeholder text to the left */
    white-space: pre-line;
    line-height: 2;
}


.password {
    margin: 10px 0;
    padding-bottom: 20px;

}

.password h3 {
    font-size: 18px;
    margin-bottom: 5px;
    text-align: left;
    padding-bottom: 10px;
}

.password-buttons {
    text-align: center; /* Align the buttons to the right */
    margin-top: 20px;
    margin-right: 200px; /* Add some space between inputs and buttons */
}

.password-buttons button {
    margin-left: 10px; /* Add space between buttons */
}


#account-tab {
    position: relative;
    top: 2px;
}













</style>