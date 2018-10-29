<template>
  <section class="hero is-dark is-fullheight">
    <div class="hero-body">

        <div class="container">
          <div class="columns">

            <div class="column is-5 has-text-centered">
              <div class="title has-text-weight-light">
                <span v-if="userInfo.first_name">
                  {{ userInfo.first_name }} {{ userInfo.last_name }}'s
                </span>
                <span v-else>
                  {{ userInfo.username }}'s
                </span>
                Profile
              </div>

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
                </div> <!-- End card -->

                <div class="card mt3">
                  <div class="card-content">
                    <div class="title has-text-dark has-text-weight-light">User information</div>
                    <hr>

                    <div class="content has-text-justified" style="list-style: none;">
                      <ul class="is-size-4">
                        <li v-show="userInfo.first_name && userInfo.last_name" class="has-text-dark">
                          <b-icon icon="alphabetical" size="is-medium"></b-icon>
                          <span class="has-text-weight-light ml2">
                            {{ userInfo.first_name }} {{ userInfo.last_name }}
                          </span>
                        </li>
                        <li class="has-text-dark">
                          <b-icon icon="account" size="is-medium"></b-icon> 
                          <span class="has-text-weight-light ml2" v-text="userInfo.username"></span>
                        </li>
                        <li class="has-text-dark">
                          <b-icon icon="calendar" size="is-medium"></b-icon> 
                          <span class="has-text-weight-light ml2" v-text="joinedDate"></span>
                        </li>

                      </ul>
                    </div>

                  </div>
                </div> <!-- Second card end-->
            </div> <!-- Left column end-->

            <div class="column">
              Something else here later on.
            </div>

          </div> <!-- Columns end -->
        </div> <!-- Container end -->

    </div> <!-- Hero body end --> 
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";

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
      owner: false,
      joinedDate: ""
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  created() {
    this.getProfileInfo();
    this.prettifyDate();
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
            if (userData.owner) {
              this.owner = userData.owner;
            }
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
    },
    prettifyDate() {
      let joinDate = moment(this.userInfo.joined_date).format("MMM Do, YYYY");
      this.joinedDate = joinDate;
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
}
</style>
