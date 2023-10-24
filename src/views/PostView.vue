<template>
    <NavigationBar class="navbar"/>
    <div class="hello"> 
        <h1>Post Page</h1>
    </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'
import firebaseApp from '../firebase.js';
import {getAuth} from "firebase/auth";

export default {
    name: "Post",
    
    components: {
      NavigationBar
    },

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
            }
        })
    },
}
</script>

<style>




</style>
