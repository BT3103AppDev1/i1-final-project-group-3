<template>
    <div class="looking-at-profile-page">
       <NavigationBar class = "navigation"/> 


        <div class ="profile-section" v-if="userProfile">
            <div class="left-section">
                <!-- Dynamic Image -->
                <img class="profile-image" :alt = "userProfile.name" :src="userProfile.profilePicture || defaultProfilePicture" />
                
                <!-- Action buttons -->
                <div class="buttons-container">
                    <button class="message" @click="openUploadMessageDialog">Send a Message</button>
                    <button class="block" @click="openUploadBlockDialog">Block</button>
                </div>

                <div class="group-info" v-if="userProfile.currentGroup">
                    <p class="header" id="current-group">Current Group:</p> 
                    <div class="grouparray">
                        <li v-for="group in userProfile.currentGroup" :key="group">{{ group }}</li>
                    </div>
                </div>
            </div>

            <div class="right-section">
                <div class="name">
                    <h2>{{ userProfile.displayName }}</h2>
                </div>

                <div class="major-profileDescription">
                    <h3>{{ userProfile.major }}, Year {{ userProfile.yearOfStudy }}</h3>
                    <p>{{ userProfile.description }}</p>
                </div>

                <div class="profile-details">
                    <p class="header-profile">Email:</p>
                    <p class="profile-info" >{{ userProfile.email }}</p>


                    <p class="header-profile">Current Courses:</p>
                    <ul id="course-list" class="profile-info">
                        <li v-for="course in userProfile.currentCourses" :key="course">{{ course }}</li>
                    </ul>

                    <p class="header-profile">My Personalities:</p> 
                    <ul id="personality-list" class ="profile-info">
                        <li v-for="personality in userProfile.personalities" :key="personality">{{ personality }}</li>
                    </ul>
                </div>
            </div>
        </div>
    

        <div class="post-header">Posts</div>
        <div class="post-list">
            <div v-for="post in posts" :key="post.id" class="post">
                <button class="comments" @click="navigateToPostDetails(post.id)">Comments: {{ post.comments }}</button>
                <button class="likeButton" @click="likePost(post.id, this.uid)">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-up" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" id ="thumbs-up"></path>
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
                </svg>
                </button>
                <div class="likes" id="likes">Likes: {{ post.likes }}</div>
                <b class="post-title">{{ post.header }}</b>
                <img class="post-user-image" :src="post.userImage" />
                <button class="user-name">{{ post.username }}</button>
                <div class="post-date">{{ post.date }}</div>
                <div class="post-content-container">
                    <p class="post-content">{{ post.description }}</p>
                </div>
                <div class="post-divider-line"></div>
            </div>
        </div>

        <div class="popup" v-show="showMessageDialog" ref="messageDialogRef" v-if="userProfile">
            <div class="popup-content">
                <h2>Send a Message!</h2>
                <div class="action-buttons">
                    <input type="text" placeholder="Say something nice!" v-model="messageText" />
                    <button @click="sendMessage(userProfile.uid, userProfile.firstName + ' ' + userProfile.lastName)" class="remove-photo">Send</button> 
                    <!--- currently set Siyi account as receiver--->
                </div>

                
            </div>
        </div>

        <div class="popup" v-show="showBlockDialog" ref="blockDialogRef" >
            <div class="popup-content">
                <h2>Are you sure you want to block user?</h2>
                <div class="action-buttons">
                    <button @click="removePhoto" class="remove-photo">Cancel</button>
                
                    <button @click="removePhoto" class="remove-photo">Confirm</button>
                </div>
                
            </div>
        </div>
    </div>
</template>
  

<script>  
import { ref, defineComponent, onMounted, onUnmounted, computed } from "vue";
import NavigationBar from '@/components/NavigationBar.vue';
import { doc, getDoc, getFirestore, setDoc, addDoc, serverTimestamp, collection, updateDoc, arrayUnion, query, orderBy, getDocs, getCountFromServer, deleteDoc} from 'firebase/firestore';
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '@/firebase.js';
import { useRouter } from 'vue-router';
import defaultProfilePicture from '../assets/default-profile-image.jpg';


