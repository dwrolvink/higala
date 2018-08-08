<template>
  <v-card class="mb-4 elevation-3">
    <v-card-title primary-title>
      <img class="mr-3" :src="post.usr_image" style="max-height: 40px;">
        <h3 class="title font-weight-light"> {{ post.creator_name }} </h3>
        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <v-btn 
            flat 
            icon 
            small 
            color="deep-purple lighten-2"
            slot="activator"
          >
              <v-icon>more_vert</v-icon>
          </v-btn>
          <span>More options</span>
        </v-tooltip>
        <br/>
    </v-card-title>
    <v-card-title>
      <p class="subheading">{{ post.content }}</p>
    </v-card-title>
    <v-card-actions>
      <div class="ml-1 mt-1" :class="[postLiked? 'blue--text': 'grey--text']">{{ post.likes }}</div>
      <v-btn 
        icon 
        flat 
        :color="[ postLiked? 'blue': 'grey']"
        @click="toggleLike"
      >
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn icon flat color="grey">
        <v-icon>forum</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <h3 class="subheading font-weight-light"> {{ post.created }} </h3>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Post',
  data() {
    return {
        postLiked: false,
        post: {
            creator_name: 'Zeth Leonardo',
            username: 'X1Zeth2X',
            usr_image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Antu_distributor-logo-gentoo.svg/1024px-Antu_distributor-logo-gentoo.svg.png',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in sem quis dolor vulputate sollicitudin. Pellentesque eu felis nunc. Aenean bibendum risus tempor, posuere risus porttitor, facilisis metus. Proin blandit, turpis eget suscipit facilisis, mi lorem laoreet lorem, et placerat nibh velit ut tortor.',
            created: 'Aug 4th, 9:32 PM',
            likes: 302,
        }
    }
  },
  methods: {
    toggleLike() {
      this.postLiked = !this.postLiked
      if(this.postLiked == true) {
        this.post.likes = this.post.likes + 1
      } else {
        this.post.likes = this.post.likes - 1
      }
    }
  }
}
</script>

