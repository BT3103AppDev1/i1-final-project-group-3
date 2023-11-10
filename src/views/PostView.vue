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
        <button class="likes" id="likes" @click="likePost(post.id, this.uid)">Likes: {{ post.likes }}</button>
        <b class="post-title">{{ post.header }}</b>
        <img class="post-user-image" :src="post.userImage" />
        <button class="user-name" @click="navigateToUserProfile(post.userid)">{{ post.username }}</button>
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
import { onMounted, ref, reactive, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, orderBy, getDocs, getDoc, doc, updateDoc, addDoc, getCountFromServer } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';
import { useRouter } from 'vue-router';

export default {

  name: "Post",
  components: {
    NavigationBar
  },
  setup() {
    const user = ref(null);
    const useremail = ref('');
    const uid = ref('');
	  const router = useRouter();
    const posts = ref([]);
    const searchQuery = ref('');

    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user.value = user;
          useremail.value = user.email;
          uid.value = user.uid;
          fetchUserPosts();
        } else {
          user.value = null;
          useremail.value = null;
        }
      });
    });

    const fetchUserPosts = async () => {
      try {
        const db = getFirestore(firebaseApp);
        const postsRef = collection(db, "Posts");
        const postQuery = query(postsRef, orderBy('datetime', 'desc'));
        const postsSnapshot = await getDocs(postQuery);

        posts.value = [];
        for (const document of postsSnapshot.docs) {
          let post = document.data();
          let userId = post.userid;
          let userDocument = await getDoc(doc(db, 'Users', userId));
          let userData = userDocument.data();
          post.userImage = userData.profilePicture;
          post.id = document.id;
          posts.value.push(post);
        }

      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    const filteredPosts = computed(() => {
      const searchRegex = new RegExp(searchQuery.value, 'i');
      return posts.value.filter(post => {
        return searchRegex.test(post.header) || searchRegex.test(post.description) || searchRegex.test(post.username);
      });
    });

    const navigateToCreatePost = () => {
       router.push({ name: 'CreatePost' });
    };

    const navigateToUserProfile = (userId) => {
      router.push({ name: 'profile', params: { userId }});

    };

    const likePost = async (postId, userId) => {
      const db = getFirestore(firebaseApp);
      const postRef = collection(db, "Posts", postId, "Likes");   
      const postSnap = await getDocs(postRef)
      const likesCount = await getCountFromServer(postRef);

      if (likesCount.data().count > 0 ) {
        for (const document of postSnap.docs) {
          const likeData = document.data();
          console.log(likeData);
          const userLiked = likeData.userId;

          if (userLiked == userId) {
            console.log("User has already liked the post");
            alert("You have liked the post already.");
            break;
          } else {
            const currentPostRef = doc(db, "Posts", postId);
            const currentPostSnap = await getDoc(currentPostRef);
            const postData = currentPostSnap.data();
            const currentLikes = postData.likes;
            const updates = {
              likes: currentLikes + 1
            };

            // Update the like count for the post
            await updateDoc(doc(db, "Posts", postId), updates);

            // Add a like document to the "likes" collection to track the user's like
            await addDoc(collection(db, "Posts", postId, "Likes"), {
              postId: postId,
              userId: userId,
            });

            console.log("Liked!");
            location.reload();
          }
        } 
      } else {
        console.log("here")
        const currentPostRef = doc(db, "Posts", postId);
        const currentPostSnap = await getDoc(currentPostRef);
        const postData = currentPostSnap.data();
        const currentLikes = postData.likes;
        const updates = {
          likes: currentLikes + 1
        };

        // Update the like count for the post
        await updateDoc(doc(db, "Posts", postId), updates);

        // Add a like document to the "likes" collection to track the user's like
        await addDoc(collection(db, "Posts", postId, "Likes"), {
          postId: postId,
          userId: userId,
        });

        console.log("Liked!");
        location.reload();
      }
      
    } 
    

    return {
      user,
      useremail,
      uid,
      posts: filteredPosts,
      searchQuery,
      navigateToCreatePost,
      navigateToUserProfile,
      likePost
    };
  }
};
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
 
  
  #post-search-bar {

    width: 50%;
    margin-top: 7rem;
    margin-left: 27rem; 
    border: 0.01rem solid transparent;
    border-bottom: 0.01rem solid #575756;
    padding-bottom: 0.01rem;
    border-radius: 0;
    background-color: transparent;
    font-size: 1.3rem;
    line-height: 3rem;
    color: #575756; 
    font-style: italic;
}

 
  .post-search-icon {
    position: absolute;
    margin-top: 9rem;
    left: 75%; 
    transform: translateY(-50%);
    cursor: pointer; 
    width: 1.5rem;
    height: 1.5rem;  
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
  position: relative;
  width: 3.69rem;
  height: 3.69rem;
  top: 35px;
  left: 1100px;
  cursor: pointer;
  background: transparent;
  border: transparent;
  z-index: 999;  
}


  .create-button-child:hover {
    background-color: #ffb175;
  }

  .post-list {
    margin-top: 8rem;
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
