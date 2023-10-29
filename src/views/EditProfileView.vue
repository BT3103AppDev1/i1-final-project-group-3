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
                        <input type="text" id="firstName"  :placeholder="firstNameplaceholder" />
                    </div>

                    <div id="last-name" class="input">
                        <h3>Last Name</h3>
                        <input type="text" id="lastName"  :placeholder="lastNameplaceholder" />
                    </div>

                    <div id="gender-user" class="input">
                        <h3>Gender</h3>
                        <select v-model="selectedGender" id="gender" :placeholder="genderplaceholder">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div id="email-user" class="input" >
                        <h3>Email</h3>
                        <input type="email" id="email" v-model="email" :placeholder="emailplaceholder" />
                    </div>

                    <div id="mobile" class="input">
                        <h3>Mobile Number</h3>
                        <input type="tel" id="phoneNumber" v-model="phoneNumber" :placeholder="phoneNumberplaceholder" />
                    </div>

                    <div id="major-course" class="input">
                        <h3>Major</h3>
                        <input type="text" id="major" v-model="major" :placeholder="majorplaceholder" />
                    </div>

                    <div id="year-study" class="input">
                        <h3>Year of Study</h3>
                        <select id="yearOfStudy" v-model="yearOfStudy" :placeholder="yearOfStudyplaceholder" > 
                            <option value="year1">Year 1</option>
                            <option value="year2">Year 2</option>
                            <option value="year3">Year 3</option>
                            <option value="year4">Year 4</option>
                            
                        </select>
                    </div>

                    <div id="course" class="input">
                        <h3>Current Courses</h3>
                        <input type="text" id="courses" v-model="courses" :placeholder="currentCourseplaceholder" />
                    </div>

                    <div id="describe" class="input">
                        <h3>Description</h3>
                        <input type="text" id="description" v-model="description"  :placeholder="descriptionplaceholder " />
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, collection, getFirestore, getDoc, updateDoc } from '@firebase/firestore';
import firebaseApp from '../firebase'
import { ref, onMounted } from 'vue';
import { getDatabase, update } from "firebase/database";



const db = getFirestore(firebaseApp);
const database = getDatabase(firebaseApp);

async function updateProfile(uid, updates) {
    console.log("updating profile function" );
    console.log(uid)
    console.log(updates);

    const userRef = doc(db, 'Users/' + uid);
    console.log("userRef");
    try {
        await updateDoc(userRef, updates);
        console.log("Profile updated successfully");
    } catch (error) {
        console.error("Error updating profile:", error);
    }
}



export default {
    name: "EditProfile",
    components: {
        NavBar,
        titleandImage,
    }, 

    data() {
        return {
            activeTab: 'account-content',
            userData: {
                firstName: '',
                lastName: '',
                genderplaceholder: '',
                emailplaceholder: '',
                phoneNumberplaceholder: '',
                majorplaceholder: '',
                yearOfStudyplaceholder: '',
                coursesplaceholder: '',
                descriptionplaceholder: '',
                user: null,

            },

        
       }
    },

    async mounted() {
       const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.useremail = user.email;
                this.uid = user.uid;
                this.fetchUserData(this.useremail);
                //const displayName = user.displayName;
                //console.log(displayName);
            } else {
                this.user = null;
                this.useremail = null;
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

        async navigateToSave() {
    
            console.log("updating particulars");
            var firstName = document.getElementById("firstName").value
            var lastName = document.getElementById("lastName").value
            var gender = document.getElementById("gender").value
            var email = document.getElementById("email").value
            var phoneNumber = document.getElementById("phoneNumber").value
            var major = document.getElementById("major").value
            var yearOfStudy = document.getElementById("yearOfStudy").value
            var description = document.getElementById("description").value
            var currentCourses = document.getElementById("courses").value
            var currentCoursesArray = currentCourses.split(',').map(course => course.trim());

            console.log(firstName)
            console.log(lastName)
            console.log(gender)
            console.log(email)
            console.log(phoneNumber)
            console.log(major)
            console.log(yearOfStudy)
            console.log(description)
            console.log(currentCoursesArray)

            var updates = {
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                email: email,
                phoneNumber: phoneNumber,
                major: major,
                yearOfStudy: yearOfStudy,
                description: description,
                currentCourses: currentCoursesArray

            }
            console.log("received updates");

            updateProfile(this.uid, updates);
            alert("Your profile has been updated!");
            this.$router.push({ name: 'OwnProfile' });
        },



        async fetchUserData(uid) {
            let userDocument = await getDoc(doc(db, "Users",this.uid));
            let userData = userDocument.data();
            const auth = getAuth();
            const firebaseUser = auth.currentUser;

            //const displayName = firebaseUser ? firebaseUser.displayName : null;
            let displayName;
            if (firebaseUser) {
                displayName = userData.firstName + " " + userData.lastName;
            } else {
                displayName = firebaseUser.displayName;
            }


            

            const nameParts = displayName.split(' ');
            let first = nameParts[0];
            let last =  nameParts.slice(1).join(' ');
            

                var firstNameplaceholder = first
                var lastNameplaceholder = last
                var genderplaceholder = (userData.gender)
                var emailplaceholder = (userData.email)
                var phoneNumberplaceholder= (userData.phoneNumber)
                var majorplaceholder = (userData.major)
                var yearOfStudyplaceholder = (userData.yearOfStudy)
                var descriptionplaceholder = (userData.description)
                var currentCourseplaceholder = (userData.currentCourses)

                console.log(firstNameplaceholder)
                console.log(lastNameplaceholder)
                console.log(genderplaceholder)
                console.log(emailplaceholder)
                console.log(phoneNumberplaceholder)
                console.log(majorplaceholder)
                console.log(yearOfStudyplaceholder)
                console.log(descriptionplaceholder)
                console.log(currentCourseplaceholder)

                document.getElementById("firstName").value = firstNameplaceholder
                document.getElementById("lastName").value = lastNameplaceholder
                document.getElementById("gender").value= genderplaceholder
                document.getElementById("email").value = emailplaceholder
                document.getElementById("phoneNumber").value = phoneNumberplaceholder
                document.getElementById("major").value = majorplaceholder
                document.getElementById("yearOfStudy").value = yearOfStudyplaceholder
                document.getElementById("description").value = descriptionplaceholder
                document.getElementById("courses").value = currentCourseplaceholder
                
                console.log("done")
           


            
            //var firstName = (userData.name)
            



            

            

        }, 



    }
}

</script>

<style >

.navbar {
    top:0px;
    left: 0px;
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