export default defineComponent({
    name: "profile",
    
    components: {
      NavigationBar
    },

    setup() {
        const showMessageDialog = ref(false);
        const showBlockDialog = ref(false);
        const messageDialogRef = ref(null);
        const blockDialogRef = ref(null);
        const messageText = ref('');
        const defaultProfilePicture = '../assets/default-profile-image.jpg';
        const db = getFirestore(firebaseApp);
        const auth = getAuth();
        const route = useRoute();
        const useremail = ref('');
        const user = ref(null);
        const uid = ref('');
        const posts = ref([]);
        const router = useRouter();

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

        const userProfile = ref({
            name: '',
            major: '', 
            yearOfStudy: '', 
            email: '',
            courses: '',
            personalities: '',
            description: '', 
            profilePicture: defaultProfilePicture // Assuming defaultProfilePicture is defined
        });

        const fetchUserPosts = async () => {
        try {
            const uid = route.params.userId;
            const db = getFirestore(firebaseApp);
            const postsRef = collection(db, "Users", uid, "Posts");

            const postQuery = query(postsRef, orderBy('datetime', 'desc'));
            const postsSnapshot = await getDocs(postQuery);

            posts.value = [];
            for (const document of postsSnapshot.docs) {
                let post = document.data();
                let userDocument = await getDoc(doc(db, 'Users', uid));
                let userData = userDocument.data();
                post.userImage = userData.profilePicture;
                post.id = document.id;
                console.log(post);
                posts.value.push(post);
            }
            console.log(posts);

        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
        };

        // message dialog
        const openUploadMessageDialog = () => {
            showMessageDialog.value = true;
            console.log("openUploadMessageDialog")
            // Add the event listener directly after opening the dialog
            setTimeout(() => { // setTimeout ensures that the event listener is not immediately invoked by the same click that opened the dialog
                document.addEventListener('click', closeMessageDialogOnClickOutside);
            }, 0);
        };

        const closeMessageDialog = () => {
            console.log("closeMessageDialog")
            showMessageDialog.value = false;
            // Remove the event listener when the dialog is closed
            document.removeEventListener('click', closeMessageDialogOnClickOutside);
            console.log("done1")
        };

        const closeMessageDialogOnClickOutside = (event) => {
            console.log("closeMessageDialogOnClickOutside")
            if (messageDialogRef.value && !messageDialogRef.value.contains(event.target)) {
                closeMessageDialog();
                
            }
            console.log("done2")
        };

        // block dialog
        const openUploadBlockDialog = () => {
            showBlockDialog.value = true;
            setTimeout(() => {
                document.addEventListener('click', closeBlockDialogOnClickOutside);
            }, 0);
        };

        const closeBlockDialog = () => {
            showBlockDialog.value = false;
            document.removeEventListener('click', closeBlockDialogOnClickOutside);
        };

        const closeBlockDialogOnClickOutside = (event) => {
            if (blockDialogRef.value && !blockDialogRef.value.contains(event.target)) {
                closeBlockDialog();
            }
        };

        // Use onUnmounted at the top level of setup to clean up when the component unmounts
        onUnmounted(() => {
            document.removeEventListener('click', closeMessageDialogOnClickOutside);
            document.removeEventListener('click', closeBlockDialogOnClickOutside);
        });


        const sendMessage = async (receiverUID, receiverName) => {
            console.log(receiverUID);
            console.log(receiverName);

            try {
                const firebaseUser = auth.currentUser;

                if (firebaseUser) {
                    const senderUID = firebaseUser.uid;
                    console.log(senderUID);

                    const userProfileRef = doc(db, 'Users', senderUID);
                    const userProfileSnap = await getDoc(userProfileRef);
                    const userProfile = userProfileSnap.data();
                    const senderName = (userProfile.firstName || '') + " " + (userProfile.lastName || '');
                    console.log(senderName);

                    // Check if a chat already exists between the two users
                    // Id = uid of first person who start convo + receiver uid

                    const existingChatId = await getExistingChatId(senderUID, receiverUID);
                    console.log(existingChatId)
                    let messageDocumentID = existingChatId

                    // just creating the document in the user profiles. if no existing chats between the 2, create new one
                    if (!existingChatId) {
                        // If no existing chat, update the chat IDs for both users
                        messageDocumentID = senderUID + receiverUID;
                        await createMessageDocument(messageDocumentID, senderUID, receiverUID, senderName, receiverName);
                        await updateUserChatIds(senderUID, messageDocumentID);
                        await updateUserChatIds(receiverUID, messageDocumentID);
                    }

                    // adding message to the document
                    await addMessageToList(messageDocumentID, senderUID, receiverUID, senderName, receiverName, messageText.value);
                    closeMessageDialog();
                } else {
                    console.error("User is not authenticated");
                }
            } catch (error) {
                console.error("Error sending message: ", error);
            }
        };

        const getExistingChatId = async(senderUID, receiverUID) => {
            // fetch senderUID chatIds
            const senderRef = doc(db, 'Users', senderUID);
            const senderSnap = await getDoc(senderRef);
            const senderData = senderSnap.data();
            const senderChatIds = senderData.chatIds;
            if (senderChatIds === undefined) {
                return null;
            } else {
                for (const chatId of senderChatIds) {
                if (chatId.includes(receiverUID)) {
                    return chatId;
                }
            }

            }

            //iterating through the Chatid array to find the chatid that contains the receiverUID
            

            return null;


        };

        const updateUserChatIds = async(userId, chatId) => {
            const userRef = doc(db, 'Users', userId);
            await updateDoc(userRef, {
                chatIds: arrayUnion(chatId),
            })
        };

        const navigateToPostDetails = (postId) => {
            router.push({ name: 'PostDetails', params: { postId: postId }});

        };

        const createMessageDocument = async (docID, senderUID, receiverUID, senderName, receiverName) => {
            const docRef = doc(db, 'Message', docID);
            const docSnap = await getDoc(docRef);
            console.log("done")
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    senderUID,
                    receiverUID,
                    senderName,
                    receiverName,
                    createdAt: serverTimestamp(),
                });
                
            }
        };

        const addMessageToList = async (docID, senderUID, receiverUID, senderName, receiverName, messageContent) => {
            const msgListRef = collection(db, 'Message', docID, 'msglist');
            await addDoc(msgListRef, {
                senderUID,
                receiverUID,
                senderName,
                receiverName,
                message: messageContent,
                timestamp: serverTimestamp(),
            });
        };

        const fetchUserProfileFromFirebase = async () => {
            const db = getFirestore(firebaseApp);
            const userId = route.params.userId;

            if (!userId) {
                console.error('No user ID provided');
                return;
            }

            const userDocRef = doc(db, 'Users', userId);

            try {
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const profileData = userDocSnap.data();

                    // Constructing the display name
                    let displayName = profileData.name; // default to the 'name' field
                    if (profileData.firstName || profileData.lastName) {
                        displayName = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
                    }

                    // Extracting the year of study
                    const yearMatch = profileData.yearOfStudy ? String(profileData.yearOfStudy).match(/\d+/) : null;
                    const yearOfStudy = yearMatch ? yearMatch[0] : 'Unknown';

                    // Handling the profile picture
                    let profilePicture = profileData.profilePicture || defaultProfilePicture;

                    userProfile.value = {
                        ...profileData, 
                        displayName,
                        yearOfStudy, 
                        profilePicture
                    };
                } else {
                    console.error('Profile document does not exist!');
                }
            } catch (error) {
                console.error('Error fetching profile: ', error);
            }
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
            unlikePost(postId, userId)
            break;
          } else {
            const currentPostRef = doc(db, "Posts", postId);

            const currentPostSnap = await getDoc(currentPostRef);
            const postData = currentPostSnap.data();
            const userPostedId = postData.userid;
            console.log(userPostedId)
            const currentLikes = postData.likes;
            const updates = {
              likes: currentLikes + 1,
            };

            // Update the like count for the post
            await updateDoc(doc(db, "Posts", postId), updates);
            console.log("userPostedId: " + userPostedId)
            console.log("postId: " + postId)
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
        } 
      } else {
        const currentPostRef = doc(db, "Posts", postId);
        
        const currentPostSnap = await getDoc(currentPostRef);
        const postData = currentPostSnap.data();
        const userPostedId = postData.userid;
        const currentLikes = postData.likes;
        const updates = {
          likes: currentLikes + 1
        };
        console.log(userPostedId)

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
      
    };

    const unlikePost = async (postId, userId) => {
      const db = getFirestore(firebaseApp);
      const currentPostRef = doc(db, "Posts", postId);
      const currentPostSnap = await getDoc(currentPostRef);
      const postData = currentPostSnap.data();
      const userPostedId = postData.userid;

      const postRef = collection(db, "Posts", postId, "Likes");   
      const postSnap = await getDocs(postRef)
      const likesCount = await getCountFromServer(postRef);

      if (likesCount.data().count > 0 ) {
        for (const document of postSnap.docs) {
          const likeData = document.data();
          console.log(likeData);
          const userLiked = likeData.userId;

          if (userLiked == userId) {
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
      
    };

        onMounted(fetchUserProfileFromFirebase);


        return {
            userProfile,
            showMessageDialog,
            showBlockDialog,
            messageText,
            messageDialogRef,
            blockDialogRef,
            openUploadMessageDialog,
            closeMessageDialog,
            openUploadBlockDialog,
            closeBlockDialog,
            sendMessage,
            createMessageDocument,
            addMessageToList,
            fetchUserPosts,
            posts,
            uid,
            likePost,
            navigateToPostDetails,
            unlikePost,
        };
    },
});
</script>

