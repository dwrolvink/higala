<template>
  <article class="media mb3">
    <figure class="media-left">
      <p class="image is-32x32">
        <img src="@/assets/Avatars/Comment.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.commenter }}</strong>
          <small class="ml2">{{ created }}</small>
          <br>
          <span class="f6 has-text-grey">
            <div v-if="normalView">
              <truncate clamp="..." :length="90" less="Show less" :text="comment.content"></truncate>
            </div>

            <div v-else>
              <vue-simple-markdown :source="comment.content"></vue-simple-markdown>
            </div>
          </span>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <button
              :class="['button', 'is-small', liked? 'is-dark': '']"
              v-on="{click: liked? unlikeComment: likeComment}"
            >
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span>{{ amountOfLikes }}</span>
            </button>
          </a>
          
          <a class="level-item">
            <button
              class="button is-small is-info"
              @click="isReplyModalActive = true"
              :disabled="postLock"
            >
              <b-icon icon="reply-all" size="is-small"></b-icon>
              <span>{{ amountOfReplies }}</span>
            </button>
          </a>
          <a class="level-item">
            <button class="button is-small" @click="toggleView">
              <b-icon icon="markdown"></b-icon>
            </button>
          </a>
        </div>
        <div class="level-right">
          <a class="level-item" v-show="owner">
            <b-dropdown>
              <button class="button is-small is-rounded" slot="trigger">
                <b-icon icon="chevron-down"></b-icon>
              </button>

              <b-dropdown-item @click="deletePrompt">Delete Comment</b-dropdown-item>
            </b-dropdown>
          </a>
        </div>
      </nav>

      <div v-if="comment.replies">
        <div v-for="(reply, index) in reply_info" :key="reply.id">
          <Reply :reply="reply" :index="index"/>
        </div>
      </div>
    </div>

    <!-- REPLY MODAL -->
    <b-modal
      :active.sync="isReplyModalActive"
      :width="640"
      scroll="keep"
      :onCancel="resetReplyModal"
    >
      <div class="card">
        <div class="card-header">
          <div class="card-header-title">Replying to {{ comment.commenter }}'s comment.</div>
        </div>

        <div class="card-content">
          <div class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="@/assets/Avatars/Comment.png">
              </p>
            </figure>

            <div class="media-content">
              <strong>{{ comment.commenter }}</strong>
              <small class="ml2">{{ created }}</small>
              <br>
              <div v-if="normalView">
                <truncate clamp="..." :length="90" less="Show less" :text="comment.content"></truncate>
              </div>

              <div v-else>
                <vue-simple-markdown :source="comment.content"></vue-simple-markdown>
              </div>
            </div>
          </div>

          <div class="mt2">
            <b-field>
              <b-input
                name="reply field"
                type="textarea"
                rows="1"
                ref="replyField"
                v-model="replyContent"
                v-validate="'max:1000'"
                maxlength="1000"
                placeholder="Reply..."
              ></b-input>
            </b-field>
          </div>

          <div class="level is-mobile">
            <div class="level-left">
              <button :class="['button', liked ? 'is-dark' : '']" @click="likeComment">
                <b-icon icon="thumb-up"></b-icon>
                <span class="ml2" v-text="amountOfLikes"></span>
              </button>
              <button class="button is-info ml2" disabled>
                <b-icon icon="reply-all"></b-icon>
                <span class="ml2" v-text="amountOfReplies"></span>
              </button>
              <button class="button ml2" @click="toggleView">
                <b-icon icon="markdown"></b-icon>
              </button>
            </div>
            <div class="level-right">
              <div class="card-footer-item">
                <button class="button is-info" @click="validateReply">
                  <span class="mr2">Send</span>
                  <b-icon icon="send" size="is-small"></b-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
    <!-- End Reply Modal -->
  </article>
</template>

<script>
import truncate from "vue-truncate-collapsed";
import moment from "moment";
import { mapState } from "vuex";
import axios from "axios";
import Reply from "@/components/PostStuff/CommentReply/Reply";

export default {
  name: "Comment",
  props: ["comment", "index", "postLock"],
  components: {
    truncate,
    Reply
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  data() {
    return {
      amountOfLikes: 0,
      amountOfReplies: 0,
      liked: false,
      created: "",
      normalView: true,
      owner: false,
      reply_info: [],
      replyContent: "",
      isReplyModalActive: false,
      replyView: true
    };
  },
  created() {
    this.prettifyDate();
    this.checkLikesAndRepliesAmount();
    this.checkOwner();
    this.getLatestReply();
  },
  methods: {
    likeComment() {
      axios
        .post(this.backendUrl + "/comment/" + this.comment.id + "/like", null, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.liked = true;
            this.amountOfLikes = this.amountOfLikes + 1;
          }
        });
    },
    unlikeComment() {
      axios
        .delete(this.backendUrl + "/comment/" + this.comment.id + "/like", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.liked = false;
            this.amountOfLikes = this.amountOfLikes - 1;
          }
        });
    },
    replyOnComment() {
      axios
        .post(
          this.backendUrl + "/comment/" + this.comment.id + "/replies",
          {
            content: this.replyContent
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          }
        )
        .then(response => {
          console.log("Status " + response.status, "Data " + response.data);
          if (response.status === 200) {
            // Add the comment
            let new_reply = response.data.newest_reply;
            this.amountOfReplies = this.amountOfReplies + 1;
            this.reply_info.push(new_reply);
          }
        })
        .catch(error => {
          if (error.response.status === 403) {
            this.$emit("toastMsg", "Post is locked!", "is-danger");
          } else {
            this.$emit(
              "toastMsg",
              "Something went wrong during the process!",
              "is-danger"
            );
          }
        });
    },
    validateReply() {
      if (this.replyContent !== "") {
        this.replyOnComment();
        this.replyContent = "";
      } else {
        this.$refs.replyField.focus();
      }
    },
    getLatestReply() {
      if (this.comment.latest_replies) {
        this.reply_info = this.comment.latest_replies;
      }
    },
    prettifyDate() {
      let created = moment(this.comment.created).fromNow();
      this.created = created;
    },
    checkLikesAndRepliesAmount() {
      if (this.comment.liked === true) {
        this.liked = true;
      }
      this.amountOfLikes = this.comment.likes.length;
      this.amountOfReplies = this.comment.replies.length;
    },
    toggleView() {
      this.normalView = !this.normalView;
    },
    toggleViewReply() {
      this.replyView = !this.replyView;
    },
    checkOwner() {
      let currentUser = JSON.parse(localStorage.getItem("currentuser"));
      if (this.comment.commenter === currentUser.username) {
        this.owner = true;
      }
    },
    deleteComment() {
      this.$emit("deleteComment", this.comment.id, this.index);
    },
    deletePrompt() {
      this.$dialog.confirm({
        title: "Delete comment?",
        message: "Are you sure you want to delete this comment?",
        confirmText: "Delete",
        cancelText: "Cancel",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => this.deleteComment()
      });
    },
    resetReplyModal() {
      this.replyContent = this.comment.content;
    }
  }
};
</script>
