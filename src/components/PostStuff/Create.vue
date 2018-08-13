<template>
  <div id="create" class="mb-4">
    <v-card>
      <v-form ref="createForm" v-model="valid" lazy-validation>
        <v-card-title
        class="title font-weight-light"
        primary-title
        ><v-icon class="mr-1">edit</v-icon> Create a post
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-textarea
              box
              label="Post content"
              auto-grow
              row-height="5"
              :counter="1500"
              :rules="[v => (v && v.length <= 1500)]"
              required
              v-model="postContent"
              >
              </v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn 
          block 
          color="deep-purple lighten-2"
          class="white--text"
          :disabled="!valid"
          @click="submit"
          >
          Post
          </v-btn>
          <v-btn icon dark color="deep-purple lighten-2"
          @click="clear"
          >
            <v-icon>cancel</v-icon>
          </v-btn>
          <v-btn icon dark color="deep-purple lighten-2">
            <v-icon>image</v-icon>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      valid: true,
      postContent: "",
      snackbar: false,
      text: "",
      errors: null
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  methods: {
    clear() {
      this.$refs.createForm.reset();
    },
    submit() {
      if (this.$refs.createForm.validate()) {
        axios
          .post(
            this.backendUrl + "posts",
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
            if (response.data.success === true) {
              this.$refs.createForm.reset();
              this.$emit("postCreated");
            }
          });
      }
    } // Submit end
  }
};
</script>
