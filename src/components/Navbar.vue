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
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      color="deep-purple lighten-2"
      dark
    >
    <router-link to="/">
      <v-toolbar-title class="mt-1">
          <img src="@/assets/Logos/Brand.png" alt="" height="35"> 
      </v-toolbar-title>
    </router-link>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        class="ml-2"
        dark
        icon
      >
      <v-icon>info</v-icon>
      </v-btn>
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Info
        </v-card-title>
        <v-card-text>
          {{ dialogText }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Got it!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      clipped: false,
      dialog: false,
      dialogText:
        "This is Konishi's web client, it is not expected to be fully responsive on mobile and is also a testing build so it may have a lot of bugs and break, if you encounter any please create a github issue and explain it.",
      brandName: "Konishi",
      status: {
        name: "Testing",
        icon: "report_problem"
      },
      right: true
    };
  },
  methods: {
    github() {
      window.open("https://github.com/konishi-project/", "_blank");
    }
  }
};
</script>
