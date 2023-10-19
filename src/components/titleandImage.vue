<template>
    <div class="image-and-title">
            <div class="image-update">
                <img :src="uploadedImage || '../assets/friends.png'" class="profile-image">
                <button class="camera-upload" @click="openUploadDialog">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-camera-bolt" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M13 20h-8a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
                        <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                        <path d="M19 16l-2 3h4l-2 3" />
                    </svg>

                </button>
             

            </div>

            
            
            <h1> Edit Profile </h1>
    </div>

    <div class="popup" v-show="showUploadDialog" ref="uploadDialog">
        <div class="popup-content">
            <h2>Upload or Remove Photo</h2>
            <div class="action-buttons">
                <input type="file" accept="image/*" @change="handleFileUpload" class="custom-file-input" />
            
                <button @click="removePhoto" class="remove-photo">Remove Photo</button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  name: "TitleAndImage",
  data() {
    return {
      showUploadDialog: false,
      uploadedImage: null,
    };
  },

  methods: {
    openUploadDialog() {
      this.showUploadDialog = true;

      // Add a click event listener to the entire document when the popup is open
      document.addEventListener("click", this.closeUploadDialogOnClickOutside);

      // Prevent the click event on the button from propagating and immediately closing the popup
      event.stopPropagation();
    },

    closeUploadDialog() {
      this.showUploadDialog = false;
      document.removeEventListener("click", this.closeUploadDialogOnClickOutside);
    },

    removePhoto() {
      this.uploadedImage = null;
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.uploadedImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },

    closeUploadDialogOnClickOutside(event) {
      // Check if the click event occurred outside of the popup
      const popup = this.$refs.uploadDialog;
      if (popup && !popup.contains(event.target)) {
        this.closeUploadDialog();
      }
    },
  },
};
</script>



<style>

.image-update {
    margin-top: 100px;
}

/* Style for the pop-up background */
.popup {
    position: fixed;
    top:25%;
    left: 19%;
    width: 880px;
    height: 363px;
    z-index: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    text-align: center;
    display: flex;
       
}



/* Style for the pop-up content */
.popup-content {
    justify-content: space-between;
}


.popup-content button {
    border: 2px solid #525fe1;
    height: 50px;
    width: 536px;
    color: #525fe1;
    border-radius: 30px;
    font-size: 25px;
    background-color: white;
    font-family: josefin sans;
    cursor: pointer;

    
}

h2 {
    color: black;
    font-size: 60px;
    position: relative;
    top: -40px;
    
}


/* Style the custom file input container */
.custom-file-upload {
  position: relative;
  display: inline-block;
}

/* Style the custom file input button */
.custom-file-input {
  font-size: 15px;
  opacity: 100;
  cursor: pointer;
  color: white;
  font-family: josefin sans;
  
 
}
input[type="file"] {
    width: 700px;
    margin-left: 165px;
}

input[type="file"]::file-selector-button {
  border-radius: 40px;
  height: 50px;
  width: 536px;
  font-size: 25px;
  cursor: pointer;
  background-color: #525fe1;
  color: white;
  border: none;
  transition: background-color 200ms;
  font-family: josefin sans;
  margin-right: 40px;
  margin-top: 3px;
  
}

.remove-photo {
    position: relative;
    top: 30px;
}



</style>

