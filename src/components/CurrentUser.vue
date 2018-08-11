<template>
  <div id="currentuser">
    <v-card dark color="indigo lighten-2">
      <v-card-title
      primary-title
      class="title font-weight-heavy mb-2"
      >
      {{ currentUser.first_name }} {{ currentUser.last_name }}
      <v-tooltip bottom>
        <v-icon v-if="role == 'Admin'" class="ml-1" slot="activator">star</v-icon>
        <span>User is an admin</span>
      </v-tooltip>
      <div v-if="currentUser.bio" class="subheading">"{{ currentUser.bio }}"</div>
      </v-card-title>
      <v-divider light></v-divider>
      <v-card-title>
        <ul>
          <li><v-icon small>person</v-icon> {{ currentUser.username }}</li>
          <li><v-icon small>exit_to_app</v-icon> {{ joinedDate }}</li>
          <li><v-icon small>email</v-icon> {{ currentUser.email }}</li>
        </ul>
      </v-card-title>
      <v-card-actions>
        <v-btn dark block color="pink accent-1">
          Profile
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "CurrentUser",
  data() {
    return {
      currentUser: "",
      role: "",
      joinedDate: ""
    };
  },
  created() {
    this.getuserInfo();
    this.prettyJoin();
  },
  methods: {
    getuserInfo() {
      axios
        .get("http://127.0.0.1:5000/currentuser", {
          headers: {
            Authorization: "Bearer " + localStorage.access_token
          }
        })
        .then(response => {
          this.currentUser = response.data;
          if (this.currentUser.roles[0] == 1) {
            this.role = "Admin";
          }
        });
    },
    prettyJoin() {
      var joined = moment(this.currentUser.joined_date).format("Do MMM, YYYY");
      this.joinedDate = joined;
    }
  }
};
</script>

<style>
li {
  list-style: none;
}
</style>
