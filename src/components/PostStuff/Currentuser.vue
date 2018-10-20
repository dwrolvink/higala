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
              icon="star-circle"
              size="is-small"
            >
            </b-icon>
          </b-tooltip>
        </span>
      </p>
      <a class="card-header-icon">
        <b-icon
            :icon="props.open ? 'menu-up' : 'menu-down'">
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
          <button 
            class="button is-danger is-fullwidth"
            @click="goToProfile"
          >
            Profile
          </button>
          <b-tooltip
            position="is-bottom"
            label="Logout"
            animated
            square
            type="is-dark"
          >
            <button class="ml1 button is-light" @click="confirmLogout">
              <b-icon
                icon="exit-to-app"
              >
              </b-icon>
            </button>
          </b-tooltip>
        </a>
    </footer>
  </b-collapse>

</template>

<script>
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
    this.checkLogin();
    this.getUserInfo();
    this.checkRole();
    this.prettyDate();
  },
  methods: {
    checkLogin() {
      if (localStorage.access_token == null) {
        this.$router.push("/login");
      }
    },
    getUserInfo() {
      this.currentuser = JSON.parse(localStorage.getItem("currentuser"));
    },
    checkRole() {
      let currentuser = this.currentuser;
      if (currentuser.roles != null && currentuser.roles.includes(1)) {
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
    },
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("currentuser");
      this.loggedIn = false;
      this.$router.push("/login");
    },
    confirmLogout() {
      this.$dialog.confirm({
        title: "Logging out",
        message: "Are you sure you want to <b>logout</b> of your account?",
        confirmText: "Logout",
        type: "is-warning",
        hasIcon: true,
        icon: "exit-to-app",
        cancelText: "Nah",
        onConfirm: () => this.logout()
      });
    },
    goToProfile() {
      this.$router.push({ name: "profile", query: { showPosts: true } });
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
