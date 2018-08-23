<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <Currentuser/>
          </div>
          <div class="column is-6">
            <div class="mb4">
              <Create
                v-on:postCreated="updateFeed"
              />
            </div>
            <div v-if="posts">
              <div v-for="(post, index) in posts" :key="index">
                <Post
                  :post="post"
                  :index="index"
                  v-on:serverError="serverError"
                />
              </div>
            </div>
            <button class="mt3 button"
              @click="getPostIds"
            >Get Posts</button>
          </div>
          <div class="column is-3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Currentuser from "@/components/PostStuff/Currentuser";
import Create from "@/components/PostStuff/Create";
import Post from "@/components/PostStuff/Post";

export default {
  name: "home",
  components: {
    Currentuser,
    Create,
    Post
  },
  data() {
    return {
      posts: [],
      post_ids: []
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (localStorage.access_token == null) {
        this.$router.push("/login");
      }
    },
    getPostIds() {
      axios
        .get(this.backendUrl + "/feed", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            if (this.post_ids != undefined || this.post_ids.length != 0) {
              this.post_ids = response.data.post_ids;
              this.getPostsInfo();
            }
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.toast("Something went wrong during the process", "is-danger");
          }
        });
    },
    getPostsInfo() {
      axios
        .post(
          this.backendUrl + "/feed",
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
          if (response.status === 200) {
            this.posts = response.data.posts;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.toast("Something went wrong during the process", "is-danger");
          }
        });
    },
    toast(msg, type) {
      this.$toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    },
    updateFeed(newpost) {
      console.log("new POST!")
      this.toast("Post has successfully been created", "is-success");
      console.log(newpost);
      this.posts.unshift(newpost);
      console.log(newpost.id)
    },
    serverError() {
      this.toast("Something went wrong during the process", "is-danger");
    }
  }
};
</script>
