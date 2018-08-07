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
        <Post/>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
import Post from '@/components/Post.vue'

export default {
  name: 'Home',
  components: {
    Post
  }
}
</script>

