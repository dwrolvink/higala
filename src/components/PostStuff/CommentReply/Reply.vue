<template>
  <article class="media">
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
          <strong>{{ reply.replier }}</strong> <small class="ml2">{{ created }}</small>
          <br>
          <span class="f6 has-text-grey">
            <div v-if="normalView">
              <truncate 
                clamp="..." 
                :length="90" 
                less="Show less"
                :text="reply.content"
              ></truncate>
            </div>

            <div v-else>
              <vue-simple-markdown 
                :source="reply.content"
              >
              </vue-simple-markdown>
            </div>
          </span>
        </p>
      </div>

      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <button :class="['button', 'is-small', liked ? 'is-dark': '']"
              v-on="{click: liked? unlikeReply: likeReply}"
            >
              <b-icon icon="thumb-up" size="is-small"></b-icon>
              <span>{{ amount.likes }}</span>
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
            <b-dropdown>
              <button class="button is-small is-rounded" slot="trigger">
                <b-icon icon="chevron-down"></b-icon>
              </button>

              <b-dropdown-item>Delete Reply</b-dropdown-item>
            </b-dropdown>
          </a>
        </div>
      </nav>
    </div>

  </article>
</template>

<script>
import moment from "moment";
import axios from "axios";
import truncate from "vue-truncate-collapsed";
import { mapState } from "vuex";

export default {
  name: "Reply",
  props: ["reply", "index"],
  data() {
    return {
      amount: {
        likes: 0
      },
      liked: false,
      created: "",
      normalView: true
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  components: {
    truncate
  },
  created() {
    this.prettifyDate();
    this.checkLikes();
  },
  methods: {
    prettifyDate() {
      let created = moment(this.reply.created).fromNow();
      this.created = created;
    },
    checkLikes() {
      if (this.reply.liked === true) {
        this.liked = true;
      }
      this.amount.likes = this.reply.likes.length;
    },
    likeReply() {
      axios
        .post(this.backendUrl + "/reply/" + this.reply.id + "/like", null, {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 201) {
            this.liked = true;
            this.amount.likes = this.amount.likes + 1;
          }
        });
    },
    unlikeReply() {
      axios
        .delete(this.backendUrl + "/reply/" + this.reply.id + "/like", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          if (response.status === 200) {
            this.liked = false;
            this.amount.likes = this.amount.likes - 1;
          }
        });
    },
    toggleView() {
      this.normalView = !this.normalView;
    }
  }
};
</script>
