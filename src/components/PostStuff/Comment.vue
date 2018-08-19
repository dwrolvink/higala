<template>
  <v-card class="elevation-3" color="grey darken-1 pb-0">
    <v-card-title primary-title class="pb-0">
        <read-more
        more-str="Read more"
        less-str="Read less"
        class="pb-0 white--text"
        :text="comment.content"
        :max-chars="85"
        link="#"
      >
      </read-more>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions class="pt-0">
      <span class="font-weight-bold ml-1">{{ comment.commenter }}</span>
      <v-spacer></v-spacer>
      <div 
      class="ml-1 mt-1" 
      :class="commentLiked? 'lime--text accent-3--text': 'grey--text'"
      >
      {{ amountOfLikes }}
      </div>
      <v-btn 
        icon
        flat
        small
        :color="commentLiked? 'lime accent-3': 'grey lighten-1'"
        v-on="{click: commentLiked? unlikeComment: likeComment}"
      >
        <v-icon small>thumb_up</v-icon>
      </v-btn>
      <v-btn small icon flat color="grey lighten-1">
        <v-icon small>chat_bubble</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      {{ prettyDate }}
      <v-btn icon dark small>
        <v-icon small>more_vert</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "Comment",
  props: ["comment"],
  data() {
    return {
      comments: [],
      commentLiked: false,
      owner: false,
      prettyDate: null,
      amountOfLikes: 0
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  created() {
    this.prettyTime();
    this.checkIfLiked();
    this.likeAmount();
  },
  mounted() {
    this.checkOwner();
  },
  methods: {
    checkIfLiked() {
      if (this.comment.liked === true) {
        this.commentLiked = true;
      } else {
        this.commentLiked = false;
      }
    },
    prettyTime() {
      var createdDate = moment(this.comment.created).fromNow();
      this.prettyDate = createdDate;
    },
    likeAmount() {
      this.amountOfLikes = this.comment.likes.length;
    },
    checkOwner() {
      if (this.comment.commenter === localStorage.currentUsername) {
        this.owner = true;
      }
    },
    likeComment() {
      axios
        .post(this.backendUrl + "comment/" + this.comment.id + "/like", null, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.amountOfLikes = this.amountOfLikes + 1;
            this.commentLiked = true;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            alert("Something went wrong");
          }
        });
    },
    unlikeComment() {
      axios
        .delete(this.backendUrl + "comment/" + this.comment.id + "/like", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.commentLiked = false;
            this.amountOfLikes = this.amountOfLikes - 1;
          }
        });
    }
  }
};
</script>
