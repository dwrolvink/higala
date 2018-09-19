<template>
  <article class="card mb3">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="@/assets/Avatars/Penguin_64x64.png"/>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4 has-text-dark has-text-weight-light">{{ post.creator_name }}</p>
          <p class="subtitle is-6 has-text-grey">{{ creationDate }}</p>
        </div>
        <div class="media-right">
          <b-tooltip 
            label="Markdown view" 
            position="is-bottom"
            animated
            square
          >
            <button class="button is-small mr1" 
              @click="toggleView"
            >
              <b-icon
                icon="markdown"
              >
              </b-icon>
            </button>
          </b-tooltip>
         
          <b-dropdown v-if="owner || admin">
              <button class="button is-small ml1" slot="trigger">
                <b-icon icon="dots-vertical"></b-icon>
              </button>

              <b-dropdown-item @click="deletePrompt">Delete</b-dropdown-item>
              <b-dropdown-item 
                @click="editModalActive = true"
                :disabled="locked"
                v-show="owner"
              >Edit</b-dropdown-item>
              <div v-if="locked">
                <b-dropdown-item :disabled="!admin" @click="unlockPost">Unlock</b-dropdown-item>
              </div>
              <div v-else>
                <b-dropdown-item @click="lockPost">Lock</b-dropdown-item>
              </div>
          </b-dropdown>
        </div>
      </div>

      <div class="content">
        <div v-if="normalView">
          <truncate clamp="..." 
            :length="477" 
            less="Show less"
            :text="post.content"
          ></truncate>
        </div>
        <div v-else>
          <vue-simple-markdown 
            :source="post.content">
          </vue-simple-markdown>
        </div>
      </div>
    </div>

      <div v-if="post.image_file">
        <div class="card-image" @click="isImageModalActive = true">
          <figure class="image">
            <img :src="imageSrc" alt="Placeholder image">
          </figure>
        </div>
      </div>

      <div class="mt3 pr3 pl3 pb3">
        <div class="level is-mobile">
          <div class="level-left">
            <button :class="['button', kekGiven? 'is-dark' : '']" 
              v-on="{click: kekGiven? unlikePost : likePost}"
            >
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span class="ml1">{{ keks }}</span>
            </button>

            <button class="ml2 button is-info" 
              :disabled="locked"
              @click="commentModalActive = true"
            >
              <b-icon
                icon="forum"
                size="is-small"
              >
              </b-icon>
              <span class="ml1">{{ comments }}</span>
            </button>
          </div>
          <div class="level-right">
            <b-tag 
              type="is-danger"
              v-show="locked"
              size="is-medium"
              class="mr2"
            >Post is locked!</b-tag>
            <b-tag 
              type="is-primary"
              v-show="post.edited === true"
              size="is-medium"
            >Edited</b-tag>
          </div>
        </div>
      </div> 

      <div v-if="post.comments" class="pr4 pl4 pb3 mb3">
        <div v-for="(comment, index) in comments_info" :key="comment.id">
          <Comment 
            :comment="comment" 
            :index="index"
          />
        </div>
      </div>
      <!-- Main component end -->

      <!-- MODALS -->
      <!-- Image Modal -->
      <b-modal v-if="post.image_file" :active.sync="isImageModalActive">
          <p class="image">
              <img :src="imageSrc">
          </p>
      </b-modal> <!-- Image Modal end-->

      <!-- Edit Modal -->
      <b-modal 
        :active.sync="editModalActive" 
        :width="640" 
        scroll="keep" 
        :onCancel="resetEdit"
        :canCancel="['x']"
      >
        <article class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://api.adorable.io/avatars/64/abott@adorable.png"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4 has-text-dark has-text-weight-light">{{ post.creator_name }}</p>
                <p class="subtitle is-6 has-text-grey">{{ creationDate }}</p>
              </div>
              <div class="media-right">
                <button class="button is-small mr1">
                  <b-icon icon="markdown"></b-icon>
                </button>
                <button class="button is-small ml1">
                  <b-icon icon="dots-vertical"></b-icon>
                </button>
              </div>
            </div>

            <div class="content">
              <truncate clamp="..." 
                :length="477" 
                less="Show less"
                :text="editPost"
              ></truncate>
            </div>

            <b-field label="Edit post"
              :type="errors.has('editpost') ? 'is-danger' : ''"
              :message="errors.has('editpost') ? errors.first('editpost') : ''"
            >
              <b-input 
                name="post"
                type="textarea" 
                maxlength="1500" 
                rows="1"
                v-model="editPost"
                v-validate="'max:1500'"
              ></b-input>
            </b-field>
          </div>
        </article>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="updatePost">Update</button>
        </footer>
      </b-modal> <!-- Edit Modal end -->

      <!-- Commenting modal -->
      <b-modal 
        :active.sync="commentModalActive" 
        :width="640" 
        scroll="keep" 
        :onCancel="resetEdit"
        :canCancel="['x']"
      >
        <article class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://api.adorable.io/avatars/64/abott@adorable.png"/>
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4 has-text-dark has-text-weight-light">{{ post.creator_name }}</p>
                <p class="subtitle is-6 has-text-grey">{{ creationDate }}</p>
              </div>
              <div class="media-right">
                <button class="button is-small mr1">
                  <b-icon icon="markdown"></b-icon>
                </button>
                <button class="button is-small ml1">
                  <b-icon icon="dots-vertical"></b-icon>
                </button>
              </div>
            </div>

            <div class="content">
              <truncate clamp="..." 
                :length="477" 
                less="Show less"
                :text="editPost"
              ></truncate>
            </div>

            <b-field label="Comment on post"
              :type="errors.has('editpost') ? 'is-danger' : ''"
              :message="errors.has('editpost') ? errors.first('editpost') : ''"
            >
              <b-input 
                name="post"
                type="textarea" 
                maxlength="1500" 
                rows="1"
                v-model="commentContent"
                v-validate="'max:1500'"
              ></b-input>
            </b-field>
          </div>
        </article>
        <footer class="modal-card-foot">
          <button class="button is-primary" @click="validateComment">Comment</button>
        </footer>
      </b-modal> 
  </article>
