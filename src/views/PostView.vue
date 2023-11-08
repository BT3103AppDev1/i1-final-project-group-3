<template>
    <NavigationBar/>
    <div class="posts-page">
    <div class="post-header">Posts</div>

    <div id="search-section">
      <div class="post-search-bar-line" />
      <input id="post-search-bar" type="text" v-model="searchQuery" placeholder="Search using Keywords: BT3103">
      <img class="post-search-icon" alt="" src="../assets/search.png" />
    </div>

    <div class="new-position">
      <button class="new">New</button>
    </div>
    <div class="popular-position">
      <button class="new">Popular</button>
    </div>

    <button class="create-button" @click="navigateToCreatePost">
      <div class="create-button-child" />
      <div class="create-button-item" />
      <div class="create-button-inner" />
    </button>

    <div class="post-list">
      <div v-for="post in posts" :key="post.id" class="post">
        <button class="comments">Comments: {{ post.comments }}</button>
        <button class="likes">Likes: {{ post.likes }}</button>
        <b class="post-title">{{ post.header }}</b>
        <img class="post-user-image" :src="post.userImage" />
        <button class="user-name" @click="navigateToProfile(post.username)">{{ post.username }}</button>
        <div class="post-date">{{ post.date }}</div>
        <div class="post-content-container">
          <p class="post-content">{{ post.description }}</p>
        </div>
        <div class="post-divider-line" />
        </div>
      </div>

    </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'

import { doc, getDoc, getDocs, getFirestore, collection, query, orderBy } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';



export default {
    name: "Post",
    
    components: {
      NavigationBar
    },

    data() {
      return {
        uid: "",
        user: false,
        useremail:'',
        posts: [],
      }
    }, 
    
    async mounted() {
       const auth = getAuth();
       onAuthStateChanged(auth, (user) => {
         if (user) {
           this.user = user;
           this.useremail = user.email;
           this.uid = user.uid;
           this.fetchUserPosts(this.useremail);
           
         } else {
           this.user = null;
           this.useremail = null;
         }
       })
     },

    methods: {
      async fetchUserPosts(useremail) {
        try {
          const db = getFirestore(firebaseApp)
          // Get a reference to the "Posts" collection
          const postsRef = collection(db, "Posts");

          const postQuery = query(postsRef, orderBy('datetime', 'desc')); 
          const postsSnapshot = await getDocs(postQuery);
          
          for (const document of postsSnapshot.docs) {
            let post = document.data();
            let userId = post.userid;
            
            let userDocument = await getDoc(doc(db, 'Users', userId));
            let userData = userDocument.data();
            post.userImage = userData.profilePicture;
            post.id = document.id;
            this.posts.push(post);
          };
          

        } catch (error) {
          console.error("Error fetching posts: ", error);
        }
      },
      navigateToCreatePost() {
        this.$router.push({ name: 'CreatePost' });
      },
      navigateToProfile(profileName) {
        this.$router.push({ name: 'profile', params: { name: profileName }});
      }
    }
  }
</script>




<style scoped>

  .posts-page {
  width: 100%;
  text-align: left;
  font-size: var(--font-size-xl);
  color: var(--color-black);
  font-family: var(--font-josefin-sans);
  }

  .post-header {
    position: absolute;
    top: 12.25rem;
    left: 11.60rem;
    font-size: var(--font-size-29xl);
    font-family: var(--font-yeseva-one);
  }

    .post-search-bar-line {
    position: relative;
    height: 4.83%;
    width: 48.96%;
    top: 160px;
    right: 27.29%;
    bottom: 64.95%;
    left: 23.75%;
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-black);
    box-sizing: border-box;
  }

  #post-search-bar {
    position: relative;
    height: 5.91%;
    width: 48.9%;
    top: 100px;
    left: 23.72%;
    font-size: 1.5rem;
    display: inline-block;
    color: #ada6a6;
  }
  .post-search-icon {
    position: relative;
    height: 2rem;
    width: 2rem;
    top: 110px;
    left:20%;
    cursor: pointer;
  }

  .new-position {
    position: absolute;
    top: 23.69rem;
    left: 11.54rem;
    width: 5.63rem;
    height: 1.94rem;

  }
  .popular-position {
    position: absolute;
    top: 23.69rem;
    left: 19.31rem;
    width: 5.63rem;
    height: 1.94rem;
  }

  .new {
    position: absolute;
    top: 0.44rem;
    left: 0rem;
    display: inline-block;
    width: 6.5rem;
    height: 1.94rem;
    mix-blend-mode: normal;
    border-radius: var(--br-21xl);
    background-color: var(--color-white);
    border: 1px solid var(--color-mediumslateblue);
    box-sizing: border-box;
    font-family: var(--font-yeseva-one);
    font-size: var(--font-size-mini);
    color: var(--color-mediumslateblue);
    cursor: pointer;
  }

  .create-button-child {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0%;
    right: 0%;
    bottom: 0%;
    left: 0%;
    border-radius: 50%;
    background-color: var(--color-darkorange);
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .create-button-item {
    position: absolute;
    height: 11.86%;
    width: 52.54%;
    top: 44.07%;
    right: 23.73%;
    bottom: 44.07%;
    left: 23.73%;
    background-color: var(--color-white);
  }
  .create-button-inner {
    position: absolute;
    height: 11.86%;
    width: 52.54%;
    top: 76.27%;
    right: 3.39%;
    bottom: 11.86%;
    left: 44.07%;
    background-color: var(--color-white);
    transform: rotate(-90deg);
    transform-origin: 0 0;
  }
  .create-button {
    position: absolute;
    top: 54.63rem;
    left: 82.69rem;
    width: 3.69rem;
    height: 3.69rem;
    cursor: pointer;
    background: transparent;
    border: transparent;
  }

  .create-button-child:hover {
    background-color: #ffb175;
  }

  .post-list {
    margin-top: 230px;
    width: 1000px;
    margin-left: 180px;

  }
  .post {
    position: relative;
    margin-bottom: 20px;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    height: 10rem;
    
  }

  .comments {
    position: absolute;
    margin-left: 870px;
    width: 120px;
    bottom: 5px;
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
  }
  .likes {
    position: absolute;
    margin-left: 740px;
    width: 120px;
    bottom: 5px;
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
  }
  .post-title {
    position: absolute;
    font-weight: bold;
    top: 70px;
    margin-left: 40px;
  }
  .post-user-image {
    position: absolute;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 40px;
    top: 5px;
    object-fit: cover;
    
  }
  .user-name {
    position: absolute;
    top: 20px;
    margin-left: 110px;
    font-weight: 500;
    font-weight: bold;
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
  }

  .post-date {
    position: absolute;
    top: 20px;
    margin-left: 250px;
    font-weight: 500;
  }
  .post-content-container {
    position: absolute;
    font-weight: 300;
    top: 100px;
    margin-left: 40px;
  }

  .post-divider-line {
    position: absolute;
    height: 4.83%;
    top: 160px;
    right: 0%;
    left: 0%;
    border-bottom: 1px solid var(--color-black);
    box-sizing: border-box;
  } 


</style>
