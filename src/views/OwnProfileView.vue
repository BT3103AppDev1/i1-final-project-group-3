<template>
  <NavigationBar class="navbar"/>
  <div class="posts-format">

    
    <button class="editprofilebutton">Edit Profile</button>

    <div class="own-profile-page-body">
      <div class="users-name">Veviana Tay</div>
      <img class="profilepicture-icon" alt="" src="../assets/profilepicture-icon.jpg" />
      <div id="post-content" class="tabcontent" style="display: block;">
        <div class="post-1">
          <div class="post-rectangle-border" />
            <div class="post-content-container">
              <p class="post-header-tag">
              <b style="font-weight: bold;">IS3103: DT Project - difficulties faced during research of a
                company</b>
              </p>
              <p class="post-header-tag">
              <b>&nbsp;</b>
              </p>
              <p class="post-header-tag">
              <b>Description: </b>
              <span
                  >My group is researching on the educational sector, but we can’t
                  find much online. Seeking advise on some websites we can use to do
                  our research!</span>
              </p>
            </div>
          <button class="edit-button"></button>
          <button class="delete-button"></button>
        </div>
        <div class="post-2">
          <div class="post-rectangle-border" />
          <div class="post-content-container">
            <p class="post-header-tag">
            <b style="font-weight: bold;">BT3103: Need help for upcoming JavaScript quiz!!!!</b>
            </p>
            <p class="post-header-tag">
            <b>&nbsp;</b>
            </p>
            <p class="post-header-tag">
            <b>Description: </b>
            <span
                >I am still confused what is the purpose of the await keyword in an
                async function?</span
            >
            </p>
          </div>
          <button class="edit-button" alt="" src="../assets/edit-icon.png"></button>
          <button class="delete-button" alt="" src="../assets/delete-icon.png"></button>
        </div>
      </div>

      <div class="about-description-format">
        <div id="about-content" class="tabcontent">
          <div class="basic-information-header">BASIC INFORMATION</div>
          <div class="academic-information-header">ACADEMIC INFORMATION</div>
          
          <div class="basic-information-container">
            <p class="basic-information">Gender: Female</p>
            <p class="basic-information">Email: test@gmail.com</p>
            <p class="basic-information">Phone number: +65 8123 4567</p>
          </div>
          <div class="academic-container">
            <p class="basic-information">Major: Business Analytics</p>
            <p class="basic-information">Year: 2</p>
            <p class="basic-information">
              Description: Hi, I aspire to become a business analyst once I graduate.
              I am an enthusiastic, self-motivated and hardworking person.
            </p>
            <p class="basic-information">
              Current course: BT3103, IS3103, GEN2004, ST2334, CS2040
            </p>
          </div>
        </div>
      </div>
    <div id="group-content" class="tabcontent">
      <div class="group-format">
      <b class="group-name">Manifesting for A+</b>
      <div class="group-description">
        We are a group of like-minded individuals trying our best to survive
        CS2030. We will suffer together, but excel as a group!!!!
      </div>
      <img
        class="studygroup-icon"
        alt=""
        src="../assets/studygroup-icon.jpg"
      />
      </div>
    </div>
  
    <hr>

    <div class="tabs">
      <button id="posts-tab" class= "tablinks" v-on:click="openSection(event, 'post-content')"> Posts
          <img class="post-icon" alt="" src="../assets/post-icon.png" />
      </button>
      
      <button id="about-tab" class= "tablinks" v-on:click="openSection(event, 'about-content')">About
          <img
          class="about-icon"
          alt=""
          src="../assets/about-icon.png"
          />
      </button>
      <button id="groups-tab" class= "tablinks" v-on:click="openSection(event, 'group-content')">Groups
          <img
          class="groups-icon"
          alt=""
          src="../assets/groups-icon.png"
          />
      </button>

    </div>
  </div>
    
  </div>

  
</template>
<script>
  import NavigationBar from '../components/NavigationBar.vue'
  export default { 
    name: "OwnProfileView",
    components: {
      NavigationBar
    },
    methods: {
      openSection(evt, section) {
        // Declare all variables
        var i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(section).style.display = "block";
        evt.currentTarget.className += " active";
      }

    }

  };
