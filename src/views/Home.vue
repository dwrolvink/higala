<template>
  <v-container grid-list-lg>
    <div v-if="loading" align="center">
      <v-progress-circular
      :size="50"
      color="deep-purple lighten-1"
      indeterminate
      >
    </v-progress-circular>
    </div>
    <v-layout row wrap>
      <v-flex v-if="posts" xs3>
        <CurrentUser/>
      </v-flex>

      <v-flex xs6>
        <div v-if="errors" v-for="(error, index) in errors" :key="index">
          <v-alert :value="true" type="warning">{{ error }}</v-alert>
        </div>
        <div v-if="posts">
          <Create/>
          <div v-for="(post, index) in posts" :key="index">
            <Post :post="post"/>
          </div>
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
      loading: false
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
      "access_token"
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
        axios.get('http://127.0.0.1:5000/posts', {
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
            this.errors = error
            this.loading = false
          } else if (status === 429) {
            alert("Get a life.");
          }
        });
      }
    }
  }
};
</script>
