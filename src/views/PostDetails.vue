<template>
  <NavigationBar/>
  <!-- Post header -->
  <div class="header">Post: {{ this.header }}</div>
  
  <!-- Comments header -->
  <div class="comments-header">Comments</div>

  <!-- Post list -->
  <div class="post-list">
      <div class="post">
          <div class="section">
              <!-- Display number of comments -->
              <div class="comments">Comments: {{ this.commentsNo }}</div>

              <!-- Like button with SVG icon -->
              <button class="likeButton" @click="likePost(this.$route.params.postId, this.uid)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-up" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" id ="thumbs-up"></path>
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                </svg>
              </button>

              <!-- Display number of likes -->
              <div class="likes" id="likes">Likes: {{ this.likes }}</div>
          </div>

          <!-- Post User information section -->
          <img class="post-user-image" :src="this.userImage" />
          <div class="upper-section">
            <!-- Button to navigate to Post User's Profile Page -->
            <button class="user-name" @click="navigateToUserProfile(this.postUserId)">{{ this.postUsername }}</button>
            
            <!-- Display post date -->
            <div class="post-date">{{ this.date }}</div>
          </div>

          <!-- Post content section -->
          <div class="post-content-container">
            <!-- Display post content -->
            <p class="post-content">{{ this.description }}</p>
          </div>

          <!-- Divider line between posts -->
          <div class="post-divider-line" />
          
      </div>

      <!-- Comments section -->
      <div class="comment-list">
        <!-- Loop through comments and display each -->
        <div v-for="comment in comments" :key="comment.id" class="allComments">
            <img class="comment-user-image" :src="comment.commentUserImage" />
            <div class="comment-upper-section">
              <!-- Display comment author's username and button to navigate to their profile page-->
              <button class="comment-user-name" @click="navigateToUserProfile(comment.commentUserId)">{{ comment.commentUserName }}</button>

              <!-- Display comment date -->
              <div class="comment-date">{{ comment.date }}</div>

              <!-- Delete button for comment (visible only to the author) -->
              <button v-if="comment.commentUserId === uid" class="delete-button" type="button" @click="removeComment(comment.id)">Delete</button>
            </div>
            

            <div class="comment-content-container">
              <!-- Display comment content -->
              <p class="comment-content">{{ comment.comment }}</p>
            </div>

            <!-- Divider line between comments -->
            <div class="comment-divider-line" />
        </div>
      </div>

      <!-- Comment input bar -->
      <div class="comment-bar">
        <!-- Input field for entering comments -->
        <input @keyup.enter="confirmSubmitForm" v-model="comment" id = "enter-your-comment" class="enter-your-comment" placeholder="Enter your comment here...">

        <!-- Button to submit a comment -->
        <button class="comment-button" @click="submitForm">Comment</button>
      </div>

      <!-- Error popup for empty comment -->
      <div class="popup" v-show="showErrorDialog" ref="errorDialog">
        <div class="popup-content">
          <h2>Error: Please enter something. </h2>
          <div class="error-popup-bar-line" />
          <div class="action-buttons">
             <!-- Button to close the error popup -->
            <button style="width: 10.75rem; height: 2.75rem;" @click="closeErrorDialog">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'
import { onMounted, ref, reactive, computed } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, orderBy, getDocs, getDoc, doc, updateDoc, addDoc, getCountFromServer, setDoc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';
import { useRouter } from 'vue-router';
import defaultImage from '../assets/default-profile-image.jpg';