</script>
<style scoped>
  .users-name {
    position: absolute;
    top: 299px;
    left: 379px;
    font-size: var(--font-size-41xl);
    font-family: var(--font-yeseva-one);
    color: var(--color-mediumslateblue);
    display: inline-block;
    width: 36vw;
    height: 8vh;
    mix-blend-mode: normal
  }
  
    .editprofilebutton {
        position: absolute;
        top: 216px;
        left: 1200px;
        width: 203px;
        height: 63px;
        text-align: center;
        display: inline-block;
        font-weight: 600;
        font-size: var(--font-size-6xl);
        font-family: var(--font-josefin-sans);
        color: var(--color-white);
        border-radius: var(--br-21xl);
        background-color: var(--color-mediumslateblue);
        border: 1px solid var(--color-mediumslateblue);
        cursor:pointer;
    }
    .editprofilebutton:active {
    background-color:#757ddb;
    border: 1px solid #757ddb;
    }

  .profilepicture-icon {
    position: absolute;
    border-radius: 50%;
    top: 216px;
    left: 89px;
    width: 251px;
    height: 237px;
    object-fit: cover;
  }

  .post-rectangle-border {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: var(--br-4xs);
    background-color: var(--color-gray-200);
    border: 1px solid var(--color-darkgray);
    box-sizing: border-box;
    width: 950px;
    height: 154px;
  }
  .post-header-tag {
    margin: 0;
  }
  .post-content-container {
    position: absolute;
    top: 25px;
    left: 25.76px;
    display: inline-block;
    width: 822.26px;
    height: 115px;
  }
  .edit-icon{
    height: 32px;
    max-width: 100%;
  }
  .edit-button {
    background-image: url('../assets/edit-icon.png');
    background-size: cover;
    border:none;
    cursor:pointer;
    position: absolute;
    top: 25px;
    left: 851px;
    height: 32px;
    object-fit: cover;
    max-width: 100%;
    width: 30px; /* Set the width and height according to your image */
    height: 30px;
    background-color: transparent;

  }
  .delete-button {
    background-image: url("../assets/delete-icon.png");
    background-size: cover;
    position: absolute;
    cursor:pointer;
    top: 25px;
    left: 896px;
    height: 33px;
    object-fit: cover;
    max-width: 100%;
    width: 30px; /* Set the width and height according to your image */
    height: 30px;
    border:none;
    background-color: transparent;

  }
  .post-1 {
    position: absolute;
    top: 545px;
    left: 387px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 950px;
    height: 154px;
    color: var(--color-black);
  }
  .post-2 {
    position: absolute;
    top: 738px;
    left: 387px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    width: 950px;
    height: 154px;
    color: var(--color-black);
  }
  hr {
    position: absolute;
    top: 501px;
    left: 387px;
    width: 950px;
    border: 1px solid black;
  }
  .post-icon {
    position: absolute;
    top: 8px;
    left: -3px;
    width: 35px;
    height: 35px;
    object-fit: cover;
  }
  #posts-tab {
    position: absolute;
    display: inline-block;
    top: 3px;
    left: 0px;
    width: 116px;
    height: 32px;
    color: var(--color-black);
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-lgi);
    font-family: var(--font-inter);
  }

  .bold {
    font-weight: bold; /* When the button is clicked, make the text bold */
}

  .about-icon {
    position: absolute;
    top: 5px;
    left: -15px;
    width: 28.9px;
    height: 32px;
    object-fit: cover;
  }
  #about-tab {
    position: absolute;
    top: 3px;
    left: 148px;
    width: 94px;
    height: 32px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-lgi);
    font-family: var(--font-inter);
  }
  .groups-icon {
    position: absolute;
    top: 5px;
    left: -15px;
    width: 40px;
    height: 37px;
    object-fit: cover;
  }
  #groups-tab {
    position: absolute;
    top: 3px;
    left: 281px;
    width: 126px;
    height: 37px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--font-size-lgi);
    font-family: var(--font-inter);
  }
  .tabs {
    position: absolute;
    top: 438px;
    left: 220px;
    width: 392px;
    height: 37px;
    font-size: var(--font-size-lgi);
    color: var(--color-silver);
  }


.tabs button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}


.tablinks:hover {
  color: #ddd;
}

.tablinks:focus {
  font-weight: bold;
}

.tabcontent {
  display: none;
  border-top: none;
}

  .about-description-format {
    text-align: left;
    font-size: var(--font-size-xl);
    color: var(--color-black);
    font-family: var(--font-inter);
  }
  
  .posts-format {
    background-color: var(--color-white);
    text-align: left;
    font-size: var(--font-size-lg);
    color: var(--color-white);
    font-family: var(--font-inter);
  }
  .basic-information {
    margin-block-start: 0;
    margin-block-end: 8px;
  }

  .basic-information-container {
    position: absolute;
    top: 581px;
    left: 390px;
    display: inline-block;
    width: 723px;
  }
  .academic-container {
    position: absolute;
    top: 755px;
    left: 390px;
    display: inline-block;
    width: 821px;
  }
  .basic-information-header {
    position: absolute;
    top: 538px;
    left: 390px;
    font-size: var(--font-size-lg);
    color: var(--color-darkgray);
  }
  .academic-information-header {
    position: absolute;
    top: 712px;
    left: 390px;
    font-size: var(--font-size-lg);
    color: var(--color-darkgray);
  }

   .group-name {
    position: absolute;
    top: 547px;
    left: 529px;
    font-size: 27px;
    display: inline-block;
    color: var(--color-black);
    width: 369px;
    height: 30px;
  }
  .group-description {
    position: absolute;
    top: 588px;
    left: 529px;
    font-size: var(--font-size-xl);
    font-weight: 300;
    color: var(--color-black);
    display: inline-block;
    width: 781px;
  }
  .studygroup-icon {
    position: absolute;
    top: 527px;
    left: 387px;
    width: 110px;
    height: 109px;
    object-fit: cover;
  }
  .group-format {
    background-color: var(--color-white);
    text-align: left;
    font-size: var(--font-size-41xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
  }
  .navbar {
    right: 107px;
    bottom: 32px;
  }

</style>

