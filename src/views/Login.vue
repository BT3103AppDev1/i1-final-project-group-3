<template>
    <div class="login-page">
        <div class="rectangle-parent">
            <div class="rectangle-group">
                <b class="studybuddy">StudyBuddy</b>
            </div>

            <h1 class="login-main">Login</h1>
            <div class="create-account">Don't have an account? <a class="sign-up" @click="navigateToRegistration"> Sign up here </a></div>
        </div>

        <div class="login-form">
            <form @submit="onSubmit">

                <div class="email">
                    
                    <h3>Email: </h3>
                    <input type="email" v-model="email" placeholder="Example: e0123456@u.nus.edu" />

                </div>
                

                <div class="password"> 
                    <h3>Password: </h3>
                    <input type="password" v-model="password" placeholder="Example: Abcdefg123!" /> 
                </div>
                
                <div class="bottom-row">
                    <div class="forgot-password">Forgot Password?</div>
                    <button class="login-button" @click="navigateToProfile">Login</button>
                </div>
                
                
            </form>
        </div>
    </div>
</template>

<script>

export default {
    
    name: "Login",

    methods: {
      navigateToProfile() {
        this.$router.push({ name: 'EditProfile' });
      },
      navigateToRegistration() {
        this.$router.push({ name: 'Registration' });
      }
    }, 
}


</script>


<style scoped>
h3 {
    font-size: 40px;
    color: #ADA6A6;
}

div, input {
    font-family: josefin sans;
}

.rectangle-parent {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 319px;
    text-align: center;
    color: white;
    background-color: #525fe1;
}

.studybuddy {
    position: absolute;
    top: 30px;
    left: 2px;
    font-size: 48px;
    font-weight: 700;
    width: 401px;
    height: 40px;
  }

  .login-main {
    position: center;
    padding-top: 120px;
    font-size: 100px;
    font-weight: 300;
    mix-blend-mode: normal;
  }

  .create-account {
    position: center;
    font-size: 24px;
    font-weight: 500;
    margin-top: 25px;
  }


  .login-form {
    position: relative;
    top: 50px;
    right: 220px;
  }

  
  .login-form input {

    border: none;
    border-bottom: 1px solid #ccc;
    height: 60px;
    padding-top:20px;
    width: 100%;
    box-sizing: border-box;
    font-size:20px;
    padding-left: 30px;
}

.login-form h3 {
    margin-bottom: 15=0px;

}

input::placeholder {
    padding-top: 30px;
    padding-left: 30px;
    font-style: italic;
    font-size: 20px;
    color: #ADA6A6;
}

.sign-up {
    color: white;
    text-decoration: underline;
    font-style: italic;
    cursor: pointer;
}

.login-form input:focus {
  outline: none;
  border-color: #3730A3;
}

.password {
    margin-top: 70px;
}

.forgot-password {
    color: #ADA6A6;
    font-style: italic;
    margin-left: 50px;
    position: relative;
    top: 30px




}

button {
    background-color: #f86f03;
    border-radius: 40px;
    border: none;
    color: white;
    font-family: var(--font-josefin-sans);
    cursor: pointer;
    width: 134px;
    height: 37px;
    margin-left: 330px;
    


    
  }

button:hover {
    background-color: #525fe1;
    opacity: 0.8;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

  .login-button {
    font-size: 20px;

  }

  .bottom-row {
    position: relative;
    top: 10px;
  }



</style>