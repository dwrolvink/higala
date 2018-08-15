<template>
  <v-container grid-list-lg>
    <v-snackbar v-model="snackbar" top :color="snackbarColor">
    {{ snackbarText }}
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
              v-on:somethingWentWrong="somethingWentWrong"
            />
          </div>
          <infinite-loading @infinite="infiniteHandler">
            <span slot="no-more">There are no more posts to show.</span>
          </infinite-loading>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import axios from "axios";
import InfiniteLoading from "vue-infinite-loading";
import Post from "@/components/PostStuff/Post.vue";
import CurrentUser from "@/components/CurrentUser.vue";
import Create from "@/components/PostStuff/Create.vue";

export default {
  name: "Home",
  created() {
    this.getPosts();
  },
  data() {
    return {
      posts: [],
      backendUrl: "http://localhost:4000/",
      snackbar: false,
      snackbarColor: "",
      snackbarText: ""
    };
  },
  components: {
    InfiniteLoading,
    CurrentUser,
    Create,
    Post
  },
  methods: {
    getPosts() {
      if (localStorage.getItem("access_token") === null) {
        this.$router.push("/login");
      } else {
        var access_token = localStorage.access_token;
        axios
          .get(this.backendUrl + "posts", {
            headers: {
              Authorization: "Bearer " + access_token
            }
          })
          .then(response => {
            this.posts = response.data.posts;
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
    infiniteHandler($state) {
      let limit = this.posts.length + 15;
      axios
        .get(this.backendUrl + "posts", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          },
          params: {
            limit: limit
          }
        })
        .then(response => {
          this.loadMore($state, response);
        });
    },
    loadMore($state, response) {
      if (response.data.posts.length) {
        this.posts = response.data.posts;
        setTimeout(() => {
          $state.loaded();
        }, 3000);
        if (response.data.total === this.posts.length) {
          $state.complete();
        }
      } else {
        $state.complete();
      }
    },
    updateFeed() {
      this.getPosts();
      this.snackbar = true;
      this.snackbarText = "Post has successfully been created";
      this.snackbarColor = "success";
    },
    removePost(postId) {
      // Get item index
      var index = this.posts.findIndex(post => post.id === postId);
      this.posts.splice(index, 1);
      this.snackbar = true;
      this.snackbarText = "Post has been deleted!";
      this.snackbarColor = "success";
    },
    falseOwner() {
      this.snackbar = true;
      this.snackbarText = "You do not own this post!";
      this.snackbarColor = "red lighten-2";
    },
    somethingWentWrong() {
      this.snackbar = true;
      this.snackbarText = "Something went wrong during the process";
      this.snackbarColor = "red lighten-2";
    }
  }
};
</script>
