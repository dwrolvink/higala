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
          <strong>{{ comment.commenter }}</strong> <small class="ml2">{{ created }}</small>
          <br>
          <span class="f6 has-text-grey">

            <div v-if="normalView">
              <truncate 
                clamp="..." 
                :length="90" 
                less="Show less"
                :text="comment.content"
              ></truncate>
            </div>

            <div v-else>
              <vue-simple-markdown 
                :source="comment.content"
              >
              </vue-simple-markdown>
            </div>

          </span>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <button :class="['button', 'is-small', liked? 'is-dark': '']" 
              v-on="{click: liked? unlikeComment: likeComment}"
            >
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span>{{ amountOfLikes }}</span>
            </button>
          </a>

          <a class="level-item">
            <button class="button is-small is-info">
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

      <!-- <article class="media">
        <div class="media-left">
          <figure class="media-left">
            <p class="image is-24x24">
              <img src="@/assets/Avatars/Reply.png">
            </p>
          </figure>
        </div>
        <div class="media-content">
          <div class="content f6 has-text-grey">
            <p>
              <strong>{{ comment.commenter }}</strong> <small class="ml2">{{ created }}</small>
              <br>
              <span class="f6 has-text-grey">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet, fugiat?
              </span>
            </p>
          </div>

          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <button :class="['button', 'is-small', liked? 'is-dark': '']">
                  <b-icon icon="thumb-up" size="is-small"></b-icon>
                  <span>{{ amountOfLikes }}</span>
                </button>
              </a>

              <a class="level-item">
                <button class="button is-small is-info" disabled>
                  <b-icon icon="reply" size="is-small"></b-icon>
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
        </div>

      </article> -->

    </div>
  </article>
</template>

<script>
import truncate from "vue-truncate-collapsed";
import moment from "moment";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Comment",
  props: ["comment", "index"],
  components: {
    truncate
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
      owner: false
    };
  },
  created() {
    this.prettifyDate();
    this.checkLikesAndRepliesAmount();
    this.checkOwner();
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
    prettifyDate() {
      var created = moment(this.comment.created).fromNow();
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
    checkOwner() {
      var currentUser = JSON.parse(localStorage.getItem("currentuser"));
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
    }
  }
};
</script>
