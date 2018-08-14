<template>
  <v-container grid-list-lg>
    <v-snackbar v-model="snackbar" top :color="snackbarColor">
    {{ text }}
    <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs3>
        <CurrentUser/>
      </v-flex>

      <v-flex xs6>
        <Create v-on:postCreated="updateFeed"/>
        <div v-if="posts">
          <div v-for="(post, index) in posts" :key="index">
            <Post 
              :post="post" 
              v-on:postDeleted="removePost"
              v-on:notPostOwner="falseOwner"
            />
          </div>
        </div>
        <div v-else align="center" class="mt-5">
          <p class="mr-2 display-1">Loading posts</p>
          <v-progress-circular
          :size="40"
          color="deep-purple lighten-1"
          indeterminate
          >
          </v-progress-circular>
        </div>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapState } from 'vuex'
import Post from '@/components/PostStuff/Post.vue'
import CurrentUser from '@/components/CurrentUser.vue'
import Create from '@/components/PostStuff/Create.vue'

export default {
  name: 'Home',
  data() {
    return {
      posts: null,
      errors: null,
      loading: false,
      snackbar: false,
      snackbarColor: "",
      text: ""
    }
  },
  components: {
    CurrentUser,
    Create,
    Post
  },
  created() {
    this.getPosts()
  },
  computed: {
    ...mapState([
      "backendUrl"
    ])
  },                              
  methods: {
    getPosts() {
      this.error = this.posts = null
      this.loading = true
      if (localStorage.getItem("access_token") === null){
        this.$router.push("/login")
      } else {
        var access_token = localStorage.access_token
        axios.get(this.backendUrl + "posts", {
          headers: {
            Authorization: "Bearer " + access_token
          }
        })
        .then(response => {
          this.posts = response.data
          this.loading = false
          })
        .catch(error => {
          var status = error.response.status
          if (status === 500) {
            this.$router.push('/login')
          } else {
            this.snackbar = true;
            this.text = "Something went wrong";
            this.snackbarColor = "red lighten-2";
          }
        });
      }
    }, // Get Posts end
      updateFeed() {
      this.getPosts()
      this.snackbar = true;
      this.text = "Post has successfully been created";
      this.snackbarColor = "success";
    },
    removePost(postId) {
      // Get item index
      var index = this.posts.findIndex(post => post.id === postId);
      this.posts.splice(index, 1);
      this.snackbar = true;
      this.text = "Post has been deleted!";
      this.snackbarColor = "success";
    },
    falseOwner() {
      this.snackbar = true;
      this.text = "You do not own this post!";
      this.snackbarColor = "red lighten-2";
    }
  }
};
</script>
