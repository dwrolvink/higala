<template>
  <v-card>
    <v-card-title class="title font-weight-light">
        {{ post.creator_name }}
        <v-spacer></v-spacer>
        <v-btn flat icon small color="deep-purple lighten-2">
            <v-icon>more_vert</v-icon>
        </v-btn>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
        post: {
            creator_name: 'Ajeet Kumar'
        }
    }
  }
}
</script>

