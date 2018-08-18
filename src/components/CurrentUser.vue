<template>
  <v-card dark class="elevation-5">
    <div v-if="ready">
      <v-card-title
      primary-title
      class="title font-weight-heavy mb-2"
      >
      {{ currentUser.first_name }} {{ currentUser.last_name }}
      <v-tooltip bottom>
        <v-icon 
        v-if="role == 'Admin'" 
        class="ml-1 mb-1" 
        slot="activator" 
        small>verified_user</v-icon>
        <span>User is an admin</span>
      </v-tooltip>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-xs-center">
        <div v-if="currentUser.bio" class="subheading">"{{ currentUser.bio }}"</div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <ul>
          <li><v-icon small>person</v-icon> {{ currentUser.username }}</li>
          <li><v-icon small>play_for_work</v-icon> {{ joinedDate }}</li>
          <li><v-icon small>email</v-icon> {{ currentUser.email }}</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-btn 
          dark 
          block 
          color="red lighten-1"
          @click="goToProfile"
        >
          Profile
        </v-btn>
      </v-card-actions>
    </div>
    <div v-else>
      <v-card-text>
        <p class="text-xs-center subheading">Loading user data</p>
        <p class="text-xs-center">
          <v-progress-linear
          :size="40"
          indeterminate
          background-color="deep-orange lighten-3"
          color="white"
          >
          </v-progress-linear>
        </p>
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "CurrentUser",
  data() {
    return {
      currentUser: "",
      role: "",
      joinedDate: "",
      ready: null,
      dialog: false
    };
  },
  created() {
    this.getuserInfo();
    this.prettyJoin();
  },
  computed: {
    ...mapState(["backendUrl"])
  },
  methods: {
    getuserInfo() {
      axios
        .get(this.backendUrl + "currentuser", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          this.currentUser = response.data;
          // Store current user information

          localStorage.currentUsername = response.data.username;
          if (this.currentUser.roles[0] == "admin") {
            this.role = "Admin";
            this.ready = true;
          } else {
            this.ready = true;
          }
        });
    },
    prettyJoin() {
      var joined = moment(this.currentUser.joined_date).format("Do MMM, YYYY");
      this.joinedDate = joined;
    },
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("login");
    },
    goToProfile() {
      this.$router.push("profile");
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