export default {
    name: "PostDetails",
    components: {
        NavigationBar
    },

    data() {
        return {
            header: "",
            description: "",
            uid: "",
            user:false,
            date: "",
            postUsername: "",
            postUserId: "",
            likes: "",
            userImage:"",
            comment: "",
            showErrorDialog: false,
            commentUserName: "",
            comments: [],
            commentsNo: "",
        }
    },    

    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;      
          this.uid = user.uid;
          this.fetchPostData();
          this.fetchComments();
          
        } else {
          this.user = null;
          this.useremail = null;
         }
      })
    },

    methods: {
      
      // Navigation function to redirect to post details page
      navigateToPostDetails (postId) {
        this.$router.push({ name: 'PostDetails', params: { postId: postId }});
      },

      // Navigation function to redirect to user profile page
      navigateToUserProfile (userId) {
        this.$router.push({ name: 'profile', params: { userId }});

      },

      // Function to get the current date
      getCurrentDate() {
          const currentDate = new Date();
          return currentDate;
      },

      async fetchPostData() {
        const db = getFirestore(firebaseApp);
        
        // Get postId from route parameters
        const postId = this.$route.params.postId;

        // Extract post data
        let postDocument = await getDoc(doc(db, "Posts", postId));
        let postData = postDocument.data();

        // Retrieving userid of the post author.
        let postUserId = (postData.userid);

        // Get user document related to the post
        let userDocument = await getDoc(doc(db, "Users", postUserId));
        let userData = userDocument.data();

        // Set data to component properties
        this.header = (postData.header)
        this.description = (postData.description)
        this.date = (postData.date)
        this.likes = (postData.likes)
        this.postUsername = (postData.username)
        this.userImage = (userData.profilePicture || defaultImage);
        this.postUserId = postUserId;
        this.commentsNo = (postData.comments);
      },

      async fetchComments(){
          try {
            const db = getFirestore(firebaseApp);
            // Get postId from route parameters
            const postId = this.$route.params.postId;
            // Get reference to the "Comments" collection for the post
            const commentsRef = collection(db, "Posts", postId, "Comments");
            // Create a query to order comments by datetime in descending order
            const commentsQuery = query(commentsRef, orderBy('datetime', 'desc'));
            // Get comments snapshot
            const commentsSnapshot = await getDocs(commentsQuery);

            // Loop through comments and add them to the component's comments array
            for (const document of commentsSnapshot.docs) {
                let comment = document.data();
                let currentUserDocument = await getDoc(doc(db, "Users", this.uid));
                // Add comment id and push it to the comments array
                comment.id = document.id;
                this.comments.push(comment);
            }
          } catch (error) {
              console.error("Error fetching comments: ", error);
          }
      },

      // Function to handle form submission
      submitForm() {
        if (!this.comment) {
          // Show error dialog if the comment is empty
          this.showErrorDialog = true;
        } else {
          // Proceed to confirm form submission
          this.confirmSubmitForm()
        }
      },
      
      // Function to open the error dialog
      openErrorDialog() {
        this.showErrorDialog = true;

        // Add a click event listener to the entire document when the popup is open
        document.addEventListener("click", this.closeErrorDialogOnClickOutside);

        // Prevent the click event on the button from propagating and immediately closing the popup
        event.stopPropagation();
      },

      // Function to close the error dialog
      closeErrorDialog() {
        // Hide error dialogu
        this.showErrorDialog = false;
        document.removeEventListener("click", this.closeErrorDialogOnClickOutside);
      },

      // Function to close the error dialog when clicked outside
      closeErrorDialogOnClickOutside(event) {
        // Check if the click event occurred outside of the popup
        const popup = this.$refs.errorDialog;
        if (popup && !popup.contains(event.target)) {
          this.closeErrorDialog();
        }
      },

      async confirmSubmitForm() {
          const db = getFirestore(firebaseApp);

          // Get postId from route parameters
          const postId = this.$route.params.postId;
          let uid = this.uid;

          // Get comment from the input field
          let comment = document.getElementById("enter-your-comment").value;

          try{
            const auth = getAuth();
            const user = auth.currentUser;

            const userDocument = await getDoc(doc(db, "Users", uid));
            const userData = userDocument.data();
            
            // Retrieving full name and user image of comment author
            let fullname = (userData.firstName) + " " + (userData.lastName)
            let userImage =  (userData.profilePicture || defaultImage)

            if (user) {

              // Comment details that will be stored in firebase
              const updates = {
                comment: comment,
                commentUserId: this.uid,
                commentUserName: fullname,
                commentUserImage:userImage,
                date: this.getCurrentDate().toDateString(),
                datetime: this.getCurrentDate(),

              }

              // Add comment to the "Comments" collection for the post
              const commentsCollectionRef = collection(db, "Posts", postId, "Comments");
              const postDocRef = await addDoc(commentsCollectionRef, updates);

              // Get comment document id to ensure that the id is the same in "Posts" collection
              const docId = postDocRef.id;

              // Set comment data in the user's "Posts" collection
              const allPostsRef = await setDoc(
              doc(db, "Users", this.postUserId, "Posts", postId, "Comments", docId),
              updates
              );

              // Update comment count for the post
              const currentPostSnap = await getDoc(doc(db, "Posts", postId));
              const postData = currentPostSnap.data();
              const currentComments = postData.comments;

              const commentUpdates = {
                comments: currentComments + 1
              }

              // Update documents on the comment count for the post
              await updateDoc(doc(db, "Posts", postId), commentUpdates);
              await updateDoc(doc(db, "Users", this.postUserId, "Posts", postId),commentUpdates);

              location.reload();

            } else {
              console.error('No user is logged in.');
            }
          }catch(error) {
            console.error("Error updating document: ", error);
          }
      },
      
      async likePost (postId, userId) {
        const db = getFirestore(firebaseApp);

        // Reference to the "Likes" collection for the specific post
        const postRef = collection(db, "Posts", postId, "Likes");   
        const postSnap = await getDocs(postRef);

        // Get the likes count for the post
        const likesCount = await getCountFromServer(postRef);

        // Check if there are existing likes
        if (likesCount.data().count > 0 ) {
          // Loop through the existing likes
          for (const document of postSnap.docs) {
            const likeData = document.data();
            console.log(likeData);
            const userLiked = likeData.userId;

            if (userLiked == userId) {
               // Function to unlike the post
              const unlikePost = async (postId, userId) => {
                const db = getFirestore(firebaseApp);
                const currentPostRef = doc(db, "Posts", postId);
                const currentPostSnap = await getDoc(currentPostRef);
                const postData = currentPostSnap.data();
                const userPostedId = postData.userid;

                const postRef = collection(db, "Posts", postId, "Likes");   
                const postSnap = await getDocs(postRef)
                const likesCount = await getCountFromServer(postRef);

                // Check if there are existing likes
                if (likesCount.data().count > 0 ) {
                  // Loop through the existing likes
                  for (const document of postSnap.docs) {
                    const likeData = document.data();
                    console.log(likeData);
                    const userLiked = likeData.userId;

                    // Check if the current user has already liked the post
                    if (userLiked == userId) {
                      // Delete the like document from the "Likes" collection
                      deleteDoc(doc(db,"Users", userPostedId ,"Posts" , postId, "Likes", document.id))
                      deleteDoc(doc(db,"Posts", postId, "Likes", document.id))
                      console.log("User has unlike the post");
            
                      const currentLikes = postData.likes;
                      const updates = {
                      likes: currentLikes - 1
                      };

                      // Update the like count for the post
                      await updateDoc(doc(db, "Posts", postId), updates);
                      await updateDoc(doc(db, "Users", userPostedId, "Posts", postId), updates);
                      
                      location.reload()
                      break;

                    } else {
                      console.log("You did not like this post.")
                    }
                  } 
                } 
              
              }
              unlikePost(postId, userId)
              break;
            } else { // If the user hasn't liked the post, proceed to like it
                const currentPostRef = doc(db, "Posts", postId);

                const currentPostSnap = await getDoc(currentPostRef);
                const postData = currentPostSnap.data();
                const userPostedId = postData.userid;

                // Increment the likes count for the post
                const currentLikes = postData.likes;
                const updates = {
                  likes: currentLikes + 1,
                };

                // Update the like count for the post
                await updateDoc(doc(db, "Posts", postId), updates);
                await updateDoc(doc(db, "Users", userPostedId, "Posts", postId), updates);

                // Add a like document to the "likes" collection to track the user's like
                const likesDoc = await addDoc(collection(db, "Posts", postId, "Likes"), {
                  postId: postId,
                  userId: userId,
                  isLiked: true,
                });

                const docId = likesDoc.id;
                // Set like data in the user's "Posts" collection
                const allPostsRef = await setDoc(doc(db, "Users", userPostedId, "Posts", postId, "Likes", docId), {
                  postId: postId,
                  userId: userId,
                  isLiked: true,
                });
                console.log("Liked!");
                location.reload()
            }
            } 
        } else { // If there are no existing likes, proceed to like the post
            const currentPostRef = doc(db, "Posts", postId);
            
            // Get data for the current post
            const currentPostSnap = await getDoc(currentPostRef);
            const postData = currentPostSnap.data();

            // Get user id who posted the post
            const userPostedId = postData.userid;
            const currentLikes = postData.likes;
            const updates = {
              likes: currentLikes + 1
            };
            // Update the like count for the post
            await updateDoc(doc(db, "Posts", postId), updates);
            await updateDoc(doc(db, "Users", userPostedId, "Posts", postId), updates);

            // Add a like document to the "likes" collection to track the user's like
            const likesDoc = await addDoc(collection(db, "Posts", postId, "Likes"), {
              postId: postId,
              userId: userId,
              isLiked: true,
            });

            const docId = likesDoc.id;
            const allPostsRef = await setDoc(doc(db, "Users", userPostedId, "Posts", postId, "Likes", docId), {
              postId: postId,
              userId: userId,
              isLiked: true,
            });

            console.log("Liked!");
            location.reload()
        }
        
      },

  
      async removeComment(documentId) {
        const db = getFirestore(firebaseApp);

        try {
            // Get the document data to check if the user is the owner of the comment
            const commentDoc = await getDoc(doc(db, "Posts", this.$route.params.postId, "Comments", documentId));
            const commentData = commentDoc.data();

            // Check if the current user is the owner of the comment
            if (commentData.commentUserId === this.uid) {
                const currentPostSnap = await getDoc(doc(db, "Posts", this.$route.params.postId));
                const postData = currentPostSnap.data();

                const currentComments = postData.comments;

                const updates = {
                  comments: currentComments - 1
                };

                // Update the comment count for the post
                await updateDoc(doc(db, "Posts", this.$route.params.postId), updates);
                await updateDoc(doc(db, "Users", this.postUserId, "Posts", this.$route.params.postId), updates);

                // Delete the document
                await deleteDoc(doc(db, "Users", this.postUserId, "Posts", this.$route.params.postId, "Comments", documentId));
                await deleteDoc(doc(db, "Posts", this.$route.params.postId, "Comments", documentId));

                console.log("Comment deleted successfully");
                
                // Reload the page
                location.reload();
            } else {
                alert("You are not allowed to delete this comment.");
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
      }


  }

    


}
</script>

<style scoped>

.post-details-page {
    background-color: var(--color-white);
    width: 1440px;
    height: 963px;
    overflow: hidden;
    text-align: center;
    font-size: var(--font-size-5xl);
    color: var(--color-black);
    font-family: var(--font-josefin-sans);
  }
.header {
    position: relative;
    top: 30px;
    left: 167px;
    font-size:  3.13rem;
    font-family: var(--font-yeseva-one);
    color: black;
    display: inline-block;
    width: 820px;
    height: 87px;
}

.comments-header {
    position: absolute;
    top: 600px;
    left: 155px;
    font-size: 32px;
    font-family: var(--font-yeseva-one);
    color: black;
}

.post-list {
    margin-top: 3rem;
    width: 1000px;
    margin-left: 130px;

  }
  .post {
    position: relative;
    font-size: 1.30rem;
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    height: 10rem;
    
  }

  .section {
    position: absolute;
    top: 250px;
  }

  .comments {
    position: absolute;
    margin-left: 850px;
    width: 150px;
    bottom: 8px;
    border: 0px;
    font-size: 1.30rem;
    font-family: var(--font-inter);
    color: black;
  }
  .likes {
    position: absolute;
    margin-left: 740px;
    width: 120px;
    bottom: 7px;
    background: transparent;
    border: 0px;
    font-size: 1.30rem;
    font-family: var(--font-inter);
    color: black;
  }

  .likeButton {
    position: absolute;
    margin-left: 700px;
    bottom: 0px;
    background: transparent;
    cursor: pointer;
    border: 0px;
  }

  .post-user-image {
    position: absolute;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-left: 40px;
    top: 5px;
    object-fit: cover;
    
  }
  .upper-section{
    margin-left: 30px;

  }
  .user-name {
    position: absolute;
    top: 30px;
    margin-left: 110px;
    font-weight: 500;
    font-weight: bold;
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: 1.30rem;
    font-family: var(--font-inter);
    color: black;
  }

  .post-date {
    position: absolute;
    top: 30px;
    margin-left: 300px;
    font-weight: 500;
    color: black;
    
  }

  .post-content {
    color: black;
  }

  .post-content-container {
    position: absolute;
    font-weight: 300;
    top: 110px;
    margin-left: 40px;
  }

  .post-divider-line {
    position: absolute;
    height: 4.83%;
    top: 250px;
    margin-left: 30px;
    right: 0%;
    left: 0%;
    border-bottom: 1px solid var(--color-black);
    box-sizing: border-box;
  } 

  .enter-your-comment {
    position: absolute;
    height: 100%;
    width: 85.6%;
    padding: 20px;
    border-radius: 12px;
    background-color: var(--color-white);
    border: 1px solid rgba(0, 0, 0, 0.21);;
    box-sizing: border-box;
    font-size: 1.30rem;
    font-family: var(--font-inter);
  }
  .comment-button {
    position: absolute;
    color: var(--color-white);
    position: absolute;
    height: 96.43%;
    width: 12.71%;
    top: 3.57%;
    right: 0%;
    bottom: 0%;
    left: 87.29%;
    border-radius: 25px;
    font-size: 1.30rem;
    background-color: var(--color-darkorange);
    cursor: pointer;
    border: 1px solid var(--color-darkorange);
    border-color: var(--color-darkorange);
  }

  .comment-button:hover {
    background-color: #ffb175;
    border-color: #ffb175;
  }
  .comment-bar {
    position: relative;
    margin-top: 40px;
    margin-bottom:40px;
    width: 1007px;
    left: 25px;
    height: 56px;
    text-align: left;
    color: #787878;

  }
  .comment-list {
    margin-top: 13rem;
    width: 1000px;

  }
  .allComments {
    position: relative;
    font-size: 1.30rem;
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    height: 10rem;
    margin-top:20px;
  }

  .delete-button {
    position: absolute;
    margin-top:20px;
    margin-left: 860px;
    width: 6.5rem;
    height: 1.94rem;
    font-size: var(--font-size-xl);
    color: var(--color-mediumslateblue);
    text-align: center;
    border-radius: 12px;
    background-color: var(--color-white);
    border: 1px solid var(--color-mediumslateblue);
    cursor: pointer;
  }

  .delete-button:hover {
    background-color: var(--color-mediumslateblue);
    color: var(--color-white);
  }

  .comment-user-image {
    position: absolute;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-left: 40px;
    top: 5px;
    object-fit: cover;
    
  }
  .comment-upper-section{
    margin-left: 30px;

  }
  .comment-user-name {
    position: absolute;
    top: 30px;
    margin-left: 110px;
    font-weight: 500;
    font-weight: bold;
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: 1.30rem;
    font-family: var(--font-inter);
    color: black;
  }

  .comment-date {
    position: absolute;
    top: 30px;
    margin-left: 300px;
    font-weight: 500;
    color: black;
    
  }

  .comment-content {
    color: black;
  }

  .comment-content-container {
    position: absolute;
    font-weight: 300;
    top: 110px;
    margin-left: 40px;
  }

  .comment-divider-line {
    position: absolute;
    height: 4.83%;
    top: 150px;
    margin-left: 30px;
    right: 0%;
    left: 0%;
    border-bottom: 1px solid var(--color-black);
    box-sizing: border-box;
  } 

</style>