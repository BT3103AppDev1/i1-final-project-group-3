<template>
    <NavigationBar class="navbar"/>
    <div class="hello"> 
        <h1>Chat Page</h1>
    </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'

export default {
    name: "Chats",
    
    components: {
      NavigationBar
    },
}
</script>

<style scoped>

.navbar{
    top: 0px;
    left: 0px;
}




</style>
