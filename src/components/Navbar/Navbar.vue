<template>
  <div id="navbar">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      absolute
      temporary
      fixed
      right
    >
      <v-list dense>
        <v-list-tile @click="sayHello">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="sayHello">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show="loggedIn" @click.stop="dialog = true">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Logout</v-card-title>
        <v-card-text class="subheading">Are you sure you want to logout?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Nope</v-btn>
          <v-btn color="red lighten-1" flat @click="logout">Leave</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-toolbar app fixed clipped-right>
      <v-toolbar-title @click="goHome">
        <img src="@/assets/Brand.png" height="35" class="mt-2" alt="Konishi Logo">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      dialog: false,
      miniVariant: true,
      right: false,
      rightDrawer: false,
      loggedIn: false
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    sayHello() {
      alert("Hello");
    },
    goHome() {
      this.$router.push("/");
    },
    logout() {
      this.dialog = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("currentUser");
      this.loggedIn = false;
      this.$router.push("login");
    },
    checkLogin() {
      // Get loggedIn in LocalStorage
      if (localStorage.access_token != null) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  }
};
</script>