</template>

<script>
import moment from "moment";
import truncate from "vue-truncate-collapsed";
import axios from "axios";
import { mapState } from "vuex";
import Comment from "@/components/PostStuff/CommentReply/Comment";

export default {
  name: "Post",
  props: ["post", "index"],
  computed: {
    ...mapState(["backendUrl"])
  },
  data() {
    return {
      kekGiven: false,
      keks: 0,
      comments: 0,
      isImageModalActive: false,
      creationDate: "",
      imageSrc: "",
      owner: false,
      admin: false,
      normalView: true,
      editModalActive: false,
      commentModalActive: false,
      editPost: this.post.content,
      edited: false,
      locked: false,
      comments_info: [],
      commentContent: ""
    };
  },
  components: {
    truncate,
    Comment
  },
  created() {
    this.amountOfKeks();
    this.amountOfComments();
    this.getImageUrl();
    this.checkEdit();
    this.prettifyDate();
    this.checkOwner();
    this.checkStatus();
  },
  methods: {
    checkOwner() {
      // Get current user
      var currentuser = JSON.parse(localStorage.getItem("currentuser"));
      if (this.post.creator_name === currentuser.username) {
        this.owner = true;
      } else if (currentuser.roles[0] === 1) {
        // This is a client side validation,
        // There's a server side validation too.
        this.admin = true;
      }
    },
    likePost() {
      axios
        .post(this.backendUrl + "/post/" + this.post.id + "/like", null, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.kekGiven = true;
            this.keks = this.keks + 1;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.$emit(
              "toastMsg",
              "Something went wrong during the process",
              "is-danger"
            );
          }
        });
    },
    unlikePost() {
      axios
        .delete(this.backendUrl + "/post/" + this.post.id + "/like", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.kekGiven = false;
            this.keks = this.keks - 1;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.$emit(
              "toastMsg",
              "Something went wrong during the process",
              "is-danger"
            );
          }
        });
    },
    deletePrompt() {
      this.$dialog.confirm({
        title: "Deleting Post",
        message: "Are you sure you want to delete this post?",
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deletePost()
      });
    },
    resetEdit() {
      this.editPost = this.post.content;
      this.edited = true;
      this.editModalActive = false;
    },
    updatePost() {
      axios
        .put(
          this.backendUrl + "/post/" + this.post.id,
          {
            content: this.editPost
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            this.editModalActive = false;
            this.post.content = this.editPost;
            this.$emit(
              "toastMsg",
              "Post has successfully been updated",
              "is-success"
            );
          }
        })
        .catch(error => {
          if (error.response.data.reason === "locked") {
            this.$emit("toastMsg", "This post is locked!", "is-danger");
          } else if (error.response.data.reason === "permission") {
            this.$emit("toastMsg", "You do not own this post!", "is-danger");
          }
        });
    },
    lockPost() {
      axios
        .put(
          this.backendUrl + "/post/" + this.post.id + "/lock",
          {
            method: "lock"
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            this.locked = true;
            this.$emit("toastMsg", "Post has been locked!", "is-warning");
          }
        })
        .catch(error => {
          if (error.response.data.reason === "locked") {
            this.$emit("toastMsg", "Post has already been locked.", "is-info");
          } else if (error.response.data.reason === "owner") {
            this.$emit("toastMsg", "You do not have permissions.", "is-danger");
          } else {
            this.$emit(
              "toastMsg",
              "OwO, pwease wait, that was off..",
              "is-danger"
            );
          }
        });
    },
    unlockPost() {
      axios
        .put(
          this.backendUrl + "/post/" + this.post.id + "/lock",
          {
            method: "unlock"
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            this.locked = false;
            this.$emit("toastMsg", "Post has been unlocked!", "is-success");
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.$emit(
              "toastMsg",
              "Something went wrong during the proccess",
              "is-danger"
            );
          }
        });
    },
    getInitialComments() {
      this.comments_info = this.post.initial_comments;
    },
    getMoreComments() {
      axios
        .post(
          this.backendUrl + "/postcomments",
          {
            comment_ids: this.post.comments.slice(5)
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          if (response.status === 200) {
            this.comments_info.push(response.data.comments);
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.$emit(
              "toastMsg",
              "Something went wrong during the process",
              "is-danger"
            );
          }
        });
    },
    commentOnPost() {
      axios
        .post(
          this.backendUrl + "/post/" + this.post.id + "/comments",
          {
            content: this.commentContent
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          if (response.data.success === true) {
            // Add the comment
            let new_comment = response.data.new_comment;
            this.amountOfComments = this.amountOfComments + 1;
            this.comments_info.push(new_comment);
          }
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.$emit("toastMsg", "Post is locked!", "is-danger");
          }
        });
    },
    getImageUrl() {
      if (this.post.image_url) {
        this.imageSrc = this.backendUrl + "/" + this.post.image_url;
      }
    },
    // Short functions
    validateComment() {
      if (this.commentContent !== "") {
        this.commentOnPost();
        this.commentContent = "";
        this.commentModalActive = false;
      }
    },
    amountOfComments() {
      this.comments = this.post.comments.length;
      if (this.post.comments.length > 0) {
        this.getInitialComments();
      }
    },
    deletePost() {
      this.$emit("deletePost", this.post.id, this.index);
    },
    toggleView() {
      this.normalView = !this.normalView;
    },
    checkEdit() {
      if (this.post.edited === true) {
        this.edited = true;
      }
    },
    checkStatus() {
      if (this.post.status.toLowerCase() === "locked") {
        this.locked = true;
      }
    },
    amountOfKeks() {
      // Check if the user liked the post
      if (this.post.liked === true) {
        this.kekGiven = true;
      }
      this.keks = this.post.likes.length;
    },
    prettifyDate() {
      var prettyDate = moment(this.post.created).format("MMM Do, h:MM A");
      this.creationDate = prettyDate;
    }
  }
};
</script>