<style scoped>
.looking-at-profile-page { 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-y: auto;
    font-size: var(--font-size-lg);
    color: var(--color-black);
    font-family: var(--font-inter);
}
  
.navigation {
    background-color: #525fe1;
    width: 100%;
    height: 10rem;
}

.profile-section {
    display: flex;
    justify-content: center;
    padding: 2rem;
    margin-top: 5rem;  /* Adjusting for the navigation height */
}

.left-section {
    width: 30%;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    position: relative;
}

.profile-image {
    display: block;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 2rem;
    margin-right: 10rem;
    object-fit: cover;
}

.buttons-container {
    display: flex;
    justify-content: space-between;
    width: 75%;
    padding: 1rem 0;  
    position: relative;
    left:-15px;
}

.message, .block {
    display: block;
    width: 40%;
    margin: 0 0.5rem;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    flex: 1;
    text-align: center;
    cursor: pointer;
}

.message {
    background-color: #F86F03;
    color: white;
    border-radius: 40px;
    font-size: 15px;
    font-family: var(--font-josefin-sans);
    cursor: pointer;
}

.block {
    background-color: #FF4E50;
    color: white;
    border-radius: 40px;
    font-size: 15px;
    font-family: var(--font-josefin-sans);
    cursor: pointer;
}

.group-info {
    display: flex;
    flex-direction: row;
    text-align: left;
    position: relative;
    gap: 40px;
    left: -20px;
}

