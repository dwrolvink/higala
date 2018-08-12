<template>
  <div id="navbar">
    <v-navigation-drawer
      persistent
      :right="right"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              <v-icon v-html="status.icon" class="mr-1"></v-icon> {{ brandName }} {{ status.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list class="pt-0">
        <v-list-tile @click="github">
          <v-list-tile-action>
            <v-icon>stars</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Project GitHub</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0">
        <v-list-tile @click="github">
          <v-list-tile-action>
            <v-icon>code</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Some Link</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <div v-if="loggedIn === true">
        <v-list class="pt-0">
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </div>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="deep-purple lighten-2"
      dark
    >
    <router-link to="/">
      <v-toolbar-title>
          <img src="@/assets/Logos/Brand.png" alt="" height="40"> 
      </v-toolbar-title>
    </router-link>

      <v-spacer></v-spacer>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      clipped: false,
      loggedIn: null,
      brandName: "Konishi",
      status: {
        name: "Testing",
        icon: "report_problem"
      },
      right: true
    };
  },
  created() {
    this.checkLogin();
  },
  computed: {
    ...mapState(["loggedIn"])
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$router.push("login");
    },
    checkLogin() {
      if (localStorage.access_token != null) {
        this.loggedIn = true;
      }
    },
    github() {
      window.open("https://github.com/konishi-project/", "_blank");
    }
  }
};
</script>
