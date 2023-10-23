<template>
    <NavigationBar class="navbar"/>
    <div class="hello"> 
        <h1>Chat Page</h1>
    </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from "../firebase";

export default {
    name: "Chats",
    
    components: {
      NavigationBar
    },

    data() {
        return {
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
    }
}
</script>

<style>




</style>
