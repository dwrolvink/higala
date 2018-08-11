<template>
  <v-card class="mb-4 elevation-3">
    <v-card-title primary-title>
      <img class="mr-3" :src="post.userProfilePic" style="max-height: 40px;">
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
      <div 
      class="ml-1 mt-1" 
      :class="[postLiked? 'deep-purple--text ligten-2--text': 'grey--text']"
      >
      {{ post.likes }}
      </div>
      <v-btn 
        icon 
        flat 
        :color="[ postLiked? 'deep-purple lighten-2': 'grey']"
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
/* eslint-disable */
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'Post',
  props: ['post'],
  data() {
    return {
      postLiked: false,
    }
  },
  mounted() {
    this.prettyTime()
    this.userLikes()
  },
  methods: {
    toggleLike() {
      this.postLiked = !this.postLiked
      if(this.postLiked == true) {
        this.post.likes = this.post.likes + 1
      } else {
        this.post.likes = this.post.likes - 1
      }
    },
    prettyTime() {
      var createdDate = moment(this.post.created).format("MMM Do, h:MM A")
      this.post.created = createdDate
    },
    userLikes() {
      var likes = (this.post.likes).length
      this.post.likes = likes
    }
  }
};
</script>
