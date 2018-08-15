<template>
  <v-card class="mb-4 elevation-3">
    <v-card-title primary-title>
      <!-- Add profile pictures here later on -->
        <h3 class="title font-weight-light"> {{ post.creator_name }} </h3>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <v-btn 
            flat 
            icon 
            small 
            color="deep-purple lighten-2"
            slot="activator"
            @click="normalView = !normalView"
          >
            <v-icon>code</v-icon>
          </v-btn>
          <span>Code view</span>
        </v-tooltip>

        <v-menu
          bottom
          right
          lazy
          transition="slide-y-transition"
        >

          <v-btn 
            flat 
            icon 
            small 
            color="deep-purple lighten-2"
            slot="activator"
          >
            <v-icon>more_vert</v-icon>
          </v-btn>

          <div v-show="owner">
            <v-list>
              <v-list-tile @click="deletePost">
                <v-list-tile-title>Delete post</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </div>
        </v-menu>
        <br/>
    </v-card-title>
    <v-card-text>
      <div v-if="normalView">
        <read-more
          more-str="Read more"
          less-str="Read less"
          class="subheading"
          :text="post.content"
          :max-chars="477"
          link="#"
        >
        </read-more>
      </div>
      <div v-else>
        <vue-simple-markdown :source="post.content"></vue-simple-markdown>
      </div>

    </v-card-text>
    <v-card-actions>
      <div 
      class="ml-1 mt-1" 
      :class="[postLiked? 'deep-purple--text ligten-2--text': 'grey--text']"
      >
      {{ amountOfLikes }}
      </div>
      <v-btn 
        icon 
        flat 
        :color="postLiked? 'deep-purple lighten-2': 'grey'"
        @click="toggleLike"
      >
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-btn icon flat color="grey">
        <v-icon>forum</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <h3 class="subheading font-weight-light"> {{ prettyDate }} </h3>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Post",
  props: ["post", "userLikes"],
  data() {
    return {
      backendUrl: "http://localhost:4000/",
      normalView: true,
      postLiked: false,
      postTruncateLimit: 477,
      owner: false,
      prettyDate: null,
      amountOfLikes: 0
    };
  },
  created() {
    this.prettyTime();
    this.likeAmount();
  },
  mounted() {
    this.checkOwner();
  },
  methods: {
    toggleLike() {
      this.postLiked = !this.postLiked;
      if (this.postLiked === true) {
        this.amountOfLikes = this.amountOfLikes + 1;
      } else {
        this.amountOfLikes = this.amountOfLikes - 1;
      }
    },
    // likePost() {
    //   axios
    //     .post(this.backendUrl + "post/" + this.post.id + "/like", null, {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.access_token
    //       }
    //     })
    //     .then(response => {
    //       if (response.status === 201) {
    //         amountOfLikes = amountOfLikes++;
    //         this.postLiked = true;
    //       }
    //     })
    //     .catch(error => {
    //       if (error.response.status === 500) {
    //         this.$emit("somethingWentWrong");
    //       }
    //     });
    // },
    // unlikePost() {
    //   axios
    //     .delete(this.backendUrl + "post/" + this.post.id + "/like", {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.access_token
    //       }
    //     })
    //     .then(response => {
    //       if (response.status === 200) {
    //         this.postLiked = false;
    //         amountOfLikes = amountOfLikes - 1;
    //       }
    //     });
    // },
    deletePost() {
      axios
        .delete(this.backendUrl + "post/" + this.post.id, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.$emit("postDeleted", this.post.id);
          }
        })
        .catch(error => {
          var status = error.response.status;
          if (status === 403) {
            this.$emit("notPostOwner");
          }
        });
    },
    prettyTime() {
      var createdDate = moment(this.post.created).format("MMM Do, h:MM A");
      this.prettyDate = createdDate;
    },
    likeAmount() {
      this.amountOfLikes = this.post.likes.length;
    },
    checkOwner() {
      if (this.post.creator_name === localStorage.currentUsername) {
        this.owner = true;
      }
    }
  }
};
</script>
