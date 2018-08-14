<template>
  <v-card class="mb-4 elevation-3">
    <v-card-title primary-title>
      <!-- Add profile pictures here later on -->
        <h3 class="title font-weight-light"> {{ post.creator_name }} </h3>
        <v-spacer></v-spacer>
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
        v-on="{click: postLiked? unlikePost: likePost}"
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
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      postLiked: null,
      owner: false
    };
  },
  created() {
    this.checkLike();
    this.prettyTime();
    this.userLikes();
  },
  mounted() {
    this.checkOwner();
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  methods: {
    likePost() {
      axios
        .post(this.backendUrl + "post/" + this.post.id + "/like", null, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.post.likes = this.post.likes + 1;
            this.postLiked = true;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.$emit("somethingWentWrong");
          }
        });
    },
    unlikePost() {
      axios
        .delete(this.backendUrl + "post/" + this.post.id + "/like", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.postLiked = false;
            this.post.likes = this.post.likes - 1;
          }
        });
    },
    checkLike() {
      axios
        .get(this.backendUrl + "post/" + this.post.id + "/like", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.postLiked = true;
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.postLiked = false;
          }
        });
    },
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
      this.post.created = createdDate;
    },
    userLikes() {
      var likes = this.post.likes.length;
      this.post.likes = likes;
    },
    checkOwner() {
      if (this.post.creator_name === localStorage.currentUsername) {
        this.owner = true;
      }
    }
  }
};
</script>
