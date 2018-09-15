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
              <truncate 
                clamp="..." 
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
            <button :class="['button', 'is-small', liked? 'is-dark': '']" 
              v-on="{click: liked? unlikeComment: likeComment}"
            >
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
  computed: {
    ...mapState(["backendUrl"])
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
      // .catch(error => {
      //   if (error.response.status === 403) {
      //     console.log("Something went wrong during the liking process.");
      //   }
      // });
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
      // .catch(error => {
      //   if (error.response.status === 500) {
      //     console.log("Sumting went wong during the pwocess");
      //     // this.$emit(
      //     //   "toastMsg",
      //     //   "Something went wrong during the process",
      //     //   "is-danger"
      //     // );
      //   }
      // });
    },
    prettifyDate() {
      var created = moment(this.comment.created).fromNow();
      this.created = created;
    },
    checkLikesAmount() {
      if (this.comment.liked === true) {
        this.liked = true;
      }
      var likeAmounts = this.comment.likes.length;
      this.amountOfLikes = likeAmounts;
    },
    toggleView() {
      this.normalView = !this.normalView;
    }
  }
};
</script>
