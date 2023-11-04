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

    <div class="post1">
      <div class="comments">Comments: 1</div>
      <div class="div2">|</div>
      <div class="likes">Likes: 3</div>
      <b class="post-title">DAO1704x hw1 answer</b>
      <img class="post-user-image" alt="" src="../assets/profile_picture.jpg" />
      <div class="user-name">Liu Siyi</div>
      <div class="post-date">14/2/2023</div>
      <div class="post-content-container">
        <p class="post-content">Anyone has the hw1 answer key?</p>
      </div>
      <div class="post-divider-line" />
    </div>

    <div class="post2">
      <div class="comments">Comments: 1</div>
      <div class="div2">|</div>
      <div class="likes">Likes: 3</div>
      <b class="post-title">DAO1704x hw1 answer</b>
      <img class="post-user-image" alt="" src="../assets/profile_picture.jpg" />
      <div class="user-name">Liu Siyi</div>
      <div class="post-date">14/2/2023</div>
      <div class="post-content-container">
        <p class="post-content">Anyone has the hw1 answer key?</p>
      </div>
      <div class="post-divider-line" />
    </div>
  </div>

</template>

<script>
import NavigationBar from '@/components/navigationbar.vue'

export default {
    name: "Post",
    
    components: {
      NavigationBar
    },

    methods: {
      navigateToCreatePost() {
        this.$router.push({ name: 'CreatePost' });
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

  .post1 {
    position: absolute;
    top: 28.31rem;
    left: 11.88rem;
    width: 23.69rem;
    height: 8.69rem;
  }

  .comments {
    position: absolute;
    top: 9.15rem;
    left: 59.31rem;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    width: 100%;
  }
  .div2 {
    position: absolute;
    top: 9.19rem;
    left: 57.81rem;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
  }
  .likes {
    position: absolute;
    top: 9.19rem;
    left: 53.06rem;
    font-size: var(--font-size-base);
    font-family: var(--font-inter);
    color: var(--color-dimgray);
    width: 100%;
  }
  .post-title {
    position: absolute;
    top: 43.88%;
    left: 0%;
    font-weight: bold;
  }
  .post-user-image {
    position: absolute;
    height: 30.94%;
    width: 11.35%;
    top: 0%;
    right: 88.65%;
    bottom: 69.06%;
    left: 0%;
    border-radius: 50%;
    max-width: 100%;
    overflow: hidden;
    max-height: 100%;
    object-fit: cover;
  }
  .user-name {
    position: absolute;
    top: 5.04%;
    left: 14.78%;
    font-weight: 500;
  }

  .post-date {
    position: absolute;
    top: 5.04%;
    left: 59.63%;
    font-weight: 500;
  }
  .post-content {
    margin: 0;
  }
  .post-content-container {
    position: absolute;
    top: 71.22%;
    left: 0%;
    font-weight: 300;
  }

  .post-divider-line {
    position: absolute;
    height: 4.83%;
    width: 280%;
    bottom: -30%;
    right: 27.29%;
    left: -1%;
    border-bottom: 1px solid var(--color-black);
    box-sizing: border-box;
  }

  .post2 {
    position: absolute;
    top: 42.31rem;
    left: 11.88rem;
    width: 23.69rem;
    height: 8.69rem;
  }


</style>
