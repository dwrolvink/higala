<template>
  <article class="card mb3">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="https://api.adorable.io/avatars/64/abott@adorable.png"/>
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
            <button class="button is-small mr1">
              <b-icon
                icon="markdown"
              >
              </b-icon>
            </button>
          </b-tooltip>
         
          <b-dropdown v-show="owner || admin">
              <button class="button is-small ml1" slot="trigger">
                  <b-icon icon="dots-vertical"></b-icon>
              </button>

              <b-dropdown-item>Delete</b-dropdown-item>
              <b-dropdown-item v-show="owner">Edit</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>

      <div class="content">
        <truncate clamp="..." 
          :length="477" 
          less="Show less"
          :text="post.content"
        ></truncate>
      </div>
    </div>

      <div v-if="post.image_id">
        <div class="card-image" @click="isImageModalActive = true">
          <figure class="image is-4by3">
            <img :src="imageSrc" alt="Placeholder image">
          </figure>
        </div>
      </div>

      <div class="mt3 pr3 pl3 pb3">
        <button :class="['button', kekGiven? 'is-dark' : '']" 
          v-on="{click: kekGiven? unlikePost : likePost}"
        >
          <b-icon icon="thumb-up" size="is-small"></b-icon>
          <span class="ml1">{{ keks }}</span>
        </button>

        <button class="ml2 button is-info">
          <b-icon
            icon="forum"
            size="is-small"
          >
          </b-icon>
          <span class="ml1">{{ comments }}</span>
        </button>
      </div>

      <b-modal :active.sync="isImageModalActive">
          <p class="image is-4by3">
              <img :src="imageSrc">
          </p>
      </b-modal>
  </article>
</template>

<script>
import moment from "moment";
import truncate from "vue-truncate-collapsed";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Post",
  props: ["post"],
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
      imageSrc: "https://source.unsplash.com/1280x720/?nature,water",
      owner: false,
      admin: false
    };
  },
  components: {
    truncate
  },
  created() {
    this.amountOfKeks();
    this.amountOfComments();
    this.prettifyDate();
    this.checkOwner();
  },
  methods: {
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
    },
    checkOwner() {
      // Get current user
      var currentuser = JSON.parse(localStorage.getItem("currentuser"));
      if (
        this.post.creator_name === currentuser.username ||
        currentuser.roles[0] === 1
      ) {
        this.owner = true;
      } else if (currentuser.roles[0] === 1) {
        this.admin = true;
      }
    },
    amountOfComments() {
      this.comments = this.post.comments.length;
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
            this.$emit("serverError");
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
            this.$emit("serverError");
          }
        });
    }
  }
};
</script>
