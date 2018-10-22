<template>
  <b-modal :active.sync="isReplyModalActive" :width="640" scroll="keep">

      <div class="card">

        <div class="card-header">
          <div class="card-header-title">
            Replying to {{ comment.commenter }}'s comment.
          </div>
        </div>

        <div class="card-content">

          <div class="media">
            <figure class="media-left">
              <p class="image is-48x48">
                <img src="@/assets/Avatars/Comment.png">
              </p>
            </figure>

            <div class="media-content">
                <strong>{{ comment.commenter }}</strong> <small class="ml2">{{ created }}</small>
                <br>
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
            </div>
          </div>

          <div class="mt2">
            <b-field>
              <b-input 
                type="textarea"
                rows="1"
                placeholder="Reply..."></b-input>
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
                <button class="button is-info">
                  <span class="mr2">Send</span>
                  <b-icon icon="send" size="is-small"></b-icon>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
  </b-modal>
</template>

<script>
import moment from "moment";
import axios from "axios";
import truncate from "vue-truncate-collapsed";

export default {
  name: "ReplyModal",
  props: [
    "isReplyModalActive",
    "comment", 
    "amountOfLikes",
    "amountOfReplies",
    "liked"
  ],
  components: {
    truncate
  },
  data() {
    return {
      created: "",
      normalView: true
    }
  },
  methods: {
    prettifyDate() {
      let created = moment(this.comment.created).fromNow();
      this.created = created;
    },
    toggleView() {
      this.normalView = !this.normalView;
    },
    likeComment() {
      this.$emit("likeComment")
    }
  },
}
</script>
