<template>
  <article class="media mb3">
    <figure class="media-left">
      <p class="image is-32x32">
        <img src="https://api.adorable.io/avatars/40/commenter.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.commenter }}</strong> <small class="ml2">{{ created }}</small>
          <br>
          <span class="f6 has-text-grey">
            <div v-if="normalView">
              <truncate clamp="..." 
                :length="90" 
                less="Show less"
                :text="comment.content"
              ></truncate>
            </div>
            <div v-else>
              <vue-simple-markdown
                :source="comment.content">
              </vue-simple-markdown>
            </div>
          </span>
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <button :class="['button', 'is-small', liked? 'is-dark': '']" @click="likeComment">
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span>{{ amountOfLikes }}</span>
            </button>
          </a>

          <a class="level-item">
            <button class="button is-small is-info" disabled>
              <b-icon icon="comment" size="is-small"></b-icon>
              <span>WIP</span>
            </button>
          </a>
          <a class="level-item">
            <button class="button is-small" @click="toggleView">
              <b-icon icon="markdown"></b-icon>
            </button>
          </a>
        </div>
        <div class="level-right">
          <a class="level-item">
            <button class="button is-small is-rounded">
              <b-icon icon="chevron-down"></b-icon>
            </button>
          </a>
        </div>
      </nav>
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
  data() {
    return {
      amountOfLikes: 0,
      liked: false,
      created: "",
      normalView: true
    };
  },
  created() {
    this.prettifyDate();
    this.checkLikesAmount();
  },
  methods: {
    likeComment() {
      if (this.liked) {
        this.liked = false;
        this.amountOfLikes = this.amountOfLikes - 1;
      } else {
        this.liked = true;
        this.amountOfLikes = this.amountOfLikes + 1;
      }
    },
    prettifyDate() {
      var created = moment(this.comment.created).fromNow();
      this.created = created;
    },
    checkLikesAmount() {
      console.log(this.comment);
      var likeAmounts = this.comment.likes.length;
      this.amountOfLikes = likeAmounts;
    },
    toggleView() {
      this.normalView = !this.normalView;
    }
  }
};
</script>
