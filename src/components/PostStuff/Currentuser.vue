<template>
  <b-collapse class="card">
    <div slot="trigger" slot-scope="props" class="card-header">
      <p class="card-header-title">
        <span v-if="currentuser.first_name && currentuser.last_name">
          {{ currentuser.first_name }} {{ currentuser.last_name }}
        </span>
        <span v-else>{{ currentuser.username }}</span>
        <span v-show="admin" class="ml2">
          <b-tooltip 
            label="User is an admin"
            position="is-bottom"
            type="is-dark"
            square
            animated>
            <b-icon
              icon="verified"
              size="is-small"
            >
            </b-icon>
          </b-tooltip>
        </span>
      </p>
      <a class="card-header-icon">
        <b-icon
            :icon="props.open ? 'menu-down' : 'menu-up'">
        </b-icon>
      </a>
    </div>
    <div class="card-content">
      <div class="content">
        <div v-show="currentuser.bio" class="has-text-centered">
          <b-icon icon="format-quote-open" size="is-small"></b-icon>
          {{currentuser.bio}}
          <b-icon icon="format-quote-close" size="is-small"></b-icon>
        </div>
        <ul>
          <li 
            v-show="currentuser.first_name && currentuser.last_name"
          ><b-icon icon="alphabetical" size="is-small"></b-icon> {{ currentuser.first_name }} {{ currentuser.last_name }}</li>
          <li><b-icon icon="account" size="is-small"></b-icon> {{ currentuser.username }}</li>
          <li><b-icon icon="google-circles-group" size="is-small"></b-icon> {{ joined }}</li>
        </ul>
      </div>
    </div>
    <footer class="card-footer">
        <a class="card-footer-item">
          <button class="button is-danger is-fullwidth">
            Profile
          </button>
        </a>
    </footer>
  </b-collapse>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "Currentuser",
  data() {
    return {
      currentuser: "",
      admin: false,
      joined: null
    };
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  created() {
    this.getUserInfo();
    this.checkRole();
    this.prettyDate();
  },
  methods: {
    getUserInfo() {
      if (localStorage.currentuser == null) {
        axios
          .get(this.backendUrl + "/currentuser", {
            headers: {
              Authorization: "Bearer " + localStorage.access_token
            }
          })
          .then(response => {
            // Save information to local storage
            if (response.status === 200) {
              this.currentuser = response.data;
              localStorage.setItem(
                "currentuser",
                JSON.stringify({
                  bio: response.data.bio,
                  email: response.data.email,
                  first_name: response.data.first_name,
                  last_name: response.data.last_name,
                  username: response.data.username,
                  roles: response.data.roles,
                  joined_date: response.data.joined_date
                })
              );
            }
          })
          .catch(error => {
            if (error.response.status === 500) {
              this.toast("Uh oh! Something went wrong", "is-danger");
            }
          });
      } else {
        var currentuser = JSON.parse(localStorage.getItem("currentuser"));
        this.currentuser = currentuser;
      }
    },
    checkRole() {
      if (
        this.currentuser.roles != null &&
        this.currentuser.roles.includes(1)
      ) {
        this.admin = true;
      }
    },
    toast(msg, type) {
      this.$toast.open({
        duration: 3000,
        message: msg,
        type: type
      });
    },
    prettyDate() {
      var joinDate = moment(this.currentuser.joined_date).format(
        "MMM Do, YYYY"
      );
      this.joined = joinDate;
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
