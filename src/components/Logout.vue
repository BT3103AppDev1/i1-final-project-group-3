<template>
    <button id="btn" @click="signOut" v-if="user"> LogOut </button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
    name:"LogOut",

    data() {
        return {
            user: false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user);
            if (user) {
                this.user = user;
            } else {
                this.user = false;
            }
        });
    },


    methods: {
    signOut() {
        console.log("press");
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Successfully signed out");
            this.$router.push({name:'Login'});
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    }
}

}
</script>

<style scoped>
#btn {
    text-align: center;
    margin: auto;
}

#btn:hover {
    color: rgb(243, 236, 236);
    background-color: rgb(255, 94, 0);
    box-shadow: 3px 3px grey;
}
</style>
