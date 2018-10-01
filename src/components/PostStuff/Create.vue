<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title is-size-5 has-text-weight-light">
        <b-icon icon="pencil"></b-icon> <span class="ml2"> Create a new post </span>
      </div>
    </div>
      <div class="card-content">
        <div class="content">
          <form ref="createForm">
            <b-field label="Post Content"
              :type="errors.has('post') ? 'is-danger' : ''"
              :message="errors.has('post') ? errors.first('post') : ''"
            >
              <b-input 
                name="post"
                type="textarea" 
                maxlength="1500" 
                rows="1"
                v-model="postContent"
                v-validate="'max:1500'"
              ></b-input>
            </b-field>
          </form>
        </div>
      </div>
    <div class="columns pr3 pl3">
      <div class="column is-10">
        <button class="button is-info is-fullwidth"
          :disabled="errors.any()"
          @click="submit"
        >Post</button>
      </div>
      <div class="column is-2">
        <button 
          :class="['button', 'is-fullwidth', 'is-rounded', image_id ? 'is-success': 'is-info']"
          @click="imageUploadModal = true"
        >
          <b-icon :icon="image_id ? 'check': 'image'"></b-icon>
        </button>
      </div>
    </div>

    <!-- Modal Area -->
    <b-modal :active.sync="imageUploadModal" :width="640" scroll="keep">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title is-size-4">
            Upload an image
          </p>
        </header>
        <div class="card-content">
          <div v-if="errors.has('image')" class="notification is-danger">
            {{ errors.first('image') }}
          </div>

          <img :src="imageUrl">

          <div class="level is-mobile">
            <div class="level-left">
              <button class="button is-info"
                @click="onPickFile"
              >
                Select Image
              </button>

              <input 
                v-validate="'image|size:10240|ext:png,jpg,jpeg,gif'"
                name="image"
                type="file" 
                style="display: none;" 
                ref="fileInput"
                @change="onFilePicked"
                accept="image/*"
              >
            </div>

            <div class="level-right">
              <button 
                :class="['button', 'is-primary', uploadingImage ? 'is-loading': '']"
                :disabled="!imageValid"
                @click="uploadImage"
              >
                <b-icon
                  icon="send"
                >
                </b-icon>
              </button>
            </div>
          </div>

        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      postContent: "",
      imageUploadModal: false,
      imageUrl: "",
      imageValid: false,
      image: null,
      uploadingImage: false,
      image_id: ""
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  methods: {
    submit() {
      if (this.postContent != "" || this.image_id != "") {
        axios
          .post(
            this.backendUrl + "/posts",
            {
              content: this.postContent,
              image_id: this.image_id
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.access_token
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.postContent = "";
              this.image = null;
              this.image_id = "";
              this.$emit("postCreated", response.data.new_post);
            }
          })
          .catch(error => {
            if (error.response.status === 500) {
              this.toast(
                "Something went wrong during the proccess",
                "is-danger"
              );
            }
          });
      } else {
        this.toast("You cannot create an empty post.", "is-warning");
      }
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let imageFile = files[0];
      if (imageFile.name.lastIndexOf(".") <= 0) {
        this.toast("Please add a valid file!", "is-warning");
      } else {
        const fReader = new FileReader();
        fReader.addEventListener("load", () => {
          this.imageUrl = fReader.result;
        });
        fReader.readAsDataURL(imageFile);
        this.imageValid = true;
        this.image = imageFile;
      }
    },
    uploadImage() {
      this.uploadingImage = true;
      const formData = new FormData();
      formData.append("image", this.image);
      axios
        .post(this.backendUrl + "/imageupload", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          if (response.data.success === true) {
            this.image_id = response.data.image_id;
            this.imageUploadModal = false;
          }
        })
        .catch(error => {
          let status = error.response.status;
          if (status === 404) {
            this.toast("No file found!", "is-danger");
          } else if (status === 403) {
            this.toast("Method not allowed!", "is-danger");
          } else if (status === 413) {
            this.toast("File is too large! (Max 10MB)", "is-danger");
          } else {
            this.toast("Something went wrong during the process", "is-danger");
          }
        })
        .then((this.uploadingImage = false), (this.image = null));
    },
    toast(msg, type) {
      this.$toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    },
    removeImage(index) {
      this.imageFile.splice(index, 1);
    }
  }
};
</script>
