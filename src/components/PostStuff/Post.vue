<template>
  <div id="post">
    <v-card class="elevation-3 mb-3">
      <v-card-title primary-title>
        <!-- Add profile pictures here later on -->
          <h3 class="title font-weight-light"> {{ post.creator_name }} </h3>
          <v-spacer></v-spacer>

          <v-tooltip bottom>
            <v-btn 
              flat 
              icon 
              small 
              color="lime accent-3"
              slot="activator"
              @click="normalView = !normalView"
            >
              <v-icon>code</v-icon>
            </v-btn>
            <span>Code view</span>
          </v-tooltip>

          <v-menu
            bottom
            v-show="owner"
            right
            lazy
            transition="slide-y-transition"
          >

            <v-btn 
              flat 
              icon 
              small 
              color="lime accent-3"
              slot="activator"
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile @click="deletePost">
                <v-list-tile-title>Delete post</v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-list>
              <v-list-tile @click="editPost">
                <v-list-tile-title>Edit post</v-list-tile-title>
              </v-list-tile>
            </v-list>
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
          <vue-simple-markdown :source="post.content" class="white--text"></vue-simple-markdown>
        </div>

      </v-card-text>
      <v-card-actions>
        <div 
        class="ml-1 mt-1" 
        :class="postLiked? 'orange--text accent-2--text': 'grey--text'"
        >
        {{ amountOfLikes }}
        </div>
        <v-btn
          icon 
          flat 
          :color="postLiked? 'orange accent-2': 'grey'"
          v-on="{click: postLiked? unlikePost: likePost}"
        >
          <v-icon>thumb_up</v-icon>
        </v-btn>
        <div 
        class="ml-1 mt-1 grey--text"
        >
        {{ amountOfComments }}
        </div>
        <v-btn 
          icon
          flat
          color="grey"
          slot="activator"
          @click.stop="dialog = true"
        >
          <v-icon>forum</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <h3 class="subheading font-weight-light"> {{ prettyDate }} </h3>
      </v-card-actions>
      <v-divider></v-divider>
      <div v-if="post.comments">
        <v-card-text v-for="(comment, index) in comments" :key="index">
          <Comment :comment="comment"/>
        </v-card-text>
      </div>
    </v-card>

      <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-container>
          <v-card class="elevation-3" style="background-color: #4d4d4d;">
            <v-card-title primary-title class="title">
              <span class="font-weight-light">{{ post.creator_name }}</span>
              <v-spacer></v-spacer>
                <v-icon small color="lime accent-3">code</v-icon>
                <v-icon small color="lime accent-3">more_vert</v-icon>
            </v-card-title>
            <v-card-text>
              <read-more
                more-str=""
                less-str=""
                class="subheading"
                :text="post.content"
                :max-chars="70"
                link="#"
              >
              </read-more>
            </v-card-text>
          </v-card>
        </v-container>

        <v-divider></v-divider>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-form ref="commentForm" v-model="valid" lazy-validation>
                <v-textarea 
                  label="Comment" 
                  auto-grow
                  row-height="5"
                  required
                  box
                  v-model="commentContent"
                  :rules="[v => !!v || 'Required!']"
                ></v-textarea>
              </v-form>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="white darken-1" flat @click="closeComment">Close</v-btn>
          <v-btn color="orange accent-2" flat :disabled="!valid" @click="sendComment">
            Comment
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Comment from "@/components/PostStuff/Comment";
import { mapState } from "vuex";

export default {
  name: "Post",
  props: ["post"],
  data() {
    return {
      normalView: true,
      comments: [],
      postLiked: false,
      postTruncateLimit: 477,
      owner: false,
      prettyDate: null,
      amountOfLikes: 0,
      amountOfComments: 0,
      dialog: false,
      valid: true,
      commentContent: ""
    };
  },
  components: {
    Comment
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  created() {
    this.prettyTime();
    this.checkIfLiked();
    this.likeAmount();
    this.commentAmount();
    this.getCommentsInfo();
  },
  mounted() {
    this.checkOwner();
  },
  methods: {
    checkIfLiked() {
      if (this.post.liked === true) {
        this.postLiked = true;
      } else {
        this.postLiked = false;
      }
    },
    likePost() {
      axios
        .post(this.backendUrl + "post/" + this.post.id + "/like", null, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.amountOfLikes = this.amountOfLikes + 1;
            this.postLiked = true;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.$emit("snackbarMessage",
                       "Something went wrong during the process", // MSG
                       "red lighten-2"); // COLOR
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
            this.amountOfLikes = this.amountOfLikes - 1;
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
            this.$emit("snackbarMessage",
                       "You do not own this post",
                       "red lighten-2");
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
   commentAmount() {
      this.amountOfComments = this.post.comments.length;
    },
    checkOwner() {
      let currentUser= JSON.parse(localStorage.getItem("currentUser"));
      if (this.post.creator_name === localStorage.currentUsername || currentUser.role[0] === 1) {
        this.owner = true;
      }
    },
    getCommentsInfo() {
      let comments = this.post.comments.slice(0, 3)
      if (this.post.comments.length != 0) {
        axios
          .post(
            this.backendUrl + "postcomments",
            {
              comment_ids: comments
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.access_token
              }
            }
          )
          .then(response => {
            this.comments = response.data.comments;
          })
          .catch(error => {
            if (error.response.status === 500) {
              this.$emit("snackbarMessage", 
                         "Something went wrong during the process",  // MSG
                         "red lighten-2"); // COLOR
            }
          });
      }
    },
    closeComment() {
      this.$refs.commentForm.reset()
      this.dialog = false
    },
    sendComment() {
      if (this.$refs.commentForm.validate()) {
        axios
          .post(
            this.backendUrl + "post/" + this.post.id,
            {
              content: this.commentContent,
            },
            {
              headers: { Authorization: "Bearer " + localStorage.access_token }
            })
          .then(response => {
            if (response.status === 200) {
              this.$refs.commentForm.reset();
              this.dialog = false;
              this.getCommentsInfo();
              this.$emit("snackbarMessage", 
                         "Successfully commented on the post",
                         "success");
            }
          })
          .catch(error => {
            if (error.response.status === 500) {
              this.$emit("snackbarMessage",
                         "Something went wrong during the process", // MSG
                         "red lighten-2"); // COLOR
            }
          });
      }
    }
  }
};
</script>
