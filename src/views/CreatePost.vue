<template>
    <NavigationBar/>
    <div class="create-post">
        <div class="new-post">New Post</div>
        <div class="header">Header</div>
        <input class="enter-the-header" placeholder="Enter the header here...">
        <div class="description">Description</div>
        <textarea class="enter-the-description" placeholder="Enter the description here..."></textarea>
        <button class="insert-image">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-photo-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 8h.01"></path>
            <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5"></path>
            <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4"></path>
            <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54"></path>
            <path d="M16 19h6"></path>
            <path d="M19 16v6"></path>
          </svg>
        </button>
        <button class="cancel" @click="navigateToPost">Cancel</button>   
        <button id="post-button">Post</button>
    </div>
</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'

export default {
    name: "CreatePost",
    
    components: {
      NavigationBar
    },

    methods: {
      navigateToPost() {
        this.$router.push({ name: 'Post' });
      }
    }
}

</script>

<style>
    .create-post {
        background-color: var(--color-white);
        width: 1440px;
        height: 963px;
        text-align: left;
        font-size: var(--font-size-6xl);
        color: var(--color-white);
        font-family: var(--font-josefin-sans);
    }
    .new-post {
        position: absolute;
        top: 187px;
        left: 100px;
        font-size: var(--font-size-29xl);
        font-family: var(--font-yeseva-one);
        color: var(--color-black);
    }
    .header {
    position: absolute;
    top: 301px;
    left: 97px;
    font-size: var(--font-size-5xl);
    color: var(--color-black);
    }

    .enter-the-header {
    position: absolute;
    top: 282px;
    left: 215px;
    box-sizing: border-box;
    width: 1020px;
    height: 55px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 20px;
    font-family: var(--font-josefin-sans);
    padding: 20px;
  }

    .description {
    position: absolute;
    top: 395px;
    left: 56px;
    font-size: var(--font-size-5xl);
    color: var(--color-black);
    }

  .enter-the-description {
    position: absolute;
    top: 366px;
    left: 215px;
    box-sizing: border-box;
    width: 1020px;
    height: 453px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 20px;
    font-family: var(--font-josefin-sans);
    padding: 20px;
  }
  .insert-image {
    position: absolute;
    top: 732px;
    left: 1137px;
    border-radius: 50%;
    background-color: #d9d9d9;
    border: 1px solid #d9d9d9;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: 55px;
    height: 55px;
    cursor: pointer;
  }

  .insert-image:hover {
    background-color: #a7a7a7;
    border: 1px solid #a7a7a7;
  }

  .cancel {
    position: absolute;
    top: 877px;
    left: 804px;
    border-radius: var(--br-21xl);
    border: 1px solid var(--color-mediumslateblue);
    box-sizing: border-box;
    width: 172px;
    height: 44px;
    font-family: var(--font-yeseva-one);
    color: var(--color-mediumslateblue);
    text-align: center;
    display: inline-block;
    cursor: pointer;
    font-size: var(--font-size-6xl);

  }
  #post-button {
    position: absolute;
    top: 876px;
    left: 1046px;
    border-radius: var(--br-21xl);
    background-color: var(--color-darkorange);
    width: 172px;
    height: 44px;
    font-family: var(--font-yeseva-one);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: var(--font-size-6xl);
    color: var(--color-white);
    border: 1px solid var(--color-darkorange);
  }

  #post-button:hover {
    background-color: #ffb175;
    border: 1px solid #ffb175;
  }


</style>