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
        <button class="button is-info is-fullwidth is-rounded">
          <b-icon icon="image"></b-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      postContent: ""
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  methods: {
    submit() {
      if (this.postContent === "") {
        this.toast("You cannot leave the field empty.", "is-warning");
      } else {
        axios
          .post(
            this.backendUrl + "/posts",
            {
              content: this.postContent,
              image_id: null
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.access_token
              }
            }
          )
          .then(response => {
            if (response.status === 200) {
              this.$refs.createForm.reset();
              this.$emit("postCreated", response.data.new_post);
              console.log("I think it emitted properly.")
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
      }
    },
    toast(msg, type) {
      this.$toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    }
  }
};
</script>