.profile-details {

    flex-direction: column;
    text-align: left;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Creates 2 columns */
    grid-template-rows: repeat(4, auto); /* Each row's height will be determined by its content */
    gap: 20px;
    
}

.grouparray {
    position: relative;
    top: 30px;
    flex-direction: row;
    align-items: left;
}

button {
    width: 130px;
    height: 50px;
    
}

.header {
    font-size:30px;
    font-family: var(--font-yeseva-one);
    position:relative;
    top:20px;
    left: 0px;
}

.header-profile {
    font-size: 30px;
    font-family: var(--font-yeseva-one);
}

.profile-info {
    position: relative;
    font-size: 25px;
    font-family: var(--font-josefin-sans);
    margin-left: 25px;
    top: 10px
}

.name-and-username {
    display: flex; 
    align-items: center;
    gap: 80px;
    margin-left: 10px;
}

h4 {
    font-size: 1.5rem;
    color: #ada6a6;
    margin-bottom: 1rem;
    font-style:italic;
    font-weight: lighter;
    position: relative;
    top: -30px;
    font-family: var(--font-josefin-sans);
}

p {
    font-family: var(--font-josefin-sans);
}

.major-profileDescription {
    position: relative;
    top: -20px;
    margin-left: 10px;
}

h3 {
    font-family: var(--font-josefin-sans);
    color: #ADA6A6;
    font-size: 22px;
    position: relative;
    top:-30px;
    font-size: 30px;
    
}

.right-section {
    width: 60%;
    text-align: left;
    padding-left: 80px;

    
}

.right-section h2 {
    font-size: 60px;
    color: #525fe1;

}

.right-section h3 {
    color: #555;
    margin-bottom: 1rem;
}

.right-section p, .right-section div {
    margin-bottom: 1.5rem;
    line-height: 1.5;
}

.post-header {
    font-size: var(--font-size-29xl);
    font-family: var(--font-yeseva-one);
    margin-bottom: 2rem;
    color: #525fe1;
    margin-left: 100px;
    position: relative;

}

.post-list {
    margin-bottom: 8rem;
    width: 1000px;
    height: 300px;
    margin-left: 100px;
    

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
    margin-left: 850px;
    width: 120px;
    bottom: 5px;
    background: transparent;
    border: 0px;
    cursor: pointer;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
  }
  .likeButton {
    position: absolute;
    margin-left: 695px;
    top: 106px;
    background: transparent;
    cursor: pointer;
    border: 0px;
  }

  .likes {
    position: absolute;
    margin-left: 785px;
    width: 120px;
    bottom: 20px;
    background: transparent;
    border: 0px;
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
    top: 5px;
    margin-left: 100px;
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

  .post-content {
    font-family: var(--font-inter);
    font-size: var(--font-size-base);
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
