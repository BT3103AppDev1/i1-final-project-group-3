<template>
    <div class="looking-at-profile-page">
       <div class = "navigation"> 
          <NavigationBar/>
       </div>

    <div class ="profile-section">
        <div class="left-section">
            <!-- Static Image -->
            <img class="profile-image" alt = "" src="../assets/profile_picture_yj.jpg" />
            
            <!-- Action buttons -->
            <div class="buttons-container">
                <button class="message">Send a Message</button>
                <button class="block">Block</button>
            </div>

            <p class="GroupInfo">
                <strong>Current Group:</strong> Manifesting for A+
            </p>
        </div>
        <div class="right-section">
            <h2>Zhou Yujie<span>@yujie_zhou</span></h2>
            <h3>Business Analytics, Year 3</h3>
            <p>
                Hi, I aspire to become a Business Analyst once I graduate. 
                I am an enthusiastic, self-motivated and hardworking person.
            </p>
            <div class="email">Email: e01234567@u.nus.edu</div>
            <div class="courses">
                <strong>Current Courses:</strong>
                <ul>
                    <li>BT3102</li>
                    <li>BT3103</li>
                    <li>IS3103</li>
                    <li>CS2040</li>
                    <li>GEC1015</li>
                </ul>
            </div>
            <div class="study-style">
            Study Style: Visual Learner, loves coding and mathematics.
            </div>
            <div class="preference">
            Preference of StudyBuddy: I am looking for a study partner that is hardworking, focused and can keep me motivated to study.
            </div>
        </div>
    </div>
    </div>
</template>
  

<script>  
    import { defineComponent } from "vue";
    import NavigationBar from '../components/NavigationBar.vue';

    export default defineComponent({
        name: "TopContainer",
        components: {
            NavigationBar
        }
    });
</script>


<style scoped>
.looking-at-profile-page { 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    text-align: center;
    overflow-y: auto;
    position: fixed;
    font-size: var(--font-size-lg);
    color: var(--color-black);
    font-family: var(--font-inter);
}
  
.navigation {
    position: absolute;
    background-color: #525fe1;
    width: 100%;
    height: 10rem;
}

.profile-section {
    display: flex;
    justify-content: center;
    padding: 2rem;
    margin-top: 15rem;  /* Adjusting for the navigation height */
}

.left-section {
    width: 30%;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
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
}

.block {
    background-color: #FF4E50;
    color: white;
}

.GroupInfo {
    margin-top: 1rem;
    font-size: 1.1rem;
}

.right-section {
    width: 60%;
}

.right-section h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.right-section h2 span {
    font-size: 1.2rem;
    color: #555;
    margin-left: 0.5rem;
}

.right-section h3 {
    font-size: 1.4rem;
    color: #555;
    margin-bottom: 1rem;
}

.right-section p, .right-section div {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.5;
}

.right-section strong {
    font-weight: bold;
}

</style>