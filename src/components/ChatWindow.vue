<template>
    <div class="chatwindow">
        <div class="msg" v-for="(row, index) in msg" :key="row.text">
            <span>{{ row.user }}</span><br>
            <span>{{ row.time.toDate() }}</span>
            <h3>{{ row.text }}</h3>
        </div>
    </div>
    <div class="send">
        <form class="send_msg" id="input-form">
            <input class="new_msg" id="new" type="text" v-model="newMessage">
        </form>
        <button class="send_btn" type="submit">
            <img class="next-child" alt="" src="../assets/rectangle-48@2x.png" />
            <span class="next1" @click="sendMsg">Send</span>
        </button>
    </div>
</template>

<script>
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebaseApp from '@/firebase.js';
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

import { getDatabase, ref, onValue } from "firebase/database";
import { doc, setDoc, getDoc, collection, getDocs, onSnapshot, query, orderBy } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { uuid } from 'vue-uuid'; 

const db = getFirestore(firebaseApp);
//const database = firebaseApp.firestore();

export default {
    name: "ChatWindow",
    data() {
        return {
            user: false,
            uid: null,
            msg: [],
            userName: null,
            newMessage: "",
        };
    },
    props: {
        chatID: String
    },
    mounted() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user;
          this.uid = auth.currentUser.uid;
          console.log("try display name:")
          this.userName = auth.currentUser.displayName;
          console.log(this.userName);
        }
      });
      console.log("try display name:")
      console.log(this.user);
      const q = query(collection(db, "Message", this.chatID, "msglist"), orderBy("timestamp", "asc"));
      const a1 = onSnapshot(q, (snapshot) => {
          console.log("In snapshot: ")
          console.log(snapshot.docs);
          this.msg = [];
          snapshot.forEach((doc) => {
            let data = doc.data();
                console.log(data.message);
                console.log(data.timestamp.toDate());
                console.log(data.senderUID);
                console.log(data.senderName);
                let sender = data.send_uid == this.uid;
                const message = {
                    text: data.message,
                    time: data.timestamp,
                    user: data.senderName,
                    sender_is_user: sender,
                }
                this.msg.push(message);
          })
      })
    },
    methods: {
        async sendMsg(event) {
            event.preventDefault();
            let newMsg = document.getElementById("new").value;
            console.log(newMsg);
            if (newMsg != "") {
                this.newMessage = "";
                try{
                    const docRef = await setDoc(doc(db, "Message", this.chatID, "msglist", uuid.v1()),{
                        message: newMsg,
                        senderUID: this.uid,
                        senderName: this.userName,
                        timestamp: new Date(),
                    })
                    
                } catch(error) {
                    console.error("Error adding document: ", error);
                }
            }
        },
        async fetchData() {
            let chatDocument = await getDoc(doc(db, "Message", this.chatID));
            let chatData = chatDocument.data();
            console.log("fetched data:");
            console.log(chatData);
            
        },
        async fetchMsg() {
            const database = getDatabase();
            const refer = ref(database, "Message/" + this.chatID + "/messageList")
            onValue(refer, (snapshot) => {
                const data = snapshot.val();
                console.log("In onValue: ")
                console.log(data);
            });

            let msgDoc = await getDocs(collection(db, "Message", this.chatID, "messageList"));
            //let msgData = msgDoc.data();
            console.log(msgDoc);
            msgDoc.forEach((msg) => {
                let data = msg.data();
                console.log(data.text);
                console.log(data.addTime.toDate());
                console.log(data.send_uid);
                console.log(data.send_user);
                let sender = data.send_uid == this.uid;
                const message = {
                    text: data.text,
                    time: data.addTime,
                    user: data.send_user,
                    sender_is_user: sender,
                }
                this.msg.push(message);
            })
        }
    }
}
</script>

<style scoped>
.next-child {
    position: absolute;
    top: 0rem;
    left: 0rem;
    border-radius: 40px;
    width: 8.06rem;
    height: 2.19rem;
    object-fit: cover;
  }

  .next1 {
    position: absolute;
    top: 0.44rem;
    left: 1.38rem;
    font-size: 1.25rem;
    font-weight: 600;
    font-family: var(--font-josefin-sans);
    color: var(--color-white);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 5.31rem;
    height: 1.31rem;
  }

  .send_btn {
    cursor: pointer;
    border: none;
    padding: 0;
    background-color: transparent;
    position: absolute;
    width: 8.06rem;
    height: 2.19rem;
  }
</style>