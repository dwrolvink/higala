<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="title has-text-weight-light">
          <span v-if="userInfo.first_name">
            {{ userInfo.first_name }} {{ userInfo.last_name }}'s
          </span>
          <span v-else>
            {{ userInfo.username }}'s
          </span>
          Profile
        </div>

        <div class="columns is-centered">

          <div class="column is-half">
            <div class="card">
              <div class="card-content">
                <div class="content">

                  <div class="media">
                    <div class="media-right">
                      <p class="image is-64x64">
                        <img src="@/assets/Avatars/Main.png">
                      </p>
                    </div>

                    <div class="media-content">
                      <div class="level is-mobile">

                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Posts</p>
                            <p class="title has-text-dark">{{ amount.posts }}</p>
                          </div>
                        </div>

                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Likes</p>
                            <p class="title has-text-dark">{{ amount.likes }}</p>
                          </div>
                        </div>

                        <div class="level-item has-text-centered">
                          <div>
                            <p class="heading">Rating</p>
                            <p class="title has-text-dark">{{ amount.rating }}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <hr>
                  <div v-if="userInfo.bio">
                    <b-icon icon="format-quote-open"></b-icon>
                    <span class="has-text-dark subtitle">{{ userInfo.bio }}</span>
                    <b-icon icon="format-quote-close"></b-icon>
                  </div>
                  <div v-else>
                    <span class="has-text-dark subtitle">You don't have a bio.</span>
                  </div>

                </div>
              </div> <!-- End card content -->

              <div class="card-footer">
                <div v-show="owner" class="card-footer-item">
                  <button class="button is-success is-fullwidth">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      userInfo: {},
      amount: {
        posts: 0,
        likes: 0,
        rating: 0
      },
      owner: false
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  created() {
    this.getProfileInfo();
    this.checkOwner();
  },
  methods: {
    getProfileInfo() {
      axios
        .get(this.backendUrl + "/user", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          },
          params: {
            showPosts: this.$route.query.showPosts
          }
        })
        .then(response => {
          if (response.status === 200) {
            let userData = response.data.user;
            this.userInfo = userData;
            this.amount.posts = userData.posts.length;
            this.amount.likes = response.data.user.post_likes.length;
            this.amount.rating = 104;
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            this.toast("Something went wrong during the process", "is-danger");
          }
        });
    },
    toast(msg, type) {
      this.$toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    }
  }
};
</script>
