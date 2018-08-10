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
        <div id="posts" v-for="(post, index) in posts" :key="index">
          <!-- Testing and learning. -->
          <Post :post="post"/>
        </div>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import { mapState } from 'vuex'
import Post from '@/components/Post.vue'

export default {
  name: 'Home',
  components: {
    Post
  },
  computed: {
    ...mapState([
      'posts'
    ])
  }
}
</script>

