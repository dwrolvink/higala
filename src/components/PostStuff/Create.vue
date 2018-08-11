<template>
  <div id="create" class="mb-4">
    <v-card>
      <v-form ref="createForm" v-model="valid" lazy-validation>
        <v-card-title
        class="title font-weight-light"
        primary-title
        ><v-icon class="mr-1">edit</v-icon> Create a post
        </v-card-title>
        <v-card-title>
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
        </v-card-title>
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

export default {
  name: "CreatePost",
  data() {
    return {
      valid: true,
      postContent: "",
      errors: null
    };
  },
  methods: {
    clear() {
      this.$refs.createForm.reset();
    },
    submit() {
      if (this.$refs.createForm.validate()) {
        axios.post(
          "http://127.0.0.1:5000/posts",
          {
            content: this.postContent,
            image_id: null
          },
          {
            headers: { Authorization: "Bearer " + localStorage.access_token }
          }
        );
      }
    }
  }
};
</script>
