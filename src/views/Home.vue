<template>
  <v-container fluid grid-list-md>
    <v-snackbar v-model="snackbar" top :color="snackbarColor">
      {{ snackbarText }}
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-layout row wrap>
      <v-flex xs12 md3>
        <CurrentUser v-on:snackbarMessage="snackbarMessage"/>
      </v-flex>
      <v-flex xs12 md6>
        <Create v-on:postCreated="updateFeed"/>
        <div v-if="posts">
          <div v-for="(post, index) in posts" :key="index">
            <Post
              :post="post"
              v-on:postDeleted="removePost"
              v-on:snackbarMessage="snackbarMessage"
            />
          </div>
          <mugen-scroll :handler="getPostsInfo" :should-handle="!loading"></mugen-scroll>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import MugenScroll from "vue-mugen-scroll";
import CurrentUser from "@/components/CurrentUser";
import Create from "@/components/PostStuff/Create";
import Post from "@/components/PostStuff/Post";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      posts: [],
      post_ids: [],
      loading: false,
      snackbar: false,
      snackbarColor: "",
      snackbarText: ""
    };
  },
  mounted() {
    this.getPostIds();
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  // Components
  components: {
    MugenScroll,
    CurrentUser,
    Create,
    Post
  },
  methods: {
    getPostIds() {
    this.loading = true;
      if (localStorage.getItem("access_token") === null) {
        this.$router.push("/login");
      } else {
        var access_token = localStorage.access_token;
        axios
          .get(this.backendUrl + "feed", {
            headers: {
              Authorization: "Bearer " + access_token
            }
          })
          .then(response => {
            this.post_ids = response.data.post_ids;
            this.getPostsInfo();
          })
          .catch(error => {
            var status = error.response.data;
            if (status === 500) {
              this.$router.push("/login");
            } else {
              this.snackbar = true;
              this.snackbarText = "Something went wrong";
              this.snackbarColor = "red lighten-2";
            }
          });
      }
    }, // Get Posts end
    getPostsInfo() {
      this.loading = true;
      console.log("fired!")
      axios
        .post(
          this.backendUrl + "feed",
          {
            post_ids: this.post_ids
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          this.posts = response.data.posts;
        })
        .catch(error => {
          this.loading = false;
          if (error.response.status === 500) {
            this.somethingWentWrong();
          }
        })
        .then(this.loading = false);
    },
    updateFeed(msg, color) {
      this.getPosts();
      this.snackbar = true;
      this.snackbarText = msg;
      this.snackbarColor = color;
    },
    removePost(postId) {
      // Get item index
      var index = this.posts.findIndex(post => post.id == postId);
      this.posts.splice(index, 1);
      this.snackbar = true;
      this.snackbarText = "Post has been deleted!";
      this.snackbarColor = "success";
    },
    snackbarMessage(msg, color) {
      this.snackbar = true;
      this.snackbarText = msg;
      this.snackbarColor = color;
    },
    commentSuccess() {
      this.snackbar = true;
      this.snackbarText = "User has commented on post";
      this.snackbarColor = "success";
    }
  }
};
</script>
