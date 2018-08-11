<template>
  <v-container grid-list-lg>
    <v-layout row wrap>
      <v-flex xs3>
        <v-card>
          <v-card-title class="title font-weight-light">
            Placeholder
          </v-card-title>
        </v-card>
      </v-flex>

      <v-flex xs6>
        <div v-if="loading" align="center">
          <v-progress-circular
          :size="50"
          color="deep-purple lighten-1"
          indeterminate
          >
        </v-progress-circular>
        </div>
        <div v-else>
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
    Create,
    Post
  },
  created() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      this.error = this.posts = null
      this.loading = true
      axios.get('http://127.0.0.1:5000/posts')
      .then(response => {
        this.posts = response.data
        this.loading = false
        })
      .catch(e => {
        this.errors.push(e);
      });
    }
  }
};
</script>
