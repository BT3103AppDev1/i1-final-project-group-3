<template>
<div class="profile-page-displays-all-posts">
  <div class="header">
        <b class="studybuddy">StudyBuddy</b>
        <div class="header-navigation">
            <button type="button" class ="logoutbutton"> Log Out</button>
            <button type="button" class="profile">Profile</button>
            <button type="button" class="chats">Chats</button>
            <button type="button" class="posts">Posts</button>
            <button type="button" class="home">Home</button>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
    .header-navigation {
    position: absolute;
    left: 400px;
  }
  .logoutbutton {
    position: absolute;
    font-weight: 600;
    display: inline-block;
    top: 66px;
    left: 1245px;
    width: 140px;
    height: 53px;
    font-size: var(--font-size-3xl);
    border-radius: var(--br-21xl);
    background-color: var(--color-darkorange);
    border: 1px solid var(--color-darkorange);
    color: var(--color-white);
    box-sizing: border-box;
    cursor:pointer;
  }
  .logoutbutton:active {
    background-color: rgb(253, 170, 147);
    border: 1px solid rgb(253, 170, 147);
  }
  .profile {
    position: absolute;
    top: 82px;
    left: 1078px;
    font-weight: 600;
    display: inline-block;
    width: 134px;
    height: 37px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
    cursor:pointer;
  }
  .profile:active, .chats:active, .posts:active, .home:active {
    color: black;
  }
  .chats {
    position: absolute;
    top: 82px;
    left: 944px;
    font-weight: 600;
    display: inline-block;
    width: 134px;
    height: 37px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
    cursor:pointer;
  }
  .posts {
    position: absolute;
    top: 82px;
    left: 810px;
    font-weight: 600;
    display: inline-block;
    width: 134px;
    height: 37px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
    cursor:pointer;
  }
  .home {
    position: absolute;
    top: 82px;
    left: 694px;
    font-weight: 600;
    display: inline-block;
    width: 134px;
    height: 37px;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font-size: var(--font-size-3xl);
    color: var(--color-white);
    font-family: var(--font-josefin-sans);
    cursor:pointer;
  }
  .studybuddy {
    position: absolute;
    top: 73px;
    left: 14px;
    font-size: var(--font-size-29xl);
    display: inline-block;
    width: 401px;
    height: 40px;
  }
  .header {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 165px;
    text-align: center;
    font-size: var(--font-size-3xl);
    font-family: var(--font-josefin-sans);
    background-color: var(--color-mediumslateblue);
    text-align: center;
  }
  .profile-page-displays-all-posts {
    background-color: var(--color-white);
    width: 1440px;
    height: 1024px;
    overflow: hidden;
    text-align: left;
    font-size: var(--font-size-lg);
    color: var(--color-white);
    font-family: var(--font-inter);
  }
</style